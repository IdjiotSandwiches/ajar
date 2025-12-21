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

    public function deleteInstitute($id)
    {
        try {
            $this->adminService->removeInstitute($id);
            return back()->with('success', 'Institute removed.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getTeacherList()
    {
        $teachers = $this->adminService->getTeacherList();
        return Inertia::render('admin/list-teacher', [
            'teachers' => $teachers
        ]);
    }

    public function deleteTeacher($id)
    {
        try {
            $this->adminService->removeTeacher($id);
            return back()->with('success', 'Teacher removed.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getUnverifiedTeachers()
    {
        $applications = $this->adminService->getUnverifiedTeachers();
        return Inertia::render('admin/teacher-application', [
            'applications' => $applications
        ]);
    }

    public function acceptTeacher($id)
    {
        $isAccepted = $this->adminService->verifyTeacher($id, true);
        if (!$isAccepted) {
            return back()->with('error', 'Teacher not found!');
        }
        else {
            return back()->with('success', 'Teacher has been verified.');
        }
    }

    public function rejectTeacher($id)
    {
        $isAccepted = $this->adminService->verifyTeacher($id, false);
        if (!$isAccepted) {
            return back()->with('error', 'Teacher not found!');
        }
        else {
            return back()->with('success', 'Teacher has been declined.');
        }
    }
}
