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
        // $users = [
        //     [
        //         'name' => 'Admin',
        //         'email' => 'admin@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456701',
        //         'role_id' => 1,
        //     ],
        //     [
        //         'name' => 'Teacher_1',
        //         'email' => 'teacher_1@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456702',
        //         'role_id' => 2,
        //     ],
        //     [
        //         'name' => 'Teacher_2',
        //         'email' => 'teacher_2@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456703',
        //         'role_id' => 2,
        //     ],
        //     [
        //         'name' => 'Teacher_3',
        //         'email' => 'teacher_3@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456704',
        //         'role_id' => 2,
        //     ],
        //     [
        //         'name' => 'Institute_1',
        //         'email' => 'institute_1@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456705',
        //         'role_id' => 3,
        //     ],
        //     [
        //         'name' => 'Institute_2',
        //         'email' => 'institute_2@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456706',
        //         'role_id' => 3,
        //     ],
        //     [
        //         'name' => 'Student',
        //         'email' => 'student@example.com',
        //         'password' => Hash::make('password'),
        //         'phone_number' => '08123456707',
        //         'role_id' => 4,
        //     ],
        // ];
        $defaultPassword = Hash::make('password');

        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081200000001',
                'role_id' => 1,
            ],

            [
                'name' => 'Dr. Sarah Mitchell',
                'email' => 'sarah.mitchell@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081211110001',
                'role_id' => 2, 
            ],
            [
                'name' => 'James Rodriguez', 
                'email' => 'james.rod@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081211110002',
                'role_id' => 2,
            ],
            [
                'name' => 'Emily Chen', 
                'email' => 'emily.chen@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081211110003',
                'role_id' => 2,
            ],
            [
                'name' => 'Robert "Bob" Wilson',
                'email' => 'bob.wilson@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081211110004',
                'role_id' => 2,
            ],
            [
                'name' => 'Jessica Alana',
                'email' => 'jessica.art@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081211110005',
                'role_id' => 2,
            ],

            [
                'name' => 'TechNova Academy', 
                'email' => 'contact@technova.com',
                'password' => $defaultPassword,
                'phone_number' => '081222220001',
                'role_id' => 3,
            ],
            [
                'name' => 'CyberShield Security Labs', 
                'email' => 'info@cybershield.com',
                'password' => $defaultPassword,
                'phone_number' => '081222220002',
                'role_id' => 3,
            ],
            [
                'name' => 'Creative Pixel Studio', 
                'email' => 'hello@creativepixel.com',
                'password' => $defaultPassword,
                'phone_number' => '081222220003',
                'role_id' => 3,
            ],
            [
                'name' => 'DataStream Institute',
                'email' => 'support@datastream.com',
                'password' => $defaultPassword,
                'phone_number' => '081222220004',
                'role_id' => 3,
            ],
            [
                'name' => 'CodeMaster Bootcamp',
                'email' => 'admissions@codemaster.com',
                'password' => $defaultPassword,
                'phone_number' => '081222220005',
                'role_id' => 3,
            ],

            [
                'name' => 'John Student',
                'email' => 'student@example.com',
                'password' => $defaultPassword,
                'phone_number' => '081233330001',
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
