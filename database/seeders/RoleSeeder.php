<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Admin'],
            ['name' => 'Teacher'],
            ['name' => 'Institute'],
            ['name' => 'Student']
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']]);
        }
    }
}
