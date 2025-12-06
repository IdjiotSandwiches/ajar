<?php

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\Category;
use App\Models\Institute;
use App\Models\Teacher;

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
        $teachers = Teacher::with(['user', 'category'])
            ->whereHas('user', function($query) {
                $query->whereNotNull('email_verified_at')
                    ->where('role_id', RoleEnum::Teacher);
            })
            ->whereNull('is_verified')
            ->paginate(10);

        return $teachers;
    }
}
