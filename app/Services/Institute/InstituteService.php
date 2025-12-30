<?php

namespace App\Services\Institute;

use App\Models\Institute;
use App\Models\TeacherApplication;
use App\Models\User;
use App\Notifications\RequestApproved;
use App\Utilities\Utility;
use Illuminate\Support\Facades\Auth;

class InstituteService
{
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
        $institutes = Institute::with(['user', 'teacherApplications.teacher.user', 'teacherApplications' => fn($q) => $q->where('is_verified', true)])
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
            ->paginate(10)
            ->withQueryString();

        return $institutes;
    }

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
                ->with(['teachingCourses.teacher.user', 'institute.user'])
                ->paginate(10)
                ->through(fn($item) => [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'institute' => $item->institute->user->name,
                    'duration' => $item->duration,
                    'teacher_salary' => $item->teacher_salary,
                    'course_reviews_avg_rating' => $item->course_reviews_avg_rating ?? 0,
                    'course_reviews_count' => $item->course_reviews_count,
                    'image' => $item->image,
                    'price' => $item->price,
                    'discount' => $item->discount
                ]);
        }

        return [
            'institute' => $detail,
            'courses' => $courses,
            'teachers' => $teachers
        ];
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
}
