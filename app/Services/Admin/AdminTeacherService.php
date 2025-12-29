<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Teacher;
use App\Notifications\RequestApproved;

class AdminTeacherService
{
    public function getTeacherList($filters)
    {
        $teachers = Teacher::with(['user', 'reviews', 'teachingCourses', 'teacherApplications.institute.user'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->withCount('teachingCourses')
            ->when(!empty($filters['search']), fn($query) => $query->whereHas(
                'user',
                fn($q) => $q->where('name', 'like', "%{$filters['search']}%")
            ))
            ->when(!empty($filters['count']), fn($q) => $q->having('teaching_courses_count', '=', $filters['count']))
            ->when(!empty($filters['rating']), function ($query) use ($filters) {
                $query->whereHas('reviews', function ($q) use ($filters) {
                    $q->groupBy('teacher_id')
                        ->havingRaw('ROUND(AVG(rating)) = ?', [$filters['rating']]);
                });
            })
            ->when(!empty($filters['search_secondary']), fn($query) => $query->whereHas(
                'teacherApplications.institute.user',
                fn($q) => $q->where('name', 'like', "%{$filters['search_secondary']}%")
            ))
            ->paginate(10)
            ->through(fn($item) => [
                'id' => $item->user_id,
                'name' => $item->user->name,
                'reviews_avg_rating' => round($item->reviews_avg_rating ?? 0, 1),
                'reviews_count' => $item->reviews_count,
                'courses_count' => $item->teaching_courses_count,
                'register_date' => $item->user->email_verified_at
            ]);

        return $teachers;
    }

    public function removeTeacher($id)
    {
        $teacher = Teacher::findOrFail($id)
            ->pluck('user_id');

        User::where('id', $teacher)
        // mungkin send email(?) before deletion
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

        $toBeNotify = User::findOrFail($teacher->user_id);
        if ($isVerified) {
            $toBeNotify->notify(new RequestApproved('Account Approved', "Your account has been approved."));
        } else {
            $toBeNotify->notify(new RequestApproved('Account Rejected', "Your account has been rejected."));
        }
    }
}
