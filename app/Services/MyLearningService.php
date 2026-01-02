<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\RequestApproved;
use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Enums\CourseStatusEnum;
use App\Enums\LearningStatusEnum;
use App\Models\CourseReview;
use App\Models\TeacherReview;
use App\Models\InstituteReview;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

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

    public function getCoursesCount()
    {
        $user = Auth::user();
        switch ($user->role_id) {
            case RoleEnum::Teacher: {
                $base = CourseSchedule::query()
                    ->where('teacher_id', $user->id);
                $counts = [
                    LearningStatusEnum::Ongoing->value => (clone $base)
                        ->where('status', CourseStatusEnum::Scheduled)
                        ->count(),
                    LearningStatusEnum::Completed->value => (clone $base)
                        ->where('status', CourseStatusEnum::Completed)
                        ->count(),
                    LearningStatusEnum::Cancelled->value => (clone $base)
                        ->where('status', CourseStatusEnum::Cancelled)
                        ->count(),
                ];
                break;
            }
            case RoleEnum::Student: {
                $base = EnrolledCourse::query()
                    ->where('student_id', $user->id)
                    ->where('is_verified', true);
                $counts = [
                    LearningStatusEnum::Ongoing->value => (clone $base)
                        ->where('status', CourseStatusEnum::Scheduled)
                        ->count(),
                    LearningStatusEnum::Completed->value => (clone $base)
                        ->where('status', CourseStatusEnum::Completed)
                        ->count(),
                    LearningStatusEnum::Cancelled->value => (clone $base)
                        ->where('status', CourseStatusEnum::Cancelled)
                        ->count(),
                ];
                break;
            }
            default:
                break;
        }

        return $counts;
    }

    public function getCoursesByDate($date)
    {
        $user = Auth::user();
        switch ($user->role_id) {
            case RoleEnum::Teacher: {
                $courses = CourseSchedule::with(['course'])
                    ->where('teacher_id', $user->id)
                    ->whereDate('start_time', $date)
                    ->orderBy('start_time')
                    ->get()
                    ->map(function ($item) {
                        $course = $item->course;
                        return [
                            'name' => $course->name,
                            'duration' => $course->duration,
                            'time' => Carbon::parse($item->start_time)->toTimeString('minute') . ' - '
                                . Carbon::parse($item->end_time)->toTimeString('minute'),
                            'status' => $item->status
                        ];
                    });
                break;
            }
            case RoleEnum::Student: {
                $courses = EnrolledCourse::with(['courseSchedule.course'])
                    ->join('course_schedules', 'enrolled_courses.course_schedule_id', '=', 'course_schedules.id')
                    ->where('student_id', $user->id)
                    ->where('enrolled_courses.is_verified', true)
                    ->whereDate('course_schedules.start_time', $date)
                    ->orderBy('course_schedules.start_time', 'asc')
                    ->select('enrolled_courses.*')
                    ->get()
                    ->map(function ($item) {
                        $schedule = $item->courseSchedule;
                        $course = $schedule->course;
                        return [
                            'name' => $course->name,
                            'duration' => $course->duration,
                            'time' => Carbon::parse($schedule->start_time)->toTimeString('minute') . ' - '
                                . Carbon::parse($schedule->end_time)->toTimeString('minute'),
                            'status' => $item->status
                        ];
                    });
                break;
            }
            default:
                break;
        }

        return $courses;
    }

    public function getRelatedIdentity($id)
    {
        $enroll = EnrolledCourse::where('id', $id)
            ->first();

        $schedule = $enroll->courseSchedule;
        $data = [
            'teacher' => [
                'name' => $schedule->teacher->user->name,
                'image' => $schedule->teacher->user->profile_picture
            ],
            'institute' => [
                'name' => $schedule->course->institute->user->name,
                'image' => $schedule->course->institute->user->profile_picture
            ],
            'course' => [
                'name' => $schedule->course->name,
                'image' => $schedule->course->image
            ]
        ];

        return $data;
    }

    public function saveCourseMeeting($id, $data)
    {
        $schedule = CourseSchedule::findOrFail($id);
        $schedule->meeting_link = $data['link'];
        $schedule->save();
    }

    public function saveCourseRecording($id, $data)
    {
        $schedule = CourseSchedule::with(['enrolledCourses'])
            ->findOrFail($id);
        $schedule->recording_link = $data['link'];
        $schedule->status = CourseStatusEnum::Completed;
        $schedule->enrolledCourses()->update([
            'status' => CourseStatusEnum::Completed
        ]);
        $schedule->save();

        $admins = User::where('role_id', RoleEnum::Admin)->get();
        Notification::send($admins, new RequestApproved(
            'New Course Completion',
            'A completed course requires administrative approval before finalization.'
        ));
    }

    public function addReviews($id, $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $user = Auth::user();
            $enroll = EnrolledCourse::findOrFail($id);
            $schedule = $enroll->courseSchedule;

            if (
                !TeacherReview::query()
                    ->where('teacher_id', $schedule->teacher_id)
                    ->where('reviewer_id', $user->id)
                    ->exists()
            ) {
                TeacherReview::create([
                    'rating' => $data['teacher_rating'],
                    'description' => $data['teacher_review'],
                    'reviewer_id' => $user->id,
                    'teacher_id' => $schedule->teacher_id
                ]);
            }

            if (
                !InstituteReview::query()
                    ->where('institute_id', $schedule->course->institute_id)
                    ->where('reviewer_id', $user->id)
                    ->exists()
            ) {
                InstituteReview::create([
                    'rating' => $data['institute_rating'],
                    'description' => $data['institute_review'],
                    'reviewer_id' => $user->id,
                    'institute_id' => $schedule->course->institute_id
                ]);
            }

            if (
                !CourseReview::query()
                    ->where('course_id', $schedule->course_id)
                    ->where('reviewer_id', $user->id)
                    ->exists()
            ) {
                CourseReview::create([
                    'rating' => $data['course_rating'],
                    'description' => $data['course_review'],
                    'reviewer_id' => $user->id,
                    'course_id' => $schedule->course_id
                ]);
            }
        });
    }

    private function getTeacherCourses($userId, $status)
    {
        $courses = CourseSchedule::with(['teacher.user', 'course.institute.user'])
            ->where('teacher_id', $userId)
            ->when($status === LearningStatusEnum::Ongoing, fn($q) => $q->where('status', CourseStatusEnum::Scheduled))
            ->when($status === LearningStatusEnum::Completed, fn($q) => $q->where('status', CourseStatusEnum::Completed))
            ->when($status === LearningStatusEnum::Cancelled, fn($q) => $q->where('status', CourseStatusEnum::Cancelled))
            ->withCount('enrolledCourses')
            ->orderBy('start_time')
            ->paginate(10)
            ->through(function ($item) {
                $course = $item->course;
                $teacher = $item->teacher->user;
                $institute = $course->institute->user;
                return [
                    'id' => $item->id,
                    'name' => $course->name,
                    'teacher' => $teacher->name,
                    'institute' => $institute->name,
                    'duration' => $course->duration,
                    'schedule' => Carbon::parse($item->start_time)->format('d M Y') . ' '
                        . Carbon::parse($item->start_time)->toTimeString('minute') . ' - '
                        . Carbon::parse($item->end_time)->toTimeString('minute'),
                    'meeting_link' => $item->meeting_link,
                    'recording_link' => $item->recording_link,
                    'image' => $course->image,
                    'has_finished' => now() >= $item->end_time,
                    'is_verified' => $item->is_verified ? $item->is_verified == true : null,
                    'can_cancel' => $item->status === CourseStatusEnum::Scheduled && now()->lt($item->start_time->subHours(2)),
                    'enrollment_count' => $item->enrolled_courses_count
                ];
            });

        return $courses;
    }

    private function getStudentCourses($userId, $status)
    {
        $courses = EnrolledCourse::with(['courseSchedule.course.institute.user', 'courseSchedule.teacher.user', 'courseSchedule.course.courseReviews'])
            ->join('course_schedules', 'enrolled_courses.course_schedule_id', '=', 'course_schedules.id')
            ->orderBy('course_schedules.start_time', 'asc')
            ->select('enrolled_courses.*')
            ->where('student_id', $userId)
            ->where('enrolled_courses.is_verified', true)
            ->when($status === LearningStatusEnum::Ongoing, fn($q) => $q->where('enrolled_courses.status', CourseStatusEnum::Scheduled))
            ->when($status === LearningStatusEnum::Completed, fn($q) => $q->where('enrolled_courses.status', CourseStatusEnum::Completed))
            ->when($status === LearningStatusEnum::Cancelled, fn($q) => $q->where('enrolled_courses.status', CourseStatusEnum::Cancelled))
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
                    'recording_link' => $schedule->recording_link,
                    'image' => $course->image,
                    'can_join' => now()->addMinutes(15)->greaterThanOrEqualTo($schedule->start_time),
                    'has_review' => $course->courseReviews->count() != 0
                ];
            });

        return $courses;
    }
}
