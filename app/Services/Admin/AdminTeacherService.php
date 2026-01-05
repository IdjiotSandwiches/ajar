<?php

namespace App\Services\Admin;

use App\Events\TeacherVerificationEvent;
use App\Events\TeacherVerificationRejectedEvent;
use App\Models\User;
use App\Models\Teacher;
use App\Models\CourseSchedule;
use App\Services\PaymentService;
use App\Enums\CourseStatusEnum;
use App\Notifications\RequestApproved;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;

class AdminTeacherService
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function getTeacherList($filters)
    {
        $teachers = Teacher::with(['user', 'reviews', 'teachingCourses', 'teacherApplications.institute.user'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->withCount([
                'teachingCourses as teaching_courses_count' => function ($q) {
                    $q->where('is_verified', true);
                }
            ])
            ->where('is_verified', true)
            ->when(!empty($filters['search']), fn($query) => $query->whereHas(
                'user',
                fn($q) => $q->where('name', 'like', "%{$filters['search']}%")
            ))
            ->when(isset($filters['count']), fn($q) => $q->having('teaching_courses_count', '=', $filters['count']))
            ->when(!empty($filters['rating']), function ($query) use ($filters) {
                $query->whereHas('reviews', function ($q) use ($filters) {
                    $q->groupBy('teacher_id')
                        ->havingRaw('ROUND(AVG(rating)) = ?', [$filters['rating']]);
                });
            })
            ->when(!empty($filters['search_secondary']), fn($query) => $query->whereHas(
                'teacherApplications.institute.user',
                fn($q) => $q->where('name', 'like', "%{$filters['search_secondary']}%")
            ))
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'reviews_avg_rating' => round($item->reviews_avg_rating, 1),
                'reviews_count' => $item->reviews_count,
                'courses_count' => $item->teaching_courses_count,
                'register_date' => $item->user->created_at
            ]);

        return $teachers;
    }

    public function removeTeacher($id)
    {
        Teacher::findOrFail($id);
        $scheduleIds = [];
        DB::transaction(function () use ($id, &$scheduleIds) {
            $scheduleIds = CourseSchedule::where('teacher_id', $id)
                ->pluck('id')
                ->toArray();

            CourseSchedule::query()
                ->whereIn('id', $scheduleIds)
                ->update([
                    'status' => CourseStatusEnum::Cancelled
                ]);
        });

        $jobs = $this->service->handleRefund($scheduleIds);
        if (!empty($jobs)) {
            Bus::batch($jobs)
                ->then(fn($batch) => User::findOrFail($id)->delete())
                ->name('Handle course refunds (Teacher Removal)')
                ->dispatch();
        } else {
            User::findOrFail($id)->delete();
        }
    }

    public function getUnverifiedTeachers()
    {
        $teachers = Teacher::query()
            ->with(['user'])
            ->whereNull('is_verified')
            ->whereHas('user', fn($q) => $q->whereNotNull('email_verified_at'))
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'profile_picture' => $item->user->profile_picture,
                'created_at' => $item->user->created_at
            ]);

        return $teachers;
    }

    public function verifyTeacher($id, $isVerified, $reason = null)
    {
        $teacher = Teacher::where('user_id', $id)->firstOrFail();

        $teacher->is_verified = $isVerified;
        $teacher->save();

        $user = User::findOrFail($id);

        if ($isVerified) {
            $user->notify(
                new RequestApproved('Account Approved', 'Your account has been approved.')
            );

            broadcast(new TeacherVerificationEvent($id));
        } else {
            $user->notify(
                new RequestApproved('Account Rejected', $reason ?? 'Your account has been rejected.')
            );

            broadcast(new TeacherVerificationRejectedEvent($id, $reason));
        }
    }
}
