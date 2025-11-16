<?php

namespace Database\Seeders;

use App\Models\CourseStudentBenefit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseStudentBenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseStudentBenefits = [
            [
                'description' => 'Course Benefit Student 1',
                'course_id' => 1
            ],
            [
                'description' => 'Course Benefit Student 2',
                'course_id' => 2
            ],
            [
                'description' => 'Course Benefit Student 3',
                'course_id' => 3
            ],
            [
                'description' => 'Course Benefit Student 4',
                'course_id' => 4
            ],
            [
                'description' => 'Course Benefit Student 5',
                'course_id' => 5
            ],
        ];

        foreach ($courseStudentBenefits as $courseStudentBenefit) {
            CourseStudentBenefit::firstOrCreate($courseStudentBenefit);
        }
    }
}
