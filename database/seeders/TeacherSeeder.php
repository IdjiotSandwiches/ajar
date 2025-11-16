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
                'description' => '',
                'is_verified' => true,
                'category_id' => 3
            ],
            [
                'user_id' => 3,
                'description' => '',
                'is_verified' => true,
                'category_id' => 3
            ],
            [
                'user_id' => 4,
                'description' => '',
                'is_verified' => true,
                'category_id' => 8
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::firstOrCreate($teacher);
        }
    }
}
