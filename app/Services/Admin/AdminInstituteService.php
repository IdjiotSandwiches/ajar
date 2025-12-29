<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Institute;

class AdminInstituteService
{
    public function getInstituteList($filters)
    {
        $institutes = Institute::with(['user', 'category', 'courses', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->withCount('courses')
            ->when(!empty($filters['search']), fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(!empty($filters['count']), fn($q) => $q->having('courses_count', '=', $filters['count']))
            ->when(!empty($filters['rating']), function ($query) use ($filters) {
                $query->whereHas('reviews', function ($q) use ($filters) {
                    $q->groupBy('institute_id')
                        ->havingRaw('ROUND(AVG(rating)) = ?', [$filters['rating']]);
                });
            })
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'reviews_avg_rating' => round($item->reviews_avg_rating ?? 0, 1),
                'reviews_count' => $item->reviews_count,
                'courses_count' => $item->courses_count,
                'category' => $item->category->name
            ]);

        return $institutes;
    }

    public function removeInstitute($id)
    {
        $institute = Institute::findOrFail($id)
            ->pluck('user_id');

        User::where('id', $institute)
        // mungkin send email(?) before deletion
            ->delete();
    }
}
