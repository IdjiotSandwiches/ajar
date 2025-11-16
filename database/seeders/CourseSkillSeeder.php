<?php

namespace Database\Seeders;

use App\Models\CourseSkill;
use Illuminate\Database\Seeder;

class CourseSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courseSkills = [
            [
                'skill_id' => 1,
                'course_id' => 1
            ],
            [
                'skill_id' => 2,
                'course_id' => 1
            ],
            [
                'skill_id' => 6,
                'course_id' => 2
            ],
            [
                'skill_id' => 3,
                'course_id' => 3
            ],
            [
                'skill_id' => 4,
                'course_id' => 4
            ],
            [
                'skill_id' => 1,
                'course_id' => 5
            ],
        ];

        foreach ($courseSkills as $courseSkill) {
            CourseSkill::firstOrCreate($courseSkill);
        }
    }
}
