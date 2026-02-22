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
                'user_id' => 25,
                'website' => 'https://technova-academy.com',
                'description' => 'Premier academy for emerging technologies and AI innovation.',
                'category_id' => 1
            ],
            [
                'user_id' => 26,
                'website' => 'https://cybershield-labs.io',
                'description' => 'Advanced training center for network defense and ethical hacking.',
                'category_id' => 1
            ],
            [
                'user_id' => 27,
                'website' => 'https://creativepixel.studio',
                'description' => 'A creative hub for digital artists, illustrators, and designers.',
                'category_id' => 2
            ],
            [
                'user_id' => 28,
                'website' => 'https://datastream-edu.com',
                'description' => 'Specialized institute for Cloud Computing and Big Data Analytics.',
                'category_id' => 1
            ],
            [
                'user_id' => 29,
                'website' => 'https://codemaster-bootcamp.dev',
                'description' => 'Intensive coding bootcamps to launch your tech career.',
                'category_id' => 1
            ],
        ];

        foreach ($institutes as $institute) {
            Institute::firstOrCreate($institute);
        }
    }
}
