<?php

namespace App\Services;

use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Enums\StatusEnum;
use App\Enums\ReminderEnum;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
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
                $courses = CourseSchedule::with(['teacher.user'])
                    ->where('teacher_id', $user->id)
                    ->where('start_time', '>', Carbon::now('Asia/Jakarta'))
                    ->paginate(5)
                    ->through(function ($item) {
                        $course = $item->course;
                        $teacher = $item->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $item->start_time,
                            'end_time' => $item->end_time,
                            'teacher' => $teacher->user->name,
                            'meeting_link' => $item->meeting_link
                        ];
                    });
                break;
            case RoleEnum::Teacher: {
                $courses = CourseSchedule::with(['teacher.user'])
                    ->where('teacher_id', $user->id)
                    ->whereToday('start_time')
                    ->where('start_time', '>', Carbon::now('Asia/Jakarta'))
                    ->paginate(5)
                    ->through(function ($item) {
                        $course = $item->course;
                        $teacher = $item->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $item->start_time,
                            'end_time' => $item->end_time,
                            'teacher' => $teacher->user->name,
                            'meeting_link' => $item->meeting_link
                        ];
                    });
                break;
            }
            case RoleEnum::Student: {
                $courses = EnrolledCourse::with(['courseSchedule.course', 'courseSchedule.teacher.user'])
                    ->where('student_id', $user->id)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereToday('start_time')
                            ->where('start_time', '>', Carbon::now('Asia/Jakarta'));
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
                $courses = CourseSchedule::with(['teacher.user'])
                    ->where('teacher_id', $user->id)
                    ->whereAfterToday('start_time')
                    ->paginate(5)
                    ->through(function ($item) {
                        $course = $item->course;
                        $teacher = $item->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $item->start_time,
                            'end_time' => $item->end_time,
                            'teacher' => $teacher->user->name
                        ];
                    });
                break;
            case RoleEnum::Teacher: {
                $courses = CourseSchedule::with(['teacher.user'])
                    ->where('teacher_id', $user->id)
                    ->whereAfterToday('start_time')
                    ->paginate(5)
                    ->through(function ($item) {
                        $course = $item->course;
                        $teacher = $item->teacher;
                        return [
                            'name' => $course->name,
                            'start_time' => $item->start_time,
                            'end_time' => $item->end_time,
                            'teacher' => $teacher->user->name
                        ];
                    });
                break;
            }
            case RoleEnum::Student: {
                $courses = EnrolledCourse::with(['courseSchedule.course', 'courseSchedule.teacher.user'])
                    ->where('student_id', $user->id)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereAfterToday('start_time');
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
                    ->where('teacher_id', $user->id)
                    ->where('start_time', '>=', $now)
                    ->whereRaw("start_time <= ADDTIME(?, '00:30:00')", [$now])
                    ->whereNull('meeting_link')
                    ->exists();
                $complete = (clone $query)
                    ->where('status', StatusEnum::Completed)
                    ->where('end_time', '>', $now)
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
                        'courseSchedule.course.courseReviews',
                        fn($q) => $q->where('reviewer_id', $user->id)
                    )
                    ->whereHas(
                        'courseSchedule.teacher.reviews',
                        fn($q) => $q->where('reviewer_id', $user->id)
                    )
                    ->exists();
                $meeting = (clone $query)
                    ->where('is_complete', false)
                    ->whereHas('courseSchedule', function ($query) {
                        $query->whereToday('start_time');
                    })
                    ->whereHas('courseSchedule', function ($query) {
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
