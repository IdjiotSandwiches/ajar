<?php

namespace App\Services;

use App\Enums\CourseStatusEnum;
use App\Models\CourseSchedule;
use App\Models\TeachingCourse;
use Carbon\Carbon;

class PaymentService
{
    public function getTeachingCourses($id)
    {
        $teachers = TeachingCourse::with(['teacher.user'])
            ->where('course_id', $id)
            ->where('is_verified', true)
            ->get()
            ->map(fn($item) => [
                'id' => $item->teacher_id,
                'name' => $item->teacher->user->name
            ]);

        return $teachers;
    }

    public function getCourseSchedules($courseId, $teacherId)
    {
        $schedules = CourseSchedule::where('course_id', $courseId)
            ->where('teacher_id', $teacherId)
            ->where('status', CourseStatusEnum::Scheduled)
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'date' => Carbon::parse($item->start_time)->format('d M Y'),
                'start_time' => Carbon::parse($item->start_time)->toTimeString(),
                'end_time' => Carbon::parse($item->end_time)->toTimeString()
            ]);

        return $schedules;
    }

    public function getPaymentSummary($courseScheduleId)
    {
        $schedule = CourseSchedule::with(['course'])
            ->where('id', $courseScheduleId)
            ->first();

    }
}
