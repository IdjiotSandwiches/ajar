<?php

namespace Database\Seeders;

use App\Models\CourseTeacherBenefit;
use Illuminate\Database\Seeder;

class CourseTeacherBenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseTeacherBenefits = [
            [
                'description' => 'Course Benefit Teacher 1',
                'course_id' => 1
            ],
            [
                'description' => 'Course Benefit Teacher 2',
                'course_id' => 2
            ],
            [
                'description' => 'Course Benefit Teacher 3',
                'course_id' => 3
            ],
            [
                'description' => 'Course Benefit Teacher 4',
                'course_id' => 4
            ],
            [
                'description' => 'Course Benefit Teacher 5',
                'course_id' => 5
            ],
        ];

        foreach ($courseTeacherBenefits as $courseTeacherBenefit) {
            CourseTeacherBenefit::firstOrCreate($courseTeacherBenefit);
        }
    }
}
