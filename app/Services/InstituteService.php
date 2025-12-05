<?php

namespace App\Services;

use App\Models\Institute;

class InstituteService
{
    public function getInstituteDetail($id)
    {
        $detail = Institute::with(['user', 'reviews'])
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
}
