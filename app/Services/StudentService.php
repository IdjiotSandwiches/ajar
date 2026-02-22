<?php

namespace App\Services;

use App\Models\MyCourse;
use App\Enums\CourseStatusEnum;
use Illuminate\Support\Facades\Auth;

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

    public function getMyCourses($filters)
    {
        $user = Auth::user();
        $courses = MyCourse::with('course.institute.user')
            ->where('user_id', $user->id)
            ->when(
                !empty($filters['search']),
                fn($q) => $q->whereHas(
                    'course',
                    fn($query) =>
                    $query->where('name', 'like', "%{$filters['search']}%")
                )
            )
            ->paginate(10)
            ->through(fn($q) => [
                'id' => $q->id,
                'course_id' => $q->course->id,
                'name' => $q->course->name,
                'description' => $q->course->description,
                'image' => $q->course->image,
                'institute' => $q->course->institute->user->name
            ]);

        return $courses;
    }

    public function getMyCourse($id)
    {
        $user = Auth::user();
        $q = MyCourse::with('course.courseSessions', 'course.courseSchedules')
            ->where('user_id', $user->id)
            ->where('course_id', $id)
            ->first();

        return [
            'id' => $q->id,
            'course_id' => $q->course->id,
            'name' => $q->course->name,
            'description' => $q->course->description,
            'image' => $q->course->image,
            'has_schedule' => $q->course->courseSchedules
                ->where('status', CourseStatusEnum::Scheduled)
                ->count() != 0,
            'sessions' => $q->course->courseSessions
                ->map(fn($item) => [
                    'description' => $item->description,
                    'link' => $item->video_link
                ])
        ];
    }
}
