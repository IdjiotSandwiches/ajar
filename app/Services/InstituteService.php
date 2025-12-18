<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Institute;
use App\Models\TeacherApplication;
use App\Models\TeachingCourse;
use App\Utilities\Utility;
use Illuminate\Support\Facades\Auth;

class InstituteService
{
    public function getInstituteDetail($id)
    {
        $detail = Institute::with(['user.socialMedias.socialMediaType'])
            ->withAvg('reviews', 'rating')
            ->where('user_id', $id)
            ->first();

        $teachers = collect();
        if ($detail != null) {
            $teachers = $detail->teacherApplications()
                ->with(['teacher.user'])
                ->where('is_verified', true)
                ->get();
        }

        $courses = collect();
        if ($detail != null) {
            $courses = $detail->courses()
                ->with(['teacherSchedules.teacher.user', 'institute.user'])
                ->paginate(10);
        }

        return [
            'institute' => $detail,
            'courses' => $courses,
            'teachers' => $teachers
        ];
    }

    public function getTeacherApplication($id)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('teacher');
        }

        $teacher = TeacherApplication::where('teacher_id', $user?->id)
            ->where('institute_id', $id)
            ->first();

        return $teacher;
    }

    public function getInstituteList($filters)
    {
        $categories = Utility::getParentCategories();
        if (isset($filters['category_id'])) {
            $categories = $categories->where('id', $filters['category_id']);
        }

        if (!$categories) {
            return collect();
        }

        $categoryIds = $categories->pluck('id');
        $institutes = Institute::with(['user', 'teacherApplications.teacher', 'teacherApplications' => fn($q) => $q->where('is_verified', true)])
            ->whereIn('category_id', $categoryIds)
            ->when(
                $filters['search'] ?? null,
                fn($q) =>
                $q->whereHas(
                    'user',
                    fn($uq) =>
                    $uq->where('name', 'like', "%{$filters['search']}%")
                )
            )
            ->paginate(10);

        return $institutes;
    }

    public function getTeacherApplications()
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
        }

        $teachers = TeacherApplication::with('teacher.user', 'teacher.category')
            ->whereNull('is_verified')
            ->where('institute_id', $user?->id)
            ->paginate(10);

        return $teachers;
    }

    public function verifyTeacher($id, $isVerified)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
        }

        $teacher = TeacherApplication::where('teacher_id', $id)
            ->where('institute_id', $user?->id)
            ->first();

        if (!$teacher) {
            return false;
        }

        $teacher->is_verified = $isVerified;
        $teacher->save();
        return true;
    }

    public function getProfile()
    {
        $user = Auth::user();
        $institute = Institute::with(['user.socialMedias.socialMediaType', 'user.role'])
            ->where('user_id', $user?->id)
            ->first();

        return $institute;
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        $user->update([
            'name' => $data['name']
        ]);
        $user->institute()->update([
            'website' => $data['website'],
        ]);

        Utility::updateSocialMedias($user, $data);
    }

    public function teacherList($filters)
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $teachers = TeacherApplication::with([
            'teacher.user',
            'teacher' => function ($q) {
                $q->withCount(['teachingCourses' => fn($query) => $query->where('is_verified', true)])
                    ->withCount('reviews')
                    ->withAvg('reviews', 'rating');
            }
        ])
            ->when(
                !empty($filters['search']),
                fn($query) => $query->whereHas(
                    'teacher.user',
                    fn($q) => $q->where('name', 'like', "%{$filters['search']}%")
                )
            )
            ->where('institute_id', $user->id)
            ->where('is_verified', true)
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->teacher->user->id,
                'name' => $item->teacher->user->name,
                'profile_picture' => $item->teacher->user->profile_picture,
                'course_taught' => $item->teaching_courses_count ?? 0,
                'review_count' => $item->teacher_reviews_count ?? 0,
                'review_rating' => round($item->teacher_reviews_avg_rating ?? 0, 1)
            ]);

        return $teachers;
    }

    public function deactiveTeacher($id)
    {
        $teacher = TeacherApplication::where('teacher_id', $id)
            ->first();

        if (!$teacher)
            return null;

        $courses = Course::where('institute_id', $teacher->institute_id)
            ->pluck('id');

        TeachingCourse::query()
            ->where('teacher_id', $id)
            ->whereIn('course_id', $courses)
            ->update(['is_verified' => false]);

        $teacher->is_verified = false;
        $teacher->save();
        return $teacher;
    }

    public function getCourseApplications()
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $applications = TeachingCourse::with(['course', 'teacher.user'])
            ->whereNull('is_verified')
            ->whereHas('course', fn($q) => $q->where('institute_id', $user->id))
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->id,
                'teacher' => [
                    'name' => $item->teacher->user->name,
                    'profile_picture' => $item->teacher->user->profile_picture,
                ],
                'course' => [
                    'name' => $item->course->name,
                    'image' => $item->course->image
                ]
            ]);

        return $applications;
    }

    public function verifyCourse($id, $isVerified)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
        }

        $teaching = TeachingCourse::with(['course'])
            ->where('id', $id)
            ->whereNull('is_verified')
            ->whereHas('course', fn($q) => $q->where('institute_id', $user?->id))
            ->first();

        if (!$teaching) {
            return false;
        }

        $teaching->is_verified = $isVerified;
        $teaching->save();
        return true;
    }
}
