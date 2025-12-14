<?php

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\EnrolledCourse;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    public function getTodayCourses()
    {
        $user = Auth::user();
        switch ($user->role_id)
        {
            case RoleEnum::Admin:
                break;
            case RoleEnum::Institute:
                break;
            case RoleEnum::Teacher:
                break;
            case RoleEnum::Student: {
                $courses = EnrolledCourse::with(['courseSchedule.teacherSchedule.course', 'courseSchedule.teacherSchedule.teacher.user'])
                    ->where('student_id', $user->id)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereToday('session_date');
                    })
                    ->paginate(5)
                    ->through(function ($item) {
                        $schedule = $item->courseSchedule->teacherSchedule;
                        $course = $schedule->course;
                        $teacher = $schedule->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $schedule->start_time,
                            'end_time' => $schedule->end_time,
                            'teacher' => $teacher->user->name
                        ];
                    });
                break;
            }
            default:
                break;
        }

        return $courses;
    }

    public function getUpcomingCourses()
    {
        $user = Auth::user();
        switch ($user->role_id)
        {
            case RoleEnum::Admin:
                break;
            case RoleEnum::Institute:
                break;
            case RoleEnum::Teacher:
                break;
            case RoleEnum::Student: {
                $courses = EnrolledCourse::with(['courseSchedule.teacherSchedule.course', 'courseSchedule.teacherSchedule.teacher.user'])
                    ->where('student_id', $user->id)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereAfterToday('session_date');
                    })
                    ->paginate(5)
                    ->through(function ($item) {
                        $schedule = $item->courseSchedule->teacherSchedule;
                        $course = $schedule->course;
                        $teacher = $schedule->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $schedule->start_time,
                            'end_time' => $schedule->end_time,
                            'teacher' => $teacher->user->name
                        ];
                    });
                break;
            }
            default:
                break;
        }

        return $courses;
    }
}
