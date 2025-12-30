<?php

namespace App\Services\Teacher;

use App\Enums\StateEnum;
use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use App\Models\Institute;
use App\Models\TeachingCourse;
use App\Models\TeacherApplication;
use App\Notifications\RequestApproved;
use Illuminate\Support\Facades\Auth;

class TeacherApplicationService
{
    public function getSubCategories()
    {
        $categories = Category::query()
            ->whereNotNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
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
            ->withQueryString()
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
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'institute' => $item->institute->user->name,
                'duration' => $item->duration,
                'teacher_salary' => $item->teacher_salary,
                'status' => $status,
                'course_reviews_avg_rating' => $item->course_reviews_avg_rating ?? 0,
                'course_reviews_count' => $item->course_reviews_count,
                'image' => $item->image
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

        $course = Course::findOrFail($id);
        User::findOrFail($id)->notify(new RequestApproved('Course Application', $user->name . ' has applied to teach on ' . $course->name . '.'));
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

        User::findOrFail($id)->notify(new RequestApproved('Teacher Application', "$user->name has applied to become a teacher at your institution."));
    }
}
