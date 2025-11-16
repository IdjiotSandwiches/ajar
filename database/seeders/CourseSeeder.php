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
                'description' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit dolore quis architecto, magnam, ab quisquam cupiditate eius ipsam delectus perspiciatis est? Perferendis odit provident aut molestias neque debitis asperiores sequi.',
                'price' => 10000,
                'duration' => 60,
                'image' => '',
                'category_id' => 3,
                'institute_id' => 5
            ],
            [
                'name' => 'Course 2',
                'description' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit dolore quis architecto, magnam, ab quisquam cupiditate eius ipsam delectus perspiciatis est? Perferendis odit provident aut molestias neque debitis asperiores sequi.',
                'price' => 10000,
                'duration' => 60,
                'image' => '',
                'category_id' => 4,
                'institute_id' => 5
            ],
            [
                'name' => 'Course 3',
                'description' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit dolore quis architecto, magnam, ab quisquam cupiditate eius ipsam delectus perspiciatis est? Perferendis odit provident aut molestias neque debitis asperiores sequi.',
                'price' => 10000,
                'duration' => 60,
                'image' => '',
                'category_id' => 5,
                'institute_id' => 5
            ],
            [
                'name' => 'Course 4',
                'description' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit dolore quis architecto, magnam, ab quisquam cupiditate eius ipsam delectus perspiciatis est? Perferendis odit provident aut molestias neque debitis asperiores sequi.',
                'price' => 10000,
                'duration' => 60,
                'image' => '',
                'category_id' => 8,
                'institute_id' => 6
            ],
            [
                'name' => 'Course 5',
                'description' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit dolore quis architecto, magnam, ab quisquam cupiditate eius ipsam delectus perspiciatis est? Perferendis odit provident aut molestias neque debitis asperiores sequi.',
                'price' => 10000,
                'duration' => 60,
                'image' => '',
                'category_id' => 9,
                'institute_id' => 6
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
