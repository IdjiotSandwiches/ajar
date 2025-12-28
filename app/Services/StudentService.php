<?php

namespace App\Services;

use App\Models\CourseReview;
use App\Models\CourseSchedule;
use App\Models\InstituteReview;
use App\Models\TeacherReview;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StudentService
{
    public function getProfile()
    {
        $user = Auth::user();
        return $user;
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'email' => $data['email']
        ]);
    }
}
