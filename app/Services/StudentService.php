<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class StudentService
{
    public function getProfile()
    {
        $user = Auth::user();
        return $user;
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'email' => $data['email']
        ]);
    }
}
