<?php

namespace App\Services\Admin;

use App\Enums\PaymentStatusEnum;
use App\Models\User;
use App\Notifications\RequestApproved;
use Carbon\Carbon;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Enums\CourseStatusEnum;
use App\Services\PaymentService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;

class AdminCourseService
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function getCompletedCourses($filters)
    {
        $schedules = CourseSchedule::with(['teacher.user', 'course'])
            ->where('status', CourseStatusEnum::Completed)
            ->whereNull('is_verified')
            ->whereNotNull('recording_link')
            ->whereHas(
                'course',
                fn($query) => $query->when(
                    !empty($filters['search']),
                    fn($q) => $q->where('name', 'like', "%{$filters['search']}%")
                )
                    ->when(
                        !empty($filters['category_id']),
                        fn($q) => $q->where('category_id', $filters['category_id'])
                    )
            )
            ->whereHas('enrolledCourses')
            ->when(!empty($filters['time']), fn($q) => $q->whereTime('start_time', '>=', Carbon::parse($filters['time'])->format('H:i:s')))
            ->when(!empty($filters['date']), fn($q) => $q->whereDate('start_time', $filters['date']))
            ->paginate(10)
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->course->name,
                'teacher_name' => $item->teacher->user->name,
                'duration' => $item->course->duration,
                'start_time' => $item->start_time->format('d M Y H:i'),
                'end_time' => $item->end_time->format('d M Y H:i'),
                'recording_link' => $item->recording_link,
                'image' => $item->course->image
            ]);

        return $schedules;
    }

    public function completeCourse($id, $isVerified)
    {
        $schedule = null;
        $teacherAmount = 0;
        $instituteAmount = 0;
        DB::transaction(function () use ($id, $isVerified, &$schedule, &$teacherAmount, &$instituteAmount) {
            $schedule = CourseSchedule::with(['course.institute.user', 'teacher.user'])
                ->findOrFail($id);
            $schedule->is_verified = $isVerified;

            $teacherAmount = $schedule->course->teacher_salary;
            $instituteAmount = $schedule->course->price - $teacherAmount;
            $courseSchedule = Carbon::parse($schedule->start_time)->format('d M Y') . ' '
                . Carbon::parse($schedule->start_time)->toTimeString('minute') . ' - '
                . Carbon::parse($schedule->end_time)->toTimeString('minute');
            $status = $isVerified ? PaymentStatusEnum::Paid : PaymentStatusEnum::NotEligible;
            $schedule->disbursements()->createMany([
                [
                    'course_schedule_id' => $schedule->id,
                    'user_id' => $schedule->teacher_id,
                    'unique_id' => 'TCR_PAY' . time() . random_int(100, 999),
                    'course_name' => $schedule->course->name,
                    'related_entry' => $schedule->course->institute->user->name,
                    'schedule' => $courseSchedule,
                    'amount' => $teacherAmount,
                    'status' => $status
                ],
                [
                    'course_schedule_id' => $schedule->id,
                    'user_id' => $schedule->course->institute_id,
                    'unique_id' => 'INS_PAY' . time() . random_int(100, 999),
                    'course_name' => $schedule->course->name,
                    'related_entry' => $schedule->teacher->user->name,
                    'schedule' => $courseSchedule,
                    'amount' => $instituteAmount,
                    'status' => $status
                ]
            ]);
            $schedule->save();
        });

        if ($schedule && $schedule->is_verified == true) {
            User::findOrFail($schedule->teacher_id)->notify(new RequestApproved('Earnings Received', "Your payout of Rp{$teacherAmount} for the course '{$schedule->course->name}' has been successfully processed and credited to your account."));
            User::findOrFail($schedule->course->institute_id)->notify(new RequestApproved('Funds Disbursed', "A payout of Rp{$instituteAmount} for completed courses has been successfully disbursed to your account."));
        } else if ($schedule && $schedule->is_verified == false) {
            User::findOrFail($schedule->teacher_id)->notify(new RequestApproved('Payout Not Eligible', "The payout for your course '{$schedule->course->name}' is not eligible at this time."));
            User::findOrFail($schedule->course->institute_id)->notify(new RequestApproved('Payout Not Eligible', "The payout for completed courses has been marked as not eligible due to verification issues."));
        }
    }

    public function getAllCourses($filters)
    {
        $courses = Course::with(['institute.user'])
            ->when(!empty($filters['search']), fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(!empty($filters['search_secondary']), fn($query) => $query->whereHas(
                'institute.user',
                fn($q) => $q->where('name', 'like', "%{$filters['search_secondary']}%")
            ))
            ->paginate(10)
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'institute_name' => $item->institute->user->name,
                'image' => $item->image
            ]);

        return $courses;
    }

    public function removeCourse($id)
    {
        $course = Course::findOrFail($id);
        $scheduleIds = [];
        DB::transaction(function () use ($id, &$scheduleIds) {
            $scheduleIds = CourseSchedule::where('course_id', $id)
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
                ->then(fn($batch) => $course->delete())
                ->name('Handle course refunds (Course Removal)')
                ->dispatch();
        }
    }
}
