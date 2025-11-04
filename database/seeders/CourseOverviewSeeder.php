<?php

namespace Database\Seeders;

use App\Models\CourseOverview;
use Illuminate\Database\Seeder;

class CourseOverviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseOverviews = [
            [
                'description' => 'Course Overview 1',
                'course_id' => 1
            ],
            [
                'description' => 'Course Overview 2',
                'course_id' => 2
            ],
            [
                'description' => 'Course Overview 3',
                'course_id' => 3
            ],
            [
                'description' => 'Course Overview 4',
                'course_id' => 4
            ],
            [
                'description' => 'Course Overview 5',
                'course_id' => 5
            ],
        ];

        foreach ($courseOverviews as $courseOverview) {
            CourseOverview::firstOrCreate($courseOverview);
        }
    }
}
