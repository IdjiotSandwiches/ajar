<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'name' => 'Course 1',
                'description' => '',
                'price' => 10000,
                'duration' => 60,
                'category_id' => 3,
                'institute_id' => 5
            ],
            [
                'name' => 'Course 2',
                'description' => '',
                'price' => 10000,
                'duration' => 60,
                'category_id' => 4,
                'institute_id' => 5
            ],
            [
                'name' => 'Course 3',
                'description' => '',
                'price' => 10000,
                'duration' => 60,
                'category_id' => 5,
                'institute_id' => 5
            ],
            [
                'name' => 'Course 4',
                'description' => '',
                'price' => 10000,
                'duration' => 60,
                'category_id' => 8,
                'institute_id' => 6
            ],
            [
                'name' => 'Course 5',
                'description' => '',
                'price' => 10000,
                'duration' => 60,
                'category_id' => 9,
                'institute_id' => 6
            ],
        ];

        foreach ($courses as $course) {
            Course::firstOrCreate($course);
        }
    }
}
