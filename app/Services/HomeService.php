<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Institute;

class HomeService
{
    public function getCoursesPreview()
    {
        $courses = Course::with([
            'teachers.user',
            'institute.user',
            'courseSkills.skill',
        ])
            ->withAvg('courseReviews', 'rating')
            ->limit(10)
            ->get()
            ->map(function ($course) {
                $course->average_rating = $course->course_reviews_avg_rating ?? 0;
                unset($course->course_reviews_avg_rating);
                return $course;
            });

        return $courses;
    }

    public function getInstituteWithBestTeacher()
    {
        $sub = \DB::table('institutes')
            ->leftJoin('courses', 'courses.institute_id', '=', 'institutes.user_id')
            ->leftJoin('course_schedules', 'course_schedules.course_id', '=', 'courses.id')
            ->leftJoin('teacher_reviews', 'teacher_reviews.teacher_id', '=', 'course_schedules.teacher_id')
            ->select('institutes.user_id', \DB::raw('COALESCE(AVG(teacher_reviews.rating), 0) AS avg_teacher_rating'))
            ->groupBy('institutes.user_id');

        $institutes = Institute::query()
            ->joinSub($sub, 'rating_table', 'rating_table.user_id', '=', 'institutes.user_id')
            ->join('users', 'users.id', '=', 'institutes.user_id')
            ->select(
                'users.name as name',
                'users.profile_picture as profile_picture'
            )
            ->orderByDesc('rating_table.avg_teacher_rating')
            ->limit(10)
            ->get();

        return $institutes;
    }
}
