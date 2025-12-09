<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfilePictureRequest;
use App\Services\UtilityService;

class UtilityController extends Controller
{
    private UtilityService $service;

    public function __construct(UtilityService $service)
    {
        $this->service = $service;
    }

    public function postImage(ProfilePictureRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->uploadImage($data);
            return back()->with('success', 'Profile picture updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
