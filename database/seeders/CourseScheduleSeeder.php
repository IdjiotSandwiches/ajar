<?php

namespace Database\Seeders;

use App\Models\CourseSchedule;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CourseScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseSchedules = [
            [
                'start_time' => Carbon::create(2025, 1, 10, 8, 0, 0),
                'end_time' => Carbon::create(2025, 1, 10, 10, 0, 0),
                'meeting_link' => 'https://meet.google.com/example1',
                'is_verified' => true,
                'teacher_id' => 2,
                'course_id' => 1,
            ],
            [
                'start_time' => Carbon::create(2025, 1, 11, 13, 0, 0),
                'end_time' => Carbon::create(2025, 1, 11, 15, 0, 0),
                'meeting_link' => 'https://meet.google.com/example2',
                'is_verified' => true,
                'teacher_id' => 3,
                'course_id' => 1,
            ],
        ];

        foreach ($courseSchedules as $courseSchedule) {
            CourseSchedule::firstOrCreate(
                [
                    'start_time' => $courseSchedule['start_time'],
                    'teacher_id' => $courseSchedule['teacher_id'],
                    'course_id' => $courseSchedule['course_id'],
                ],
                $courseSchedule
            );
        }
    }
}
