<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ItemFilterRequest;
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

    public function getTeacherList(ItemFilterRequest $request)
    {
        $validated = $request->validated();
        $teachers = $this->service->getTeacherList($validated);
        return Inertia::render('admin/list-teacher', [
            'teachers' => $teachers,
            'filters' => [
                'search' => $validated['search'] ?? null,
                'search_secondary' => $validated['search_secondary'] ?? null,
                'count' => $validated['count'] ?? null,
                'rating' => $validated['rating'] ?? null,
            ]
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
