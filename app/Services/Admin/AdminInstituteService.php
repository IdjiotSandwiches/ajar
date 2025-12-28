<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Institute;

class AdminInstituteService
{
    public function getInstituteList()
    {
        $institutes = Institute::with(['user', 'category'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->withCount('courses')
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
        $institute = Institute::where('user_id', $id)
            ->pluck('user_id');

        if (!$institute) {
            throw new \Exception('Institute not found.');
        }

        User::where('id', $institute)
            ->delete();
    }
}
