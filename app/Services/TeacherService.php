<?php

namespace App\Services;

use App\Enums\StateEnum;
use App\Models\Category;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Models\Institute;
use App\Models\Teacher;
use App\Models\TeacherApplication;
use App\Models\TeachingCourse;
use App\Utilities\UploadUtility;
use App\Utilities\Utility;
use Illuminate\Support\Facades\Auth;

class TeacherService
{
    public function getParentCategories()
    {
        $categories = Category::query()
            ->whereNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

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
        $teacher = Teacher::with(['user', 'category', 'reviews.reviewer.role', 'graduates', 'workExperiences', 'certificates', 'teacherSchedules.course'])
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

        $courses = Course::with([])
            ->whereIn('institute_id', $institutes)
            ->when($status === StateEnum::Available, fn($q) => $q->whereNotIn('course_id', $application))
            ->when($status === StateEnum::Pending || $status === StateEnum::Accepted, fn($q) => $q->whereIn('course_id', $application))
            ->paginate(10)
            ->through(function ($item) use ($status) {
                $item->status = $status;
                return $item;
            });

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
                ->whereNotIn('user_id', $applications[StateEnum::Available->value])
                ->count(),
            StateEnum::Pending->value => Course::query()
                ->whereIn('institute_id', $institutes)
                ->whereIn('user_id', $applications[StateEnum::Pending->value])
                ->count(),
            StateEnum::Accepted->value => Course::query()
                ->whereIn('institute_id', $institutes)
                ->whereIn('user_id', $applications[StateEnum::Accepted->value])
                ->count(),
        ];

        return $counts;
    }
}
