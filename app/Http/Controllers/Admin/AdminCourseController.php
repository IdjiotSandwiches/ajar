<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Utilities\Utility;
use App\Http\Controllers\Controller;
use App\Http\Requests\ItemFilterRequest;
use App\Services\Admin\AdminCourseService;

class AdminCourseController extends Controller
{
    private AdminCourseService $service;

    public function __construct(AdminCourseService $service)
    {
        $this->service = $service;
    }

    public function getCompletedCourses(ItemFilterRequest $request)
    {
        $validated = $request->validated();
        $schedules = $this->service->getCompletedCourses($validated);
        $categories = Utility::getSubCategories();
        return Inertia::render('my-learning/course-completion', [
            'schedules' => $schedules,
            'categories' => $categories,
            'filters' => [
                'search' => $validated['search'] ?? null,
                'category_id' => $validated['category_id'] ?? null,
                'time' => $validated['time'] ?? null,
                'date' => $validated['date'] ?? null,
            ]
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

    public function getAllCourses(ItemFilterRequest $request)
    {
        $validated = $request->validated();
        $courses = $this->service->getAllCourses($validated);
        $categories = Utility::getSubCategories();
        return Inertia::render('admin/remove-course', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => [
                'search' => $validated['search'] ?? null,
                'category_id' => $validated['category_id'] ?? null,
                'search_secondary' => $validated['search_secondary'] ?? null
            ]
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
