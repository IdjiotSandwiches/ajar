<?php

namespace Database\Seeders;

use App\Models\SocialMediaType;
use Illuminate\Database\Seeder;

class SocialMediaTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $socialMediaTypes = [
            ['name' => 'Twitter'],
            ['name' => 'Facebook'],
            ['name' => 'Instagram'],
            ['name' => 'LinkedIn']
        ];

        foreach ($socialMediaTypes as $socialMediaType) {
            SocialMediaType::firstOrCreate(['name' => $socialMediaType['name']]);
        }
    }
}
