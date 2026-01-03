<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Institute;
use App\Models\InstituteReview;
use App\Models\Teacher;
use App\Models\TeacherReview;

class HomeService
{
    public function getCoursesPreview()
    {
        $courses = Course::with([
            'teachingCourses' => fn($q) => $q->where('is_verified', true),
            'teachingCourses.teacher.user',
            'institute.user',
            'courseSkills.skill'
        ])
            ->withCount('teachingCourses')
            ->withCount('courseReviews')
            ->withAvg('courseReviews', 'rating')
            ->orderByDesc('teaching_courses_count')
            ->inRandomOrder()
            ->limit(10)
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'institute' => $item->institute->user->name,
                'duration' => $item->duration,
                'teacher_salary' => $item->teacher_salary,
                'course_reviews_avg_rating' => round($item->course_reviews_avg_rating),
                'course_reviews_count' => $item->course_reviews_count,
                'image' => $item->image,
                'price' => $item->price,
                'discount' => $item->discount,
                'teachers' => $item->teachingCourses->map(function ($item) {
                    $teacher = $item->teacher;
                    $profile = $teacher->user;
                    return [
                        'id' => $profile->id,
                        'name' => $profile->name,
                        'uuid' => $profile->uuid,
                        'profile_picture' => $profile->profile_picture,
                        'social_medias' => $profile->socialMedias,
                        'description' => $teacher->description
                    ];
                })
            ]);

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
        $teacherReviews = TeacherReview::with('teacher.user', 'reviewer')
            ->where('rating', '>=', 4)
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'name' => $item->reviewer->name,
                'profile_picture' => $item->reviewer->profile_picture,
                'review_to' => [
                    'name' => $item->teacher->user->name,
                    'profile_picture' => $item->teacher->user->profile_picture,
                ],
                'rating' => $item->rating,
                'description' => $item->description
            ]);

        $instituteReviews = InstituteReview::with('institute.user', 'reviewer')
            ->where('rating', '>=', 4)
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'name' => $item->reviewer->name,
                'profile_picture' => $item->reviewer->profile_picture,
                'review_to' => [
                    'name' => $item->institute->user->name,
                    'profile_picture' => $item->institute->user->profile_picture,
                ],
                'rating' => $item->rating,
                'description' => $item->description
            ]);

        $reviews = $teacherReviews
            ->merge($instituteReviews)
            ->shuffle()
            ->values();

        return $reviews;
    }
}
