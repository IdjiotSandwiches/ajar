<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456701',
                'role_id' => 1,
            ],
            [
                'name' => 'Teacher_1',
                'email' => 'teacher_1@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456702',
                'role_id' => 2,
            ],
            [
                'name' => 'Teacher_2',
                'email' => 'teacher_2@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456703',
                'role_id' => 2,
            ],
            [
                'name' => 'Teacher_3',
                'email' => 'teacher_3@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456704',
                'role_id' => 2,
            ],
            [
                'name' => 'Institute_1',
                'email' => 'institute_1@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456705',
                'role_id' => 3,
            ],
            [
                'name' => 'Institute_2',
                'email' => 'institute_2@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456706',
                'role_id' => 3,
            ],
            [
                'name' => 'Student',
                'email' => 'student@example.com',
                'password' => Hash::make('password'),
                'phone_number' => '08123456707',
                'role_id' => 4,
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
