<?php

namespace App\Services;

use App\Models\Institute;
use App\Models\Teacher;
use Exception;
use App\Models\User;
use App\Enums\RoleEnum;
use App\Interfaces\RegisterInterface;
use Fruitcake\Cors\Exceptions\InvalidOptionException;
use Illuminate\Support\Facades\Hash;

class RegisterService implements RegisterInterface
{
    public function register(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone_number' => $data['phone_number'],
            'role_id' => $data['role_id']
        ]);

        switch ($user->role_id)
        {
            case RoleEnum::Teacher:
                Teacher::create([
                    'user_id' => $user->id
                ]);
                break;
            case RoleEnum::Institute:
                Institute::create([
                    'user_id' => $user->id
                ]);
                break;
            case RoleEnum::Student:
                break;
            default:
                throw new InvalidOptionException("");
        }

        return $user;
    }
}
