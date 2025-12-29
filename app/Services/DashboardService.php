<?php

namespace App\Services;

use App\Models\Teacher;
use App\Models\TeacherApplication;
use App\Models\TeachingCourse;
use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Enums\CourseStatusEnum;
use App\Enums\ReminderEnum;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    private $isToday = true;

    public function getTodayCourses()
    {
        $user = Auth::user();
        switch ($user->role_id) {
            case RoleEnum::Admin:
                $courses = $this->getAdminCourses($this->isToday);
                break;
            case RoleEnum::Institute:
                $courses = $this->getInstituteCourses($this->isToday, $user->id);
                break;
            case RoleEnum::Teacher:
                $courses = $this->getTeacherCourses($this->isToday, $user->id);
                break;
            case RoleEnum::Student:
                $courses = $this->getStudentCourses($this->isToday, $user->id);
                break;
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
                $courses = $this->getAdminCourses(!$this->isToday);
                break;
            case RoleEnum::Institute:
                $courses = $this->getInstituteCourses(!$this->isToday, $user->id);
                break;
            case RoleEnum::Teacher:
                $courses = $this->getTeacherCourses(!$this->isToday, $user->id);
                break;
            case RoleEnum::Student:
                $courses = $this->getStudentCourses(!$this->isToday, $user->id);
                break;
            default:
                break;
        }

        return $courses;
    }

    public function getReminder()
    {
        $user = Auth::user();
        $reminder = collect();
        $now = now();
        switch ($user->role_id) {
            case RoleEnum::Admin:
                $teachers = Teacher::query()
                    ->whereNull('is_verified')
                    ->exists();
                $courses = CourseSchedule::query()
                    ->whereNotNull('recording_link')
                    ->whereNull('is_verified')
                    ->where('status', CourseStatusEnum::Completed)
                    ->exists();

                if ($teachers)
                    $reminder->add(ReminderEnum::HasTeacherVerification);
                if ($courses)
                    $reminder->add(ReminderEnum::HasCourseVerification);
                break;
            case RoleEnum::Institute:
                $teachers = TeacherApplication::query()
                    ->where('institute_id', $user->id)
                    ->whereNull('is_verified')
                    ->exists();
                $courses = TeachingCourse::with(['course'])
                    ->whereHas('course', fn($q) => $q->where('institute_id', $user->id))
                    ->whereNull('is_verified')
                    ->exists();

                if ($teachers)
                    $reminder->add(ReminderEnum::HasTeacherApplication);
                if ($courses)
                    $reminder->add(ReminderEnum::HasCourseApplication);
                break;
            case RoleEnum::Teacher: {
                $query = CourseSchedule::query();
                $addMeeting = (clone $query)
                    ->where('teacher_id', $user->id)
                    ->whereRaw("TIME(?) BETWEEN SUBTIME(start_time, '00:30:00') AND start_time", [$now])
                    ->whereNull('meeting_link')
                    ->exists();
                $complete = (clone $query)
                    ->where('status', CourseStatusEnum::Completed)
                    ->whereNull('recording_link')
                    ->where('end_time', '>', $now)
                    ->exists();

                if ($addMeeting)
                    $reminder->add(ReminderEnum::AddMeetingLink);
                if ($complete)
                    $reminder->add(ReminderEnum::CompleteCourse);
                break;
            }
            case RoleEnum::Student: {
                $query = EnrolledCourse::with(['courseSchedule.course.courseReviews', 'courseSchedule.teacher.reviews'])
                    ->where('student_id', $user->id);
                $review = (clone $query)
                    ->where('is_complete', true)
                    ->whereDoesntHave(
                        'courseSchedule.course.courseReviews',
                        fn($q) => $q->where('reviewer_id', $user->id)
                    )
                    ->whereDoesntHave(
                        'courseSchedule.teacher.reviews',
                        fn($q) => $q->where('reviewer_id', $user->id)
                    )
                    ->exists();
                $meeting = (clone $query)
                    ->where('is_complete', false)
                    ->whereHas('courseSchedule', fn($q) => $q->whereToday('start_time')
                        ->whereRaw("TIME(?) BETWEEN SUBTIME(start_time, '00:15:00') AND start_time", [$now]))
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

    private function getStudentCourses($isToday, $userId)
    {
        $courses = EnrolledCourse::with(['courseSchedule.course', 'courseSchedule.teacher.user'])
            ->where('student_id', $userId)
            ->where('is_verified', true)
            ->whereHas('courseSchedule', function ($query) use ($isToday) {
                $query->when(
                    $isToday,
                    fn($q) => $q->whereToday('start_time')
                        ->where('start_time', '>', Carbon::now())
                );
                $query->when(!$isToday, fn($q) => $q->whereAfterToday('start_time'));
            })
            ->paginate(5)
            ->through(function ($item) {
                $schedule = $item->courseSchedule;
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

        return $courses;
    }

    private function getTeacherCourses($isToday, $userId)
    {
        $courses = CourseSchedule::with(['teacher.user'])
            ->where('teacher_id', $userId)
            ->when($isToday, fn($q) => $q->whereToday('start_time'))
            ->when(!$isToday, fn($q) => $q->whereAfterToday('start_time'))
            ->where('start_time', '>', Carbon::now())
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

        return $courses;
    }

    private function getInstituteCourses($isToday, $userId)
    {
        $courses = CourseSchedule::with(['teacher.user', 'course'])
            ->whereHas('course', fn($q) => $q->where('institute_id', $userId))
            ->when($isToday, fn($q) => $q->whereToday('start_time'))
            ->when(!$isToday, fn($q) => $q->whereAfterToday('start_time'))
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

        return $courses;
    }

    private function getAdminCourses($isToday)
    {
        $courses = CourseSchedule::with(['teacher.user'])
            ->when($isToday, fn($q) => $q->whereToday('start_time'))
            ->when(!$isToday, fn($q) => $q->whereAfterToday('start_time'))
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

        return $courses;
    }
}
