<?php

namespace Database\Seeders;

use App\Models\TeacherReview;
use Illuminate\Database\Seeder;

class TeacherReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teacherReviews = [
            [
                'rating' => 3,
                'description' => '',
                'reviewer_id' => 7,
                'teacher_id' => 2
            ],
            [
                'rating' => 5,
                'description' => '',
                'reviewer_id' => 7,
                'teacher_id' => 3
            ],
        ];

        foreach ($teacherReviews as $teacherReview) {
            TeacherReview::firstOrCreate($teacherReview);
        }
    }
}
