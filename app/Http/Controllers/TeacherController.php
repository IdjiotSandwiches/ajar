<?php

namespace App\Http\Controllers;

use App\Enums\StateEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherApplicationRequest;
use App\Http\Requests\TeacherDetailRequest;
use App\Http\Requests\TeacherProfileRequest;
use App\Services\TeacherService;
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

    public function getTeacherApplications(TeacherApplicationRequest $request)
    {
        $validated = $request->validated();
        $status = StateEnum::Available;

        if (!empty($validated['status']))
            $status = StateEnum::from($validated['status']);

        $institutes = $this->service->getInstituteApplications($status);
        $counts = $this->service->getInstituteApplicationCount();
        return Inertia::render('teacher/institute-applications', [
            'institutes' => Inertia::scroll($institutes),
            'counts' => $counts,
            'state' => $status
        ]);
    }
}
