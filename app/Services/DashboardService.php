<?php

namespace App\Services;

use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Enums\StatusEnum;
use App\Enums\ReminderEnum;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use App\Models\TeacherSchedule;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    public function getTodayCourses()
    {
        $user = Auth::user();
        switch ($user->role_id) {
            case RoleEnum::Admin:
                break;
            case RoleEnum::Institute:
                break;
            case RoleEnum::Teacher: {
                $courses = CourseSchedule::with(['teacherSchedule.teacher.user', 'teacherSchedule.course'])
                    ->whereToday('session_date')
                    ->whereHas('teacherSchedule', function ($query) use ($user) {
                        $query->where('teacher_id', $user->id)
                            ->where('start_time', '>', Carbon::now('Asia/Jakarta')->toTimeString());
                    })
                    ->paginate(5)
                    ->through(function ($item) {
                        $schedule = $item->teacherSchedule;
                        $course = $schedule->course;
                        $teacher = $schedule->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $schedule->start_time,
                            'end_time' => $schedule->end_time,
                            'teacher' => $teacher->user->name,
                            'meeting_link' => $item->meeting_link
                        ];
                    });
                break;
            }
            case RoleEnum::Student: {
                $courses = EnrolledCourse::with(['courseSchedule.teacherSchedule.course', 'courseSchedule.teacherSchedule.teacher.user'])
                    ->where('student_id', $user->id)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereToday('session_date');
                    })
                    ->whereHas('courseSchedule.teacherSchedule', function ($query) {
                        $query->where('start_time', '>', Carbon::now('Asia/Jakarta')->toTimeString());
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
                            'teacher' => $teacher->user->name,
                            'meeting_link' => $item->courseSchedule->meeting_link
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
        switch ($user->role_id) {
            case RoleEnum::Admin:
                break;
            case RoleEnum::Institute:
                break;
            case RoleEnum::Teacher: {
                $courses = CourseSchedule::with(['teacherSchedule.teacher.user', 'teacherSchedule.course'])
                    ->whereAfterToday('session_date')
                    ->whereHas('teacherSchedule', function ($query) use ($user) {
                        $query->where('teacher_id', $user->id);
                    })
                    ->paginate(5)
                    ->through(function ($item) {
                        $schedule = $item->teacherSchedule;
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

    public function getReminder()
    {
        $user = Auth::user();
        $reminder = collect();
        switch ($user->role_id) {
            case RoleEnum::Admin:
                break;
            case RoleEnum::Institute:
                break;
            case RoleEnum::Teacher: {
                $now = now('Asia/Jakarta')->toTimeString();
                $query = CourseSchedule::query();
                $addMeeting = (clone $query)
                    ->whereHas('teacherSchedule', function ($query) use ($user, $now) {
                        $query->where('teacher_id', $user->id)
                            ->where('start_time', '>=', $now)
                            ->whereRaw("start_time <= ADDTIME(?, '00:30:00')", [$now]);
                    })
                    ->whereToday('session_date')
                    ->whereNull('meeting_link')
                    ->exists();
                $complete = (clone $query)
                    ->where('status', StatusEnum::Completed)
                    ->whereHas('teacherSchedule', fn($q) => $q->where('end_time', '>', $now))
                    ->exists();

                if ($addMeeting)
                    $reminder->add(ReminderEnum::AddMeetingLink);
                if ($complete)
                    $reminder->add(ReminderEnum::CompleteCourse);
                break;
            }
            case RoleEnum::Student: {
                $query = EnrolledCourse::query()->where('student_id', $user->id);
                $review = (clone $query)
                    ->where('is_complete', true)
                    ->whereHas(
                        'courseSchedule.teacherSchedule.course.courseReviews',
                        fn($q) => $q->where('reviewer_id', $user->id)
                    )
                    ->whereHas(
                        'courseSchedule.teacherSchedule.teacher.reviews',
                        fn($q) => $q->where('reviewer_id', $user->id)
                    )
                    ->exists();
                $meeting = (clone $query)
                    ->where('is_complete', false)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereToday('session_date');
                    })
                    ->whereHas('courseSchedule.teacherSchedule', function ($query) {
                        $now = now('Asia/Jakarta')->toTimeString();
                        $query->where('start_time', '>=', $now)
                            ->whereRaw("start_time <= ADDTIME(?, '00:15:00')", [$now]);
                    })
                    ->exists();

                if ($review)
                    $reminder->add(ReminderEnum::AddReview);
                if ($meeting)
                    $reminder->add(ReminderEnum::JoinMeeting);
                break;
            }
            default:
                break;
        }

        return $reminder;
    }
}
