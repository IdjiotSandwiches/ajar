<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Teacher;

class AdminTeacherService
{
    public function getTeacherList()
    {
        $teachers = Teacher::with(['user'])
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
            ]);

        return $teachers;
    }

    public function removeTeacher($id)
    {
        $teacher = Teacher::where('user_id', $id)
            ->pluck('user_id');

        if (!$teacher) {
            throw new \Exception('Teacher not found.');
        }

        User::where('id', $teacher)
            ->delete();
    }

    public function getUnverifiedTeachers()
    {
        $teachers = Teacher::query()
            ->with(['user'])
            ->whereNull('is_verified')
            ->whereHas('user', fn($q) => $q->whereNotNull('email_verified_at'))
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'profile_picture' => $item->user->profile_picture,
                'created_at' => $item->user->email_verified_at?->toDateTimeString()
            ]);

        return $teachers;
    }

    public function verifyTeacher($id, $isVerified)
    {
        $teacher = Teacher::where('user_id', $id)
            ->firstOrFail();

        $teacher->is_verified = $isVerified;
        $teacher->save();
    }
}
