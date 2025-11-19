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
            ['course_id' => 1, 'skill_id' => 8],  
            ['course_id' => 1, 'skill_id' => 1],
            ['course_id' => 1, 'skill_id' => 13], 

            ['course_id' => 2, 'skill_id' => 9], 
            ['course_id' => 2, 'skill_id' => 1], 
            ['course_id' => 2, 'skill_id' => 14], 

            ['course_id' => 3, 'skill_id' => 10], 
            ['course_id' => 3, 'skill_id' => 11],
            ['course_id' => 3, 'skill_id' => 1],

            ['course_id' => 4, 'skill_id' => 8], 
            ['course_id' => 4, 'skill_id' => 13],

            ['course_id' => 5, 'skill_id' => 17], 
            ['course_id' => 5, 'skill_id' => 8], 
            ['course_id' => 5, 'skill_id' => 16],

            ['course_id' => 6, 'skill_id' => 20], 
            ['course_id' => 6, 'skill_id' => 21], 

            ['course_id' => 7, 'skill_id' => 22], 
            ['course_id' => 7, 'skill_id' => 23],
            ['course_id' => 7, 'skill_id' => 20], 

            ['course_id' => 8, 'skill_id' => 24], 
            ['course_id' => 8, 'skill_id' => 25],

            ['course_id' => 9, 'skill_id' => 31],
            ['course_id' => 9, 'skill_id' => 20], 

            ['course_id' => 10, 'skill_id' => 20],
            ['course_id' => 10, 'skill_id' => 29],

            ['course_id' => 11, 'skill_id' => 25],
            ['course_id' => 11, 'skill_id' => 24],

            ['course_id' => 12, 'skill_id' => 26], 
            ['course_id' => 12, 'skill_id' => 27], 
            ['course_id' => 12, 'skill_id' => 41], 

            ['course_id' => 13, 'skill_id' => 28], 
            ['course_id' => 13, 'skill_id' => 25],

            ['course_id' => 14, 'skill_id' => 32], 
            ['course_id' => 14, 'skill_id' => 24], 

            ['course_id' => 15, 'skill_id' => 25],
            ['course_id' => 15, 'skill_id' => 13],

            ['course_id' => 16, 'skill_id' => 32],
            ['course_id' => 16, 'skill_id' => 40],

            ['course_id' => 17, 'skill_id' => 33],
            ['course_id' => 17, 'skill_id' => 32],
            ['course_id' => 17, 'skill_id' => 36], 

            ['course_id' => 18, 'skill_id' => 34],
            ['course_id' => 18, 'skill_id' => 32],

            ['course_id' => 19, 'skill_id' => 38],
            ['course_id' => 19, 'skill_id' => 37],
            ['course_id' => 19, 'skill_id' => 36],

            ['course_id' => 20, 'skill_id' => 39], 
            ['course_id' => 20, 'skill_id' => 36],
            ['course_id' => 20, 'skill_id' => 32], 

            ['course_id' => 21, 'skill_id' => 12],
            ['course_id' => 21, 'skill_id' => 1], 

            ['course_id' => 22, 'skill_id' => 14],
            ['course_id' => 22, 'skill_id' => 13],

            ['course_id' => 23, 'skill_id' => 18],
            ['course_id' => 23, 'skill_id' => 13], 

            ['course_id' => 24, 'skill_id' => 1], 
            ['course_id' => 24, 'skill_id' => 19],
            ['course_id' => 24, 'skill_id' => 13], 

            ['course_id' => 25, 'skill_id' => 9], 
            ['course_id' => 25, 'skill_id' => 1],

            ['course_id' => 26, 'skill_id' => 4], 
            ['course_id' => 26, 'skill_id' => 5],
            ['course_id' => 26, 'skill_id' => 42],

            ['course_id' => 27, 'skill_id' => 2],  
            ['course_id' => 27, 'skill_id' => 42], 

            ['course_id' => 28, 'skill_id' => 45], 
            ['course_id' => 28, 'skill_id' => 47],
            ['course_id' => 28, 'skill_id' => 43],

            ['course_id' => 29, 'skill_id' => 46], 
            ['course_id' => 29, 'skill_id' => 3],  
            ['course_id' => 29, 'skill_id' => 44],

            ['course_id' => 30, 'skill_id' => 49], 
            ['course_id' => 30, 'skill_id' => 45],
            ['course_id' => 30, 'skill_id' => 46], 

            ['course_id' => 31, 'skill_id' => 51],
            ['course_id' => 31, 'skill_id' => 50],

            ['course_id' => 32, 'skill_id' => 53],
            ['course_id' => 32, 'skill_id' => 51],

            ['course_id' => 33, 'skill_id' => 50],
            ['course_id' => 33, 'skill_id' => 57],

            ['course_id' => 34, 'skill_id' => 51],
            ['course_id' => 34, 'skill_id' => 71],

            ['course_id' => 35, 'skill_id' => 56], 
            ['course_id' => 35, 'skill_id' => 51],

            ['course_id' => 36, 'skill_id' => 52],
            ['course_id' => 36, 'skill_id' => 54],

            ['course_id' => 37, 'skill_id' => 55], 
            ['course_id' => 37, 'skill_id' => 52],

            ['course_id' => 38, 'skill_id' => 54], 
            ['course_id' => 38, 'skill_id' => 52],

            ['course_id' => 39, 'skill_id' => 54], 
            ['course_id' => 39, 'skill_id' => 50], 

            ['course_id' => 40, 'skill_id' => 52], 
            ['course_id' => 40, 'skill_id' => 54],

            ['course_id' => 41, 'skill_id' => 59],
            ['course_id' => 41, 'skill_id' => 58],

            ['course_id' => 42, 'skill_id' => 60], 
            ['course_id' => 42, 'skill_id' => 59],

            ['course_id' => 43, 'skill_id' => 61], 
            ['course_id' => 43, 'skill_id' => 59], 

            ['course_id' => 44, 'skill_id' => 62], 
            ['course_id' => 44, 'skill_id' => 59], 

            ['course_id' => 45, 'skill_id' => 63], 
            ['course_id' => 45, 'skill_id' => 58], 

            ['course_id' => 46, 'skill_id' => 70],
            ['course_id' => 46, 'skill_id' => 72], 

            ['course_id' => 47, 'skill_id' => 71],
            ['course_id' => 47, 'skill_id' => 51],

            ['course_id' => 48, 'skill_id' => 70], 
            ['course_id' => 48, 'skill_id' => 56],

            ['course_id' => 49, 'skill_id' => 50], 
            ['course_id' => 49, 'skill_id' => 70],

            ['course_id' => 50, 'skill_id' => 70],
            ['course_id' => 50, 'skill_id' => 64], 

            ['course_id' => 51, 'skill_id' => 65],
            ['course_id' => 51, 'skill_id' => 64],

            ['course_id' => 52, 'skill_id' => 66], 
            ['course_id' => 52, 'skill_id' => 65], 

            ['course_id' => 53, 'skill_id' => 68], 
            ['course_id' => 53, 'skill_id' => 65],

            ['course_id' => 54, 'skill_id' => 69],
            ['course_id' => 54, 'skill_id' => 65],

            ['course_id' => 55, 'skill_id' => 65], 
            ['course_id' => 55, 'skill_id' => 66],
        ];

        foreach ($courseSkills as $courseSkill) {
            CourseSkill::firstOrCreate($courseSkill);
        }
    }
}
