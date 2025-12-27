<?php

namespace App\Services;

use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Enums\CourseStatusEnum;
use App\Enums\LearningStatusEnum;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use Illuminate\Support\Facades\Auth;

class MyLearningService
{
    public function getCourses($status)
    {
        $user = Auth::user();
        switch ($user->role_id) {
            case RoleEnum::Teacher:
                $courses = $this->getTeacherCourses($user->id, $status);
                break;
            case RoleEnum::Student:
                $courses = $this->getStudentCourses($user->id, $status);
                break;
            default:
                break;
        }

        return $courses;
    }

    private function getTeacherCourses($userId, $status) {
        $courses = CourseSchedule::where('teacher_id', $userId)
            ->when($status === LearningStatusEnum::Ongoing, fn($q) => $q->where('status' === CourseStatusEnum::Scheduled))
            ->when($status === LearningStatusEnum::Completed, fn($q) => $q->where('status' === CourseStatusEnum::Completed))
            ->paginate(10)
            ->through(function ($item) {
                $course = $item->course;
                $teacher = $item->teacher;
                return [
                    'id' => $item->id,
                    'name' => $course->name,
                    'teacher' => $teacher->name,
                    'institute' => $course->institute->name,
                    'duration' => $course->duration,
                    'schedule' => Carbon::parse($item->start_time)->format('d M Y') . ' '
                        . Carbon::parse($item->start_time)->toTimeString('minute') . ' - '
                        . Carbon::parse($item->end_time)->toTimeString('minute'),
                    'meeting_link' => $item->meeting_link,
                    'image' => $course->image
                ];
            });

        return $courses;
    }

    private function getStudentCourses($userId, $status)
    {
        $courses = EnrolledCourse::where('student_id', $userId)
            ->where('is_verified', true)
            ->where('is_complete', LearningStatusEnum::Completed === $status)
            ->paginate(10)
            ->through(function ($item) {
                $schedule = $item->courseSchedule;
                $course = $schedule->course;
                $teacher = $schedule->teacher->user;
                $institute = $course->institute->user;
                return [
                    'id' => $item->id,
                    'name' => $course->name,
                    'teacher' => $teacher->name,
                    'institute' => $institute->name,
                    'duration' => $course->duration,
                    'schedule' => Carbon::parse($schedule->start_time)->format('d M Y') . ' '
                        . Carbon::parse($schedule->start_time)->toTimeString('minute') . ' - '
                        . Carbon::parse($schedule->end_time)->toTimeString('minute'),
                    'meeting_link' => $schedule->meeting_link,
                    'image' => $course->image
                ];
            });

        return $courses;
    }
}
