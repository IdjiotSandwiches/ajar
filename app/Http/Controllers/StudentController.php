<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\StudentService;
use App\Http\Requests\StudentProfileRequest;

class StudentController extends Controller
{
    private StudentService $service;

    public function __construct(StudentService $service)
    {
        $this->service = $service;
    }

    public function getProfile()
    {
        return Inertia::render('student/edit-profile', [
            'profile' => $this->service->getProfile()
        ]);
    }

    public function putProfile(StudentProfileRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->updateProfile($data);
            return back()->with('success', 'Update success.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update profile.');
        }
    }

    public function getMyCourses()
    {
        $courses = $this->service->getMyCourses();
        return Inertia::render('student/my-course', [
            'myCourses' => $courses
        ]);
    }

    public function getMyCourse($id)
    {
        $course = $this->service->getMyCourse($id);
        return Inertia::render('student/course-session', [
            'course' => $course
        ]);
    }
}
