<?php

namespace Database\Seeders;

use App\Models\CourseLearningObjective;
use Illuminate\Database\Seeder;

class CourseLearningObjectiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseLearningObjectives = [
            [
                'description' => 'Course Objectives 1',
                'course_id' => 1
            ],
            [
                'description' => 'Course Objectives 2',
                'course_id' => 2
            ],
            [
                'description' => 'Course Objectives 3',
                'course_id' => 3
            ],
            [
                'description' => 'Course Objectives 4',
                'course_id' => 4
            ],
            [
                'description' => 'Course Objectives 5',
                'course_id' => 5
            ],
        ];

        foreach ($courseLearningObjectives as $courseLearningObjective) {
            CourseLearningObjective::firstOrCreate($courseLearningObjective);
        }
    }
}
