<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Institute;
use App\Models\TeacherApplication;
use Illuminate\Support\Facades\Auth;

class InstituteService
{
    public function getParentCategories()
    {
        $categories = Category::with('parent')
            ->whereNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public function getInstituteDetail($id)
    {
        $detail = Institute::with(['user'])
            ->withAvg('reviews', 'rating')
            ->where('user_id', $id)
            ->first();

        $teachers = collect();
        if ($detail != null)
        {
            $teachers = $detail->teachers()
                ->get();
        }

        $courses = collect();
        if ($detail != null)
        {
            $courses = $detail->courses()
                ->with(['teachers.user'])
                ->paginate(10);
        }

        return [
            'institute' => $detail,
            'courses' => $courses,
            'teachers' => $teachers
        ];
    }

    public function getInstituteList($filters)
    {
        $categories = $this->getParentCategories();
        $categories = $categories->where('id', $filters['category_id']);

        if (!$categories) {
            return collect();
        }

        $categoryIds = $categories->pluck('id');
        $institutes = Institute::with(['user'])
            ->whereIn('category_id', $categoryIds)
            ->when($filters['search'] ?? null, fn($q) =>
                $q->whereHas('user', fn($uq) =>
                    $uq->where('name', 'like', "%{$filters['search']}%")
                )
            )
            ->paginate(10);

        $institutes->getCollection()->transform(function ($inst) {
            $inst->teacherList = $inst->teachers()->get();
            return $inst;
        });

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
}
