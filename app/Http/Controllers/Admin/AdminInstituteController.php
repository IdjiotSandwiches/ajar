<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Utilities\Utility;
use App\Services\RegisterService;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ItemFilterRequest;
use App\Services\Admin\AdminInstituteService;

class AdminInstituteController extends Controller
{
    private RegisterService $registerService;
    private AdminInstituteService $adminService;

    public function __construct(RegisterService $registerService, AdminInstituteService $adminService)
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

    public function getInstituteList(ItemFilterRequest $request)
    {
        $validated = $request->validated();
        $institutes = $this->adminService->getInstituteList($validated);
        $categories = Utility::getParentCategories();
        return Inertia::render('admin/list-institute', [
            'institutes' => $institutes,
            'categories' => $categories,
            'filters' => [
                'search' => $validated['search'] ?? null,
                'category_id' => $validated['category_id'] ?? null,
                'count' => $validated['count'] ?? null,
                'rating' => $validated['rating'] ?? null,
            ]
        ]);
    }

    public function deleteInstitute($id)
    {
        try {
            $this->adminService->removeInstitute($id);
            return back()->with('success', 'Institute removed.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
