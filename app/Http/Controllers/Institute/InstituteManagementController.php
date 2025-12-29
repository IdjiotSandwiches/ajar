<?php

namespace App\Http\Controllers\Institute;

use App\Http\Requests\ItemFilterRequest;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Institute\InstituteManagementService;

class InstituteManagementController extends Controller
{
    private InstituteManagementService $service;

    public function __construct(InstituteManagementService $service)
    {
        $this->service = $service;
    }

    public function getTeacherApplications()
    {
        $teachers = $this->service->getTeacherApplications();
        return Inertia::render('institute/teacher-application', [
            'applications' => $teachers
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

    public function getTeacherList(ItemFilterRequest $request)
    {
        $filters = $request->validated();
        $teachers = $this->service->teacherList($filters);
        return Inertia::render('institute/teacher-list', [
            'teachers' => $teachers,
            'filters' => [
                'search' => $filters['search'] ?? null,
                'rating' => $filters['rating'] ?? null,
                'date' => $filters['date'] ?? null,
                'count' => $filters['count'] ?? null,
            ]
        ]);
    }

    public function removeTeacher($id)
    {
        $deactivated = $this->service->deactiveTeacher($id);
        if (!$deactivated) {
            return back()->with('error', 'Teacher not found!');
        }
        else {
            return back()->with('success', 'Teacher has been deactivated.');
        }
    }

    public function getCourseApplications()
    {
        $teachers = $this->service->getCourseApplications();
        return Inertia::render('institute/course-teacher-applications', [
            'applications' => $teachers
        ]);
    }

    public function acceptCourse($id)
    {
        $isAccepted = $this->service->verifyCourse($id, true);
        if (!$isAccepted) {
            return back()->with('error', 'Course not found!');
        }
        else {
            return back()->with('success', 'Course Application has been verified.');
        }
    }

    public function rejectCourse($id)
    {
        $isAccepted = $this->service->verifyCourse($id, false);
        if (!$isAccepted) {
            return back()->with('error', 'Course not found!');
        }
        else {
            return back()->with('success', 'Course Application has been declined.');
        }
    }
}
