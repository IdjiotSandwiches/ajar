<?php

namespace App\Http\Controllers\Teacher;

use Inertia\Inertia;
use App\Enums\StateEnum;
use App\Utilities\Utility;
use App\Http\Controllers\Controller;
use App\Http\Requests\ApplicationRequest;
use App\Services\Teacher\TeacherApplicationService;

class TeacherApplicationController extends Controller
{
    private TeacherApplicationService $service;

    public function __construct(TeacherApplicationService $service)
    {
        $this->service = $service;
    }

    public function getTeacherApplications(ApplicationRequest $request)
    {
        $validated = $request->validated();
        $status = StateEnum::Available;

        if (!empty($validated['status']))
            $status = StateEnum::from($validated['status']);

        $categories = Utility::getParentCategories();
        $institutes = $this->service->getInstituteApplications($status, $validated);
        $counts = $this->service->getInstituteApplicationCount();
        return Inertia::render('teacher/institute-applications', [
            'institutes' => Inertia::scroll($institutes),
            'categories' => $categories,
            'counts' => $counts,
            'filters' => [
                'search' => $validated['search'] ?? null,
                'state' => $status,
                'category_id' => $validated['category_id'] ?? null
            ]
        ]);
    }

    public function getCourseApplications(ApplicationRequest $request)
    {
        $validated = $request->validated();
        $status = StateEnum::Available;

        if (!empty($validated['status']))
            $status = StateEnum::from($validated['status']);

        $categories = $this->service->getSubCategories();
        $courses = $this->service->getCourseApplications($status, $validated);
        $counts = $this->service->getCourseApplicationCount();
        return Inertia::render('teacher/course-application', [
            'courses' => Inertia::scroll($courses),
            'categories' => $categories,
            'counts' => $counts,
            'filters' => [
                'search' => $validated['search'] ?? null,
                'category_id' => $validated['category_id'] ?? null,
                'state' => $status
            ]
        ]);
    }

    public function applyAsTeacher($id)
    {
        try {
            $this->service->applyAsTeacher($id);
            return back()->with('success', 'You have applied, please wait for a moment!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function applyToCourse($id)
    {
        try {
            $this->service->applyToCourse($id);
            return back()->with('success', 'You have applied, please wait for a moment!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
