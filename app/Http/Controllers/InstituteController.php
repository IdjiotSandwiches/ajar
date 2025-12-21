<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Http\Requests\InstituteProfileRequest;
use App\Http\Requests\TeacherFilterRequest;
use App\Services\InstituteService;
use App\Utilities\Utility;
use Inertia\Inertia;

class InstituteController extends Controller
{
    private InstituteService $service;

    public function __construct(InstituteService $service)
    {
        $this->service = $service;
    }

    public function getInstituteDetail($id)
    {
        $data = $this->service->getInstituteDetail($id);
        $application = $this->service->getTeacherApplication($id);

        return Inertia::render('institute/detail', [
            'institute' => $data['institute'],
            'courses' => Inertia::scroll($data['courses']),
            'teachers' => $data['teachers'],
            'application' => $application
        ]);
    }

    public function getInstituteList(FilterRequest $request)
    {
        $filters = $request->validated();
        $parentCategories = Utility::getParentCategories();
        $institutes = $this->service->getInstituteList($filters);
        return Inertia::render('institute/list-institute', [
            'parentCategories' => $parentCategories,
            'institutes' => Inertia::scroll($institutes),
            'activeCategory' => $filters['category_id'] ?? null,
            'search' => $filters['search'] ?? '',
        ]);
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

    public function getTeacherList(TeacherFilterRequest $request)
    {
        $filters = $request->validated();
        $teachers = $this->service->teacherList($filters);
        return Inertia::render('institute/teacher-list', [
            'teachers' => $teachers
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
