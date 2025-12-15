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

    public function addReviews($id, $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $user = Auth::user();
            $schedule = CourseSchedule::with(['teacherSchedule.teacher', 'teacherSchedule.course.institute'])
                ->findOrFail($id);

            if (
                !TeacherReview::query()
                    ->where('teacher_id', $schedule->teacherSchedule->teacher->user_id)
                    ->where('reviewer_id', $user->id)
                    ->exists()
            ) {
                TeacherReview::create([
                    'rating' => $data['teacher_rating'],
                    'description' => $data['teacher_description'],
                    'reviewer_id' => $user->id,
                    'teacher_id' => $schedule->teacherSchedule->teacher->user_id
                ]);
            }

            if (
                !InstituteReview::query()
                    ->where('institute_id', $schedule->teacherSchedule->course->institute->user_id)
                    ->where('reviewer_id', $user->id)
                    ->exists()
            ) {
                InstituteReview::create([
                    'rating' => $data['institute_rating'],
                    'description' => $data['institute_description'],
                    'reviewer_id' => $user->id,
                    'institute_id' => $schedule->teacherSchedule->course->institute->user_id
                ]);
            }

            if (
                !CourseReview::query()
                    ->where('course_id', $schedule->teacherSchedule->course->id)
                    ->where('reviewer_id', $user->id)
                    ->exists()
            ) {
                CourseReview::create([
                    'rating' => $data['course_rating'],
                    'description' => $data['course_description'],
                    'reviewer_id' => $user->id,
                    'course_id' => $schedule->teacherSchedule->course->id
                ]);
            }

            return true;
        });
    }
}
