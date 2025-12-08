<?php

namespace App\Services;

use App\Utilities\UploadUtility;
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

        $url = null;
        if (isset($data['profile_picture'])) {
            $url = UploadUtility::upload($data['profile_picture'], 'profile_picture');
        }

        $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'email' => $data['email'],
            'profile_picture' => $url ?? $user->profile_picture
        ]);
    }
}
