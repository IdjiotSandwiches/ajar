<?php

namespace Database\Seeders;

use App\Models\DegreeType;
use Illuminate\Database\Seeder;

class DegreeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $degreeTypes = [
            ['name' => 'S1'],
            ['name' => 'S2'],
            ['name' => 'S3'],
            ['name' => 'D3']
        ];

        foreach ($degreeTypes as $degreeType) {
            DegreeType::firstOrCreate(['name' => $degreeType['name']]);
        }
    }
}
