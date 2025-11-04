<?php

namespace App\Services;

use App\Models\Course;

class HomeService
{
    public function getCoursesPreview()
    {
        $courses = Course::with('teachers')
            ->limit(5)
            ->get();

        return $courses;
    }
}
