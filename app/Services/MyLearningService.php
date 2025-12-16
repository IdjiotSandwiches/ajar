<?php

namespace App\Services;

use App\Enums\RoleEnum;
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

    public function getOngoingCourses()
    {
        $user = Auth::user();
        switch ($user->id) {
            case RoleEnum::Teacher: {
                break;
            }
            case RoleEnum::Student: {
                break;
            }
            default:
                break;
        }
    }
}
