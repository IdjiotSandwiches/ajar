<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\AdminService;
use App\Services\RegisterService;
use App\Utilities\Utility;
use Inertia\Inertia;

class AdminController extends Controller
{
    private RegisterService $registerService;
    private AdminService $adminService;

    public function __construct(RegisterService $registerService, AdminService $adminService)
    {
        $this->registerService = $registerService;
        $this->adminService = $adminService;
    }

    public function getRegisterInstitute()
    {
        return Inertia::render('admin/register-institute', [
            'categories' => Utility::getParentCategories()
        ]);
    }

    public function registerInstitute(RegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $this->registerService->register($data);
            return redirect()->route('admin.list-institute')->with('success', 'Institute created.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function getInstituteList()
    {
        $institutes = $this->adminService->getInstituteList();
        return Inertia::render('admin/list-institute', [
            'institutes' => $institutes
        ]);
    }

    // public function
}
