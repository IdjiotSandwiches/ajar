<?php

namespace Database\Seeders;

use App\Models\CourseReview;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CourseReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $totalReviews = 60;

        for ($i = 0; $i < $totalReviews; $i++) {

            $target = $faker->numberBetween(1, 3);

            $review = [
                'reviewer_name' => $faker->name(),
                'role' => $faker->randomElement(['Pelajar', 'Guru', 'User']),
                'avatar' => '/images/avatar-default.png',
                'rating' => $faker->numberBetween(3, 5),
                'review_text' => $faker->realTextBetween(50, 120),
                'course_id' => null,
                'teacher_id' => null,
                'institute_id' => null,
            ];

            switch ($target) {
                case 1:
                    $review['course_id'] = $faker->numberBetween(1, 10);
                    break;

                case 2:
                    $review['teacher_id'] = $faker->numberBetween(11, 20);
                    break;

                case 3:
                    $review['institute_id'] = $faker->numberBetween(11, 20);
                    break;
            }

            CourseReview::create($review);
        }
    }
}
