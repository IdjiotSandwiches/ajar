<?php

namespace Database\Seeders;

use App\Models\Institute;
use Illuminate\Database\Seeder;

class InstituteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institutes = [
            [
                'user_id' => 5,
                'website' => '',
                'description' => '',
                'category_id' => 1
            ],
            [
                'user_id' => 6,
                'website' => '',
                'description' => '',
                'category_id' => 2
            ],
        ];

        foreach ($institutes as $institute) {
            Institute::firstOrCreate($institute);
        }
    }
}
