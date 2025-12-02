<?php

namespace App\Services;

use App\Models\Teacher;

class TeacherService
{
    public function getTeacherDetail($id)
    {
        $teacher = Teacher::with('user', 'category', 'reviews.reviewer.role', 'graduates', 'workExperiences', 'certificates', 'courses.course')
            ->where('user_id', $id)
            ->first();

        return $teacher;
    }
}
