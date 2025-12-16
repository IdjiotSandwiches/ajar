<?php

namespace App\Services;

use App\Enums\DegreeTypeEnum;
use App\Models\Certificate;
use App\Models\Graduate;
use App\Models\Institute;
use App\Models\Teacher;
use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\WorkExperience;
use App\Utilities\UploadUtility;
use Fruitcake\Cors\Exceptions\InvalidOptionException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterService
{
    /**
     * Transaction of user registration
     *
     * @param array $data
     * @return \App\Models\User
     */
    public function register(array $data): User
    {
        return DB::transaction(function() use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone_number' => $data['phone_number'],
                'role_id' => RoleEnum::from($data['role_id'])->value
            ]);

            switch ($user->role_id)
            {
                case RoleEnum::Teacher:
                    $this->createTeacher($data, $user);
                    break;
                case RoleEnum::Institute:
                    Institute::create([
                        'user_id' => $user->id
                    ]);
                    break;
                case RoleEnum::Student:
                    break;
                default:
                    throw new InvalidOptionException("Invalid role!");
            }

            return $user;
        });
    }

    /**
     * Teacher data creation
     *
     * @param array $data
     * @param \App\Models\User $user
     * @return void
     */
    private function createTeacher(array $data, User $user): void
    {
        $teacher = Teacher::create([
            'user_id' => $user->id,
            'description' => $data['description'],
            'is_verified' => false,
            'category_id' => $data['category']
        ]);

        foreach($data['graduates'] as $graduate) {
            Graduate::create([
                'degree_title' => $graduate['degree_title'],
                'university_name' => $graduate['university_name'],
                'teacher_id' => $teacher->user_id,
                'degree_type_id' => DegreeTypeEnum::from($graduate['degree_type'])->value
            ]);
        }

        foreach($data['works'] as $work) {
            WorkExperience::create([
                'position' => $work['position'],
                'institution' => $work['institution'],
                'duration' => $work['duration'],
                'teacher_id' => $teacher->user_id
            ]);
        }

        foreach($data['certificates'] as $certificate) {
            $url = UploadUtility::upload($certificate, 'certificates');
            if ($url) {
                Certificate::create([
                    'image' => $url,
                    'teacher_id' => $teacher->user_id
                ]);
            }
        }
    }
}
