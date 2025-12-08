<?php

namespace App\Services;

use App\Utilities\UploadUtility;
use Illuminate\Support\Facades\Auth;

class UtilityService
{
    public function uploadImage($data)
    {
        $user = Auth::user();

        $url = null;
        if (isset($data['profile_picture'])) {
            $url = UploadUtility::upload($data['profile_picture'], 'profile_picture');
        }

        $user->update([
            'profile_picture' => $url ?? $user->profile_picture
        ]);
    }
}
