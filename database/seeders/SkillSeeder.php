<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'Javascript'],
            ['name' => 'HTML'],
            ['name' => 'CSS'],
            ['name' => 'Photoshop'],
            ['name' => 'ReactJS'],
            ['name' => 'AngularJS'],
            ['name' => 'C#'],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate(['name' => $skill['name']]);
        }
    }
}
