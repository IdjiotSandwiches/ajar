<?php

namespace App\Services;

use App\Enums\DayEnum;
use App\Models\Institute;
use App\Models\Teacher;
use App\Models\TeacherSchedule;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminService
{
    public function getInstituteList()
    {
        $institutes = Institute::with(['user', 'category'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->withCount('courses')
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'reviews_avg_rating' => round($item->reviews_avg_rating ?? 0, 1),
                'reviews_count' => $item->reviews_count,
                'courses_count' => $item->courses_count,
                'category' => $item->category->name
            ]);

        return $institutes;
    }

    public function removeInstitute($id)
    {
        $institute = Institute::where('user_id', $id)
            ->pluck('user_id');

        if (!$institute) {
            throw new \Exception('Institute not found.');
        }

        User::where('id', $institute)
            ->delete();
    }

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
            ->first();

        if (!$teacher) {
            return false;
        }

        $teacher->is_verified = $isVerified;
        $teacher->save();
    }
}
