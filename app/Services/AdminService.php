<?php

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\Teacher;

class AdminService
{
    public function getTeacherVerifications()
    {
        $teachers = Teacher::with(['user', 'category'])
            ->whereHas('user', function($query) {
                $query->whereNotNull('email_verified_at')
                    ->where('role_id', RoleEnum::Teacher);
            })
            ->whereNull('is_verified')
            ->paginate(10);

        return $teachers;
    }

    public function verifyTeacher($id, $isVerified)
    {
        $teacher = Teacher::where('user_id', $id)
            ->first();

        if (!$teacher) {
            return false;
        }

        $teacher->is_verified = $isVerified;
        $teacher->save();
        return true;
    }
}
