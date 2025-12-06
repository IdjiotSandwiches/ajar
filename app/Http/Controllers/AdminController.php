<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\AdminService;
use Inertia\Inertia;

class AdminController extends Controller
{
    private AdminService $service;

    public function __construct(AdminService $service)
    {
        $this->service = $service;
    }

    public function getTeacherVerifications()
    {
        $teachers = $this->service->getTeacherVerifications();
        return Inertia::render('admin/teacher-verification', [
            'verifications' => $teachers
        ]);
    }

    public function acceptTeacher($id)
    {
        $isAccepted = $this->service->verifyTeacher($id, true);
        if (!$isAccepted) {
            return back()->with('error', 'Teacher not found!');
        }
        else {
            return back()->with('success', 'Teacher has been verified.');
        }
    }

    public function rejectTeacher($id)
    {
        $isAccepted = $this->service->verifyTeacher($id, false);
        if (!$isAccepted) {
            return back()->with('error', 'Teacher not found!');
        }
        else {
            return back()->with('success', 'Teacher has been declined.');
        }
    }
}
