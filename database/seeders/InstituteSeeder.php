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
                'user_id' => 7,
                'website' => 'https://technova-academy.com',
                'description' => 'Premier academy for emerging technologies and AI innovation.',
                'category_id' => 3 
            ],
            [
                'user_id' => 8,
                'website' => 'https://cybershield-labs.io',
                'description' => 'Advanced training center for network defense and ethical hacking.',
                'category_id' => 5 
            ],
            [
                'user_id' => 9,
                'website' => 'https://creativepixel.studio',
                'description' => 'A creative hub for digital artists, illustrators, and designers.',
                'category_id' => 13 
            ],
            [
                'user_id' => 10,
                'website' => 'https://datastream-edu.com',
                'description' => 'Specialized institute for Cloud Computing and Big Data Analytics.',
                'category_id' => 6
            ],
            [
                'user_id' => 11,
                'website' => 'https://codemaster-bootcamp.dev',
                'description' => 'Intensive coding bootcamps to launch your tech career.',
                'category_id' => 8 
            ],
        ];

        foreach ($institutes as $institute) {
            Institute::firstOrCreate($institute);
        }
    }
}
