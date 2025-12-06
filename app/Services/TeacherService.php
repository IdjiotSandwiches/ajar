<?php

namespace App\Services;

use App\Models\Teacher;
use App\Models\TeacherApplication;
use Illuminate\Support\Facades\Auth;

class TeacherService
{
    public function getTeacherDetail($id)
    {
        $teacher = Teacher::with('user', 'category', 'reviews.reviewer.role', 'graduates', 'workExperiences', 'certificates', 'courses.course')
            ->where('user_id', $id)
            ->first();

        $user = Auth::user();
        if ($user) {
            $user = $user->load('institute');
            $application = TeacherApplication::where('institute_id', $user->id)
                ->where('teacher_id', $teacher->user_id)
                ->first();
        }

        return [
            'teacher' => $teacher,
            'application' => $application ?? null
        ];
    }

    public function applyAsTeacher($id)
    {
        $user = Auth::user();
        if ($user) {
            $user = $user->load('teacher');
        }

        $application = TeacherApplication::firstOrNew([
            'teacher_id' => $user?->id,
            'institute_id' => $id
        ]);

        $application->is_verified = null;
        $application->save();
    }
}
