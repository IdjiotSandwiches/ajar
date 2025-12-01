<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'user_id' => 2,
                'description' => 'Expert in Artificial Intelligence and Robotics.',
                'is_verified' => true,
                'category_id' => 3
            ],
            [
                'user_id' => 3,
                'description' => 'Senior Network Engineer with CCIE certification.',
                'is_verified' => true,
                'category_id' => 4
            ],
            [
                'user_id' => 4,
                'description' => 'Cybersecurity analyst specializing in ethical hacking.',
                'is_verified' => true,
                'category_id' => 5
            ],
            [
                'user_id' => 5,
                'description' => 'Cloud Solutions Architect (AWS & GCP).',
                'is_verified' => true,
                'category_id' => 6
            ],
            [
                'user_id' => 6,
                'description' => 'Data Scientist experienced in Big Data.',
                'is_verified' => true,
                'category_id' => 7
            ],
            [
                'user_id' => 7,
                'description' => 'Fullstack Web Developer (MERN & Laravel).',
                'is_verified' => true,
                'category_id' => 8
            ],
            [
                'user_id' => 8,
                'description' => 'Professional Digital Artist and Retoucher.',
                'is_verified' => false,
                'category_id' => 9
            ],
            [
                'user_id' => 9,
                'description' => 'Vector Artist and Logo Designer.',
                'is_verified' => true,
                'category_id' => 10
            ],
            [
                'user_id' => 10,
                'description' => '3D Generalist specializing in Blender.',
                'is_verified' => true,
                'category_id' => 11
            ],
            [
                'user_id' => 11,
                'description' => 'UI/UX Designer using Figma.',
                'is_verified' => true,
                'category_id' => 13
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::firstOrCreate($teacher);
        }
    }
}
