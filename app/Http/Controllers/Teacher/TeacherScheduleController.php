<?php

namespace App\Http\Controllers\Teacher;

use Inertia\Inertia;
use App\Utilities\Utility;
use App\Http\Controllers\Controller;
use App\Http\Requests\ItemFilterRequest;
use App\Http\Requests\AddScheduleRequest;
use App\Http\Requests\AvailabilityRequest;
use App\Services\Teacher\TeacherScheduleService;

class TeacherScheduleController extends Controller
{
    private TeacherScheduleService $service;

    public function __construct(TeacherScheduleService $service)
    {
        $this->service = $service;
    }

    public function getScheduleManagement()
    {
        $schedules = $this->service->getSchedules();
        $teachings = $this->service->getTeachingCourses();
        $availability = $this->service->getAvailability();
        return Inertia::render('courses/add-schedule', [
            'sessions' => $schedules,
            'teachings' => $teachings,
            'availability' => $availability
        ]);
    }

    public function manageWeeklyCourse(AddScheduleRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->manageSchedule($data);
            return back()->with('success', 'Weekly schedules updated.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function manageAvailability(AvailabilityRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->manageAvailability($data);
            return back()->with('success', 'Work hours updated.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function getTeachingCourses(ItemFilterRequest $request)
    {
        $validated = $request->validated();
        $teachings = $this->service->getTeachingCoursesWithSchedule($validated);
        return Inertia::render('teacher/courses-taught', [
            'teachings' => $teachings,
            'categories' => Utility::getParentCategories()
        ]);
    }
}
