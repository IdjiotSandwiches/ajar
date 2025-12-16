<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Institute;
use App\Models\Teacher;
use App\Models\TeacherReview;

class HomeService
{
    public function getCoursesPreview()
    {
        $courses = Course::with([
            'teacherSchedules.teacher.user',
            'institute.user',
            'courseSkills.skill'
        ])
            ->withCount('teacherSchedules')
            ->withAvg('courseReviews', 'rating')
            ->orderByDesc('teacher_schedules_count')
            ->inRandomOrder()
            ->limit(10)
            ->get();

        return $courses;
    }

    public function getInstituteWithBestTeacher()
    {
        $institutes = Institute::with(['category', 'user'])
            ->addSelect([
                'teachers_avg_rating' => Teacher::query()
                    ->selectRaw('AVG(tr.rating)')
                    ->from('teachers as t')
                    ->join('teacher_applications as ta', 't.user_id', '=', 'ta.teacher_id')
                    ->join('teacher_reviews as tr', 'tr.teacher_id', '=', 't.user_id')
                    ->whereColumn('ta.institute_id', 'institutes.user_id')
                    ->where('ta.is_verified', true)
            ])
            ->orderByDesc('teachers_avg_rating')
            ->get();

        return $institutes;
    }

    public function getRandomReviews()
    {
        $reviews = TeacherReview::with('teacher.user', 'reviewer.role')
            ->where('rating', '>=', 4)
            ->inRandomOrder()
            ->limit(10)
            ->get();

        return $reviews;
    }
}
