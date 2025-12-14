<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Institute;
use App\Models\TeacherReview;

class HomeService
{
    public function getCoursesPreview()
    {
        $courses = Course::with([
            // 'teachers.user',
            'institute.user',
            'courseSkills.skill'
        ])
            // ->withCount('courseSchedules')
            ->withAvg('courseReviews', 'rating')
            // ->orderByDesc('course_schedules_count')
            ->inRandomOrder()
            ->limit(10)
            ->get();

        return $courses;
    }

    public function getInstituteWithBestTeacher()
    {
        // $sub = \DB::table('institutes')
        //     ->leftJoin('courses', 'courses.institute_id', '=', 'institutes.user_id')
        //     ->leftJoin('course_schedules', 'course_schedules.course_id', '=', 'courses.id')
        //     ->leftJoin('teacher_reviews', 'teacher_reviews.teacher_id', '=', 'course_schedules.teacher_id')
        //     ->select('institutes.user_id', \DB::raw('COALESCE(AVG(teacher_reviews.rating), 0) AS avg_teacher_rating'))
        //     ->groupBy('institutes.user_id');

        // $institutes = Institute::query()
        //     ->joinSub($sub, 'rating_table', 'rating_table.user_id', '=', 'institutes.user_id')
        //     ->join('users', 'users.id', '=', 'institutes.user_id')
        //     ->select(
        //         'users.id as id',
        //         'users.name as name',
        //         'users.profile_picture as profile_picture'
        //     )
        //     ->orderByDesc('rating_table.avg_teacher_rating')
        //     ->limit(10)
        //     ->get();

        $institutes = Institute::with('user', 'category', 'reviews')
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
