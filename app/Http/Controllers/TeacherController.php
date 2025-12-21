<?php

namespace App\Http\Controllers;

use App\Enums\StateEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddScheduleRequest;
use App\Http\Requests\ApplicationRequest;
use App\Http\Requests\AvailabilityRequest;
use App\Http\Requests\TeacherDetailRequest;
use App\Http\Requests\TeacherProfileRequest;
use App\Http\Requests\TeachingFilterRequest;
use App\Services\TeacherService;
use App\Utilities\Utility;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherController extends Controller
{
    private TeacherService $service;

    public function __construct(TeacherService $service)
    {
        $this->service = $service;
    }

    public function getTeacherDetail($id)
    {
        $detail = $this->service->getTeacherDetail($id);
        return Inertia::render('teacher/detail', [
            'teacher' => $detail['teacher'],
            'application' => $detail['application']
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

    public function getProfile()
    {
        return Inertia::render('teacher/edit-profile', [
            'profile' => $this->service->getProfile(),
            'detail' => $this->service->getTeacherDetail(Auth::user()->id)['teacher']
        ]);
    }

    public function putProfile(TeacherProfileRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->updateProfile($data);
            return back()->with('success', 'Update success.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function putDetail(TeacherDetailRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->updateDetail($data);
            return back()->with('success', 'Update success.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function addMeetingLink($id, Request $request)
    {
        $validated = $request->validate([
            'link' => ['required', 'url'],
        ]);

        $link = $validated['link'];
        $schedule = $this->service->addMeetingLink($id, $link);
        if (!$schedule) {
            return back()->with(['error', 'Schedule not found.']);
        } else {
            return back()->with(['success', 'Meeting Link added.']);
        }
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
            'state' => $status,
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
            'state' => $status,
        ]);
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

    public function getTeachingCourses(TeachingFilterRequest $request)
    {
        $validated = $request->validated();
        $teachings = $this->service->getTeachingCoursesWithSchedule($validated);
        return Inertia::render('teacher/courses-taught', [
            'teachings' => $teachings,
            'categories' => Utility::getParentCategories()
        ]);
    }
}
