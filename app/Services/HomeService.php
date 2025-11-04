<?php

namespace App\Services;

use App\Models\Course;

class HomeService
{
    public function getCoursesPreview()
    {
        $courses = Course::with(['teachers.user', 'institute.user', 'courseReviews', 'courseSkills.skill'])
            ->limit(5)
            ->get();

        return $courses;
    }
}
