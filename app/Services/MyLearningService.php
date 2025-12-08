<?php

namespace App\Services;

use App\Models\EnrolledCourse;
use Illuminate\Support\Facades\Auth;

class MyLearningService
{
    public function getEnrolledCourses()
    {
        $user = Auth::user();
        $enrolled = EnrolledCourse::with(['courseSchedule.teacher.user', 'courseSchedule.course'])
            ->where('student_id', $user?->id)
            ->where('is_complete', false)
            ->paginate(10);

        return $enrolled;
    }
}
