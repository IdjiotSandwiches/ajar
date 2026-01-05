<?php

namespace App\Services;

use App\Models\Chat;
use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Enums\ReminderEnum;
use App\Enums\CourseStatusEnum;
use App\Models\Teacher;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use App\Models\TeachingCourse;
use App\Models\TeacherApplication;
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
                $reminder = $this->getAdminReminder();
                break;
            case RoleEnum::Institute:
                $reminder = $this->getInstituteReminder($user->id);
                break;
            case RoleEnum::Teacher: {
                $reminder = $this->getTeacherReminder($user->id, $now);
                break;
            }
            case RoleEnum::Student: {
                $reminder = $this->getStudentReminder($user->id, $now);
                break;
            }
            default:
                break;
        }

        $message = $this->getMessageReminder($user->id);
        if ($message && $user->role_id !== RoleEnum::Admin) {
            $reminder->add(ReminderEnum::Message);
        }

        return $reminder;
    }

    private function getStudentCourses($isToday, $userId)
    {
        $courses = EnrolledCourse::with(['courseSchedule.course', 'courseSchedule.teacher.user'])
            ->where('student_id', $userId)
            ->where('is_verified', true)
            ->whereHas('courseSchedule', function ($query) use ($isToday) {
                $query->where('status', CourseStatusEnum::Scheduled)
                    ->when($isToday, fn($q) => $q->whereToday('start_time'))
                    ->when(!$isToday, fn($q) => $q->whereAfterToday('start_time'));
            })
            ->paginate(5)
            ->through(function ($item) use ($isToday) {
                $schedule = $item->courseSchedule;
                $course = $schedule->course;
                $teacher = $schedule->teacher;
                return [
                    'name' => $course->name,
                    'start_time' => $schedule->start_time,
                    'end_time' => $schedule->end_time,
                    'teacher' => $teacher->user->name,
                    'meeting_link' => $item->courseSchedule->meeting_link,
                    'can_join' => $isToday && now() < $schedule->end_time && now()->addMinutes(15)->greaterThanOrEqualTo($schedule->start_time),
                    'has_done' => $isToday && now() > $schedule->end_time
                ];
            });

        return $courses;
    }

    private function getTeacherCourses($isToday, $userId)
    {
        $courses = CourseSchedule::with(['teacher.user'])
            ->where('teacher_id', $userId)
            ->where('status', CourseStatusEnum::Scheduled)
            ->when($isToday, fn($q) => $q->whereToday('start_time'))
            ->when(!$isToday, fn($q) => $q->whereAfterToday('start_time'))
            ->paginate(5)
            ->through(function ($item) use ($isToday) {
                $course = $item->course;
                $teacher = $item->teacher;
                return [
                    'name' => $course->name,
                    'start_time' => $item->start_time,
                    'end_time' => $item->end_time,
                    'teacher' => $teacher->user->name,
                    'meeting_link' => $item->meeting_link,
                    'can_join' => $isToday && now() < $item->end_time && now()->addMinutes(15)->greaterThanOrEqualTo($item->start_time),
                    'has_done' => $isToday && now() > $item->end_time
                ];
            });

        return $courses;
    }

    private function getInstituteCourses($isToday, $userId)
    {
        $courses = CourseSchedule::with(['teacher.user', 'course'])
            ->where('status', CourseStatusEnum::Scheduled)
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
            ->where('status', CourseStatusEnum::Scheduled)
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

    private function getStudentReminder($userId, $now)
    {
        $reminder = collect();
        $query = EnrolledCourse::with(['courseSchedule.course.courseReviews', 'courseSchedule.teacher.reviews'])
            ->where('student_id', $userId);
        $review = (clone $query)
            ->where('status', CourseStatusEnum::Completed)
            ->whereDoesntHave(
                'courseSchedule.course.courseReviews',
                fn($q) => $q->where('reviewer_id', $userId)
            )
            ->whereDoesntHave(
                'courseSchedule.teacher.reviews',
                fn($q) => $q->where('reviewer_id', $userId)
            )
            ->exists();
        $meeting = (clone $query)
            ->where('status', CourseStatusEnum::Scheduled)
            ->whereHas('courseSchedule', fn($q) => $q->whereToday('start_time')
                ->whereRaw("TIME(?) BETWEEN SUBTIME(start_time, '00:15:00') AND start_time", [$now]))
            ->exists();

        if ($review)
            $reminder->add(ReminderEnum::AddReview);
        if ($meeting)
            $reminder->add(ReminderEnum::JoinMeeting);
        return $reminder;
    }

    private function getTeacherReminder($userId, $now)
    {
        $reminder = collect();
        $query = CourseSchedule::query();
        $addMeeting = (clone $query)
            ->where('teacher_id', $userId)
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
        return $reminder;
    }

    private function getInstituteReminder($userId)
    {
        $reminder = collect();
        $teachers = TeacherApplication::query()
            ->where('institute_id', $userId)
            ->whereNull('is_verified')
            ->exists();
        $courses = TeachingCourse::with(['course'])
            ->whereHas('course', fn($q) => $q->where('institute_id', $userId))
            ->whereNull('is_verified')
            ->exists();

        if ($teachers)
            $reminder->add(ReminderEnum::HasTeacherApplication);
        if ($courses)
            $reminder->add(ReminderEnum::HasCourseApplication);
        return $reminder;
    }

    private function getAdminReminder()
    {
        $reminder = collect();
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
        return $reminder;
    }

    private function getMessageReminder($userId)
    {
        $messages = Chat::query()
            ->where('receiver_id', $userId)
            ->whereNull('seen_at')
            ->exists();
        return $messages;
    }
}
