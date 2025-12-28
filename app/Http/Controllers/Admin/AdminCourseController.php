<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Services\Admin\AdminCourseService;

class AdminCourseController extends Controller
{
    private AdminCourseService $service;

    public function __construct(AdminCourseService $service)
    {
        $this->service = $service;
    }

    public function getCompletedCourses()
    {
        $schedules = $this->service->getCompletedCourses();
        return Inertia::render('my-learning/course-completion', [
            'schedules' => $schedules
        ]);
    }

    public function completeCourse($id)
    {
        try {
            $this->service->completeCourse($id);
            return back()->with('success', 'Course completed.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getAllCourses()
    {
        $courses = $this->service->getAllCourses();
        return Inertia::render('admin/remove-course', [
            'courses' => $courses
        ]);
    }

    public function removeCourse($id)
    {
        try {
            $this->service->removeCourse($id);
            return back()->with('success', 'Course removed.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
