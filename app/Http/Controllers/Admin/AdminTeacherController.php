<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Admin\AdminTeacherService;

class AdminTeacherController extends Controller
{
    private AdminTeacherService $service;

    public function __construct(AdminTeacherService $service)
    {
        $this->service = $service;
    }

    public function getTeacherList()
    {
        $teachers = $this->service->getTeacherList();
        return Inertia::render('admin/list-teacher', [
            'teachers' => $teachers
        ]);
    }

    public function deleteTeacher($id)
    {
        try {
            $this->service->removeTeacher($id);
            return back()->with('success', 'Teacher removed.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getUnverifiedTeachers()
    {
        $applications = $this->service->getUnverifiedTeachers();
        return Inertia::render('admin/teacher-application', [
            'applications' => $applications
        ]);
    }

    public function acceptTeacher($id)
    {
        try {
            $this->service->verifyTeacher($id, true);
            return back()->with('success', 'Teacher has been verified.');
        } catch (\Exception $e) {
            return back()->with('error', 'Teacher not found!');
        }
    }

    public function rejectTeacher($id)
    {
        try {
            $this->service->verifyTeacher($id, false);
            return back()->with('success', 'Teacher has been declined.');
        } catch (\Exception $e) {
            return back()->with('error', 'Teacher not found!');
        }
    }
}
