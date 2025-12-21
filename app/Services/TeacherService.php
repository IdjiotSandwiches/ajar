<?php

namespace App\Services;

use App\Enums\StateEnum;
use App\Models\Category;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Models\CourseWeeklyRule;
use App\Models\Institute;
use App\Models\Teacher;
use App\Models\TeacherApplication;
use App\Models\TeacherSchedule;
use App\Models\TeachingCourse;
use App\Utilities\UploadUtility;
use App\Utilities\Utility;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TeacherService
{
    public function getSubCategories()
    {
        $categories = Category::query()
            ->whereNotNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public function getTeacherDetail($id)
    {
        $teacher = Teacher::with([
            'user',
            'category',
            'reviews.reviewer.role',
            'graduates',
            'workExperiences',
            'certificates',
            'teachingCourses' => fn($q) => $q->where('is_verified', true),
            'teachingCourses.course.institute.user'
        ])
            ->where('user_id', $id)
            ->first();

        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
            $application = TeacherApplication::where('institute_id', $user->id)
                ->where('teacher_id', $teacher->user_id)
                ->first();
        }

        return [
            'teacher' => $teacher,
            'application' => $application ?? null
        ];
    }

    public function applyAsTeacher($id)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('teacher');
        }

        $application = TeacherApplication::firstOrNew([
            'teacher_id' => $user?->id,
            'institute_id' => $id
        ]);

        $application->is_verified = null;
        $application->save();
    }

    public function getProfile()
    {
        $user = Auth::user();
        $teacher = Teacher::with(['user.socialMedias.socialMediaType', 'user.role'])
            ->where('user_id', $user?->id)
            ->first();

        return $teacher;
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'email' => $data['email'],
        ]);

        Utility::updateSocialMedias($user, $data);
    }

    public function updateDetail($data)
    {
        $user = Auth::user();
        $teacher = $user->teacher;
        $teacher->update([
            'description' => $data['description'],
        ]);

        $teacher->graduates()->delete();
        foreach ($data['graduates'] as $g) {
            $teacher->graduates()->create([
                'degree_title' => $g['degree_title'],
                'university_name' => $g['university_name'],
                'degree_type_id' => $g['degree_type'],
            ]);
        }

        $teacher->workExperiences()->delete();
        foreach ($data['works'] as $w) {
            $teacher->workExperiences()->create([
                'position' => $w['position'],
                'institution' => $w['institution'],
                'duration' => $w['duration'],
            ]);
        }

        if (!empty($data['certificates'])) {
            foreach ($data['certificates'] as $file) {
                $url = UploadUtility::upload($file, 'certificates');
                $teacher->certificates()->create([
                    'image' => $url,
                ]);
            }
        }

        if (!empty($data['deleted_certificates'])) {
            $teacher->certificates()
                ->whereIn('image', $data['deleted_certificates'])
                ->delete();

            foreach ($data['deleted_certificates'] as $file) {
                UploadUtility::remove($file);
            }
        }
    }

    public function addMeetingLink($id, $link)
    {
        $schedule = CourseSchedule::where('id', $id)
            ->first();

        if (!$schedule)
            return null;

        $schedule->update([
            'meeting_link' => $link
        ]);

        return $schedule;
    }

    public function getInstituteApplications($status, $filters)
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $application = TeacherApplication::where('teacher_id', $user->id)
            ->when($status === StateEnum::Available, fn($q) => $q->whereNull('is_verified')
                ->orWhere('is_verified', true))
            ->when($status === StateEnum::Pending, fn($q) => $q->whereNull('is_verified'))
            ->when($status === StateEnum::Accepted, fn($q) => $q->where('is_verified', true))
            ->pluck('institute_id');

        $institutes = Institute::with(['user'])
            ->when(!empty($filters['search']), fn($q) => $q->whereHas(
                'user',
                fn($query) => $query->where('name', 'like', "%{$filters['search']}%")
            ))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when($status === StateEnum::Available, fn($q) => $q->whereNotIn('user_id', $application))
            ->when($status === StateEnum::Pending || $status === StateEnum::Accepted, fn($q) => $q->whereIn('user_id', $application))
            ->paginate(10)
            ->through(function ($item) use ($status) {
                $item->status = $status;
                return $item;
            });

        return $institutes;
    }

    public function getInstituteApplicationCount()
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $base = TeacherApplication::query()
            ->where('teacher_id', $user->id);

        $applications = [
            StateEnum::Available->value => (clone $base)
                ->whereNull('is_verified')
                ->orWhere('is_verified', true)
                ->pluck('institute_id'),
            StateEnum::Pending->value => (clone $base)
                ->whereNull('is_verified')
                ->pluck('institute_id'),
            StateEnum::Accepted->value => (clone $base)
                ->where('is_verified', true)
                ->pluck('institute_id'),
        ];

        $counts = [
            StateEnum::Available->value => Institute::query()
                ->whereNotIn('user_id', $applications[StateEnum::Available->value])
                ->count(),
            StateEnum::Pending->value => Institute::query()
                ->whereIn('user_id', $applications[StateEnum::Pending->value])
                ->count(),
            StateEnum::Accepted->value => Institute::query()
                ->whereIn('user_id', $applications[StateEnum::Accepted->value])
                ->count(),
        ];

        return $counts;
    }

    public function getCourseApplications($status, $filters)
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $institutes = TeacherApplication::where('teacher_id', $user->id)
            ->where('is_verified', true)
            ->pluck('institute_id');

        $application = TeachingCourse::where('teacher_id', $user->id)
            ->when($status === StateEnum::Available, fn($q) => $q->whereNull('is_verified')
                ->orWhere('is_verified', true))
            ->when($status === StateEnum::Pending, fn($q) => $q->whereNull('is_verified'))
            ->when($status === StateEnum::Accepted, fn($q) => $q->where('is_verified', true))
            ->pluck('course_id');

        $courses = Course::with(['institute.user'])
            ->whereIn('institute_id', $institutes)
            ->when(!empty($filters['search']), fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when($status === StateEnum::Available, fn($q) => $q->whereNotIn('id', $application))
            ->when($status === StateEnum::Pending || $status === StateEnum::Accepted, fn($q) => $q->whereIn('id', $application))
            ->withAvg('courseReviews', 'rating')
            ->withCount('courseReviews')
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'institute' => $item->institute->user->name,
                'duration' => $item->duration,
                'teacher_salary' => $item->teacher_salary,
                'status' => $status,
                'course_reviews_avg_rating' => $item->course_reviews_avg_rating ?? 0,
                'course_reviews_count' => $item->course_reviews_count
            ]);

        return $courses;
    }

    public function getCourseApplicationCount()
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $institutes = TeacherApplication::where('teacher_id', $user->id)
            ->where('is_verified', true)
            ->pluck('institute_id');

        $base = TeachingCourse::query()
            ->where('teacher_id', $user->id);

        $applications = [
            StateEnum::Available->value => (clone $base)
                ->whereNull('is_verified')
                ->orWhere('is_verified', true)
                ->pluck('course_id'),
            StateEnum::Pending->value => (clone $base)
                ->whereNull('is_verified')
                ->pluck('course_id'),
            StateEnum::Accepted->value => (clone $base)
                ->where('is_verified', true)
                ->pluck('course_id'),
        ];

        $counts = [
            StateEnum::Available->value => Course::query()
                ->whereIn('institute_id', $institutes)
                ->whereNotIn('id', $applications[StateEnum::Available->value])
                ->count(),
            StateEnum::Pending->value => Course::query()
                ->whereIn('institute_id', $institutes)
                ->whereIn('id', $applications[StateEnum::Pending->value])
                ->count(),
            StateEnum::Accepted->value => Course::query()
                ->whereIn('institute_id', $institutes)
                ->whereIn('id', $applications[StateEnum::Accepted->value])
                ->count(),
        ];

        return $counts;
    }

    public function applyToCourse($id)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('teacher');
        }

        $application = TeachingCourse::firstOrNew([
            'teacher_id' => $user?->id,
            'course_id' => $id
        ]);

        $application->is_verified = null;
        $application->save();
    }

    public function getSchedules()
    {
        $user = Auth::user();
        $schedules = CourseWeeklyRule::with('teachingCourse.course')
            ->where('teacher_id', $user->id)
            ->orderBy('day')
            ->orderBy('start_time')
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'day' => $s->day->value,
                'start_time' => $s->start_time->format('H:i'),
                'end_time' => $s->end_time?->format('H:i'),
                'teaching_course_id' => $s->teaching_course_id,
                'course_name' => $s->teachingCourse?->course->name
            ]);

        return $schedules;
    }

    public function getTeachingCourses()
    {
        $user = Auth::user();
        $teachings = TeachingCourse::with(['course'])
            ->where('teacher_id', $user->id)
            ->get();

        return $teachings;
    }

    public function manageSchedule($data)
    {
        $user = Auth::user();
        $teachingCourse = TeachingCourse::with('course')
            ->findOrFail($data['teaching_course_id']);

        return DB::transaction(function () use ($data, $user, $teachingCourse) {
            $courseDuration = $teachingCourse->course->duration;
            $duration = (int) ceil($courseDuration / 60) * 60;

            $start = Carbon::createFromFormat('H:i', $data['start_time']);
            $end = $start->copy()->addMinutes($duration);

            if (!$data['delete']) {
                $available = TeacherSchedule::query()
                    ->where('teacher_id', $user->id)
                    ->where('day', $data['day'])
                    ->where('start_time', '<=', $start)
                    ->where('end_time', '>=', $start)
                    ->where('active', true)
                    ->exists();

                if (!$available) {
                    throw new \Exception('Schedule not available.');
                }
            }

            CourseWeeklyRule::where('teacher_id', $user->id)
                ->where('day', $data['day'])
                ->where(function ($q) use ($start, $end) {
                    $q->where('start_time', '<', $end)
                        ->where('end_time', '>', $start);
                })
                ->delete();

            if (!$data['delete']) {
                CourseWeeklyRule::create([
                    'teacher_id' => $user->id,
                    'day' => $data['day'],
                    'start_time' => $start->format('H:i'),
                    'end_time' => $end->format('H:i'),
                    'teaching_course_id' => $teachingCourse->id,
                ]);
            }
        });
    }

    public function getAvailability()
    {
        $user = Auth::user();
        $availability = TeacherSchedule::where('teacher_id', $user->id)
            ->get();

        return $availability;
    }

    public function manageAvailability($data)
    {
        $user = Auth::user();
        foreach ($data['availability'] as $availability) {
            TeacherSchedule::updateOrCreate(
                [
                    'day' => $availability['day'],
                    'teacher_id' => $user->id
                ],
                [
                    'start_time' => $availability['start_time'],
                    'end_time' => $availability['end_time'],
                    'active' => $availability['available']
                ]
            );
        }
    }

    public function getTeachingCoursesWithSchedule($data)
    {
        $user = Auth::user();
        $teaching = TeachingCourse::with(['course.institute.user', 'courseWeeklyRules'])
            ->where('teacher_id', $user->id)
            ->when(
                !empty($data['search']),
                fn($q) => $q->whereHas('course', fn($query) => $query->where('name', 'like', "%{$data['search']}%"))
            )
            ->when(
                !empty($data['category_id']),
                fn($q) => $q->whereHas('course', function ($query) use ($data) {
                    $category = Category::where('parent_id', $data['category_id'])
                        ->pluck('id');
                    $query->whereIn('category_id', $category);
                })
            )
            ->when(
                !empty($data['time']),
                fn($q) => $q->whereHas(
                    'courseWeeklyRules',
                    fn($query) => $query->whereTime('start_time', '>=', Carbon::parse($data['time'])->format('H:i:s'))
                )
            )
            ->when(
                !empty($data['day']),
                fn($q) => $q->whereHas('courseWeeklyRules', fn($query) => $query->where('day', $data['day']))
            )
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->course->id,
                'name' => $item->course->name,
                'description' => $item->course->description,
                'institute' => $item->course->institute->user->name,
                'duration' => $item->course->duration,
                'teacher_salary' => $item->course->teacher_salary,
                'schedules' => $item->courseWeeklyRules->map(fn($q) => [
                    'day' => $q->day->value,
                    'start_time' => $q->start_time,
                    'end_time' => $q->end_time
                ])
            ]);

        return $teaching;
    }
}
