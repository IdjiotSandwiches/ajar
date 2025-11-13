<?php

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class CourseService
{
    public function getParentCategories()
    {
        $categories = Category::with('parent')
            ->whereNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public function getCourses($filters)
    {
        $user = Auth::user();

        $categories = Category::with('children')
            ->where('parent_id', $filters['category_id'])
            ->select(['id', 'name'])
            ->get();

        if (!$categories) {
            return collect();
        }

        $query = Course::query()
            ->when($user->role_id != RoleEnum::Student, fn($q) => $q->with('teachers.user'))
            ->when($filters['search'] ?? null, fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->with(['institute.user'])
            ->withAvg('courseReviews', 'rating')
            ->withCount('courseReviews');

        $query->when($user->role_id == RoleEnum::Student, function ($q) use ($filters, $categories) {
            $q->when(!empty($filters['rating']), function ($q) use ($filters) {
                $ratings = (array) $filters['rating'];
                $q->where(function ($subQuery) use ($ratings) {
                    foreach ($ratings as $rating) {
                        $min = max($rating - 0.5, 1);
                        $max = min($rating + 0.49, 5);
                        if ($index === 0) {
                            $subQuery->havingBetween('course_reviews_avg_rating', [$min, $max]);
                        } else {
                            $subQuery->orHavingRaw('(course_reviews_avg_rating BETWEEN ? AND ?)', [$min, $max]);
                        }
                    }
                });
            });

            $q->when(!empty($filters['price_min']), fn($q, $min) => $q->where('price', '>=', $min));
            $q->when(!empty($filters['price_max']), fn($q, $max) => $q->where('price', '<=', $max));
            $q->whereIn('category_id', $categories->pluck('id'));
        });

        $query->when($user->role_id != RoleEnum::Student, function ($q) use ($filters, $categories) {
            $q->when(!empty($filters['sub']), function ($q) use ($filters, $categories) {
                $subIds = $categories->whereIn('id', $filters['sub'])
                    ->pluck('id');
                $q->whereIn('category_id', $subIds);
            });

            $q->when(empty($filters['sub']), function ($q) use ($categories) {
                $q->whereIn('category_id', $categories->pluck('id'));
            });
        });

        $courses = $query->paginate(10);
        return [$courses, $categories];
    }
}
