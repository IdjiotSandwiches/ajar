<?php

namespace App\Http\Controllers\Institute;

use Inertia\Inertia;
use App\Services\Institute\InstituteService;
use App\Http\Controllers\Controller;
use App\Http\Requests\InstituteProfileRequest;

class InstituteController extends Controller
{
    private InstituteService $service;

    public function __construct(InstituteService $service)
    {
        $this->service = $service;
    }

    public function getProfile()
    {
        return Inertia::render('institute/edit-profile', [
            'profile' => $this->service->getProfile()
        ]);
    }

    public function putProfile(InstituteProfileRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->updateProfile($data);
            return back()->with('success', 'Update success.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update profile.');
        }
    }
}
