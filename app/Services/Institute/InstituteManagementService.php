<?php

namespace App\Services\Institute;

use App\Models\User;
use App\Models\CourseSchedule;
use App\Models\TeachingCourse;
use App\Models\TeacherApplication;
use App\Enums\CourseStatusEnum;
use App\Services\PaymentService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Auth;
use App\Notifications\RequestApproved;

class InstituteManagementService
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function getTeacherApplications()
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
        }

        $teachers = TeacherApplication::with('teacher.user', 'teacher.category')
            ->whereNull('is_verified')
            ->where('institute_id', $user?->id)
            ->paginate(10);

        return $teachers;
    }

    public function verifyTeacher($id, $isVerified)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
        }

        $teacher = TeacherApplication::where('teacher_id', $id)
            ->where('institute_id', $user?->id)
            ->firstOrFail();

        $teacher->is_verified = $isVerified;
        $teacher->save();

        $toBeNotify = User::findOrFail($id);
        if ($isVerified) {
            $toBeNotify->notify(new RequestApproved('Application Accepted', "Your application at {$user?->name} has been accepted."));
        } else {
            $toBeNotify->notify(new RequestApproved('Application Rejected', "Your application at {$user?->name} has been rejected."));
        }
    }

    public function teacherList($filters)
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $teachers = TeacherApplication::with([
            'teacher.user',
            'teacher' => function ($q) {
                $q->withCount(['teachingCourses' => fn($query) => $query->where('is_verified', true)])
                    ->withCount('reviews')
                    ->withAvg('reviews', 'rating');
            }
        ])
            ->when(!empty($filters['search']), fn($query) => $query->whereHas(
                'teacher.user',
                fn($q) => $q->where('name', 'like', "%{$filters['search']}%")
            ))
            ->when(!empty($filters['date']), fn($q) => $q->whereDate('created_at', $filters['date']))
            ->when(!empty($filters['rating']), function ($query) use ($filters) {
                $query->whereHas('teacher.reviews', function ($q) use ($filters) {
                    $q->groupBy('teacher_id')
                        ->havingRaw('ROUND(AVG(rating)) = ?', [$filters['rating']]);
                });
            })
            ->when(
                !empty($filters['count']),
                fn($q) =>
                $q->whereHas(
                    'teacher.teachingCourses',
                    fn($q) => $q->where('is_verified', true),
                    '=',
                    $filters['count']
                )
            )
            ->where('institute_id', $user->id)
            ->where('is_verified', true)
            ->paginate(10)
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->teacher->user->id,
                'name' => $item->teacher->user->name,
                'profile_picture' => $item->teacher->user->profile_picture,
                'course_taught' => $item->teacher->teaching_courses_count ?? 0,
                'review_count' => $item->teacher_reviews_count ?? 0,
                'review_rating' => round($item->teacher_reviews_avg_rating ?? 0, 1),
                'registered_at' => $item->created_at
            ]);

        return $teachers;
    }

    public function deactiveTeacher($id)
    {
        $scheduleIds = [];
        DB::transaction(function () use ($id, &$scheduleIds) {
            $teacher = TeacherApplication::where('teacher_id', $id)
                ->firstOrFail();
            $teacher->delete();

            TeachingCourse::where('teacher_id', $id)->delete();
            $scheduleIds = CourseSchedule::where('teacher_id', $id)
                ->where('status', CourseStatusEnum::Scheduled)
                ->pluck('id')
                ->toArray();

            CourseSchedule::query()
                ->whereIn('id', $scheduleIds)
                ->update(['status' => CourseStatusEnum::Cancelled]);
        });

        if (!empty($scheduleIds)) {
            Bus::batch($this->service->handleRefund($scheduleIds))
                ->name('Handle course refunds (Deactivated Teacher)')
                ->dispatch();
        }

        $user = Auth::user();
        $user->notify(new RequestApproved('Access Revoked', "Your access to {$user->name} has been revoked."));
    }

    public function getCourseApplications()
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $applications = TeachingCourse::with(['course', 'teacher.user'])
            ->whereNull('is_verified')
            ->whereHas('course', fn($q) => $q->where('institute_id', $user->id))
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->id,
                'teacher' => [
                    'name' => $item->teacher->user->name,
                    'profile_picture' => $item->teacher->user->profile_picture,
                ],
                'course' => [
                    'name' => $item->course->name,
                    'image' => $item->course->image
                ]
            ]);

        return $applications;
    }

    public function verifyCourse($id, $isVerified)
    {
        $user = Auth::user();
        $teaching = TeachingCourse::with(['course'])
            ->where('id', $id)
            ->whereNull('is_verified')
            ->whereHas('course', fn($q) => $q->where('institute_id', $user?->id))
            ->firstOrFail();

        $teaching->is_verified = $isVerified;
        $teaching->save();

        $toBeNotify = User::findOrFail($teaching->teacher_id);
        if ($isVerified) {
            $toBeNotify->notify(new RequestApproved('Application Accepted', "Your {$teaching->course->name} course application has been accepted."));
        } else {
            $toBeNotify->notify(new RequestApproved('Application Rejected', "Your {$teaching->course->name} course application has been rejected."));
        }
    }
}
