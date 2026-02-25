<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\TeacherDetailRequest;
use App\Http\Requests\TeacherProfileRequest;
use App\Services\Teacher\TeacherService;

class TeacherController extends Controller
{
    private TeacherService $service;

    public function __construct(TeacherService $service)
    {
        $this->service = $service;
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

    public function getSessionDetail(Request $request, $id)
    {
        $myCourseId = $request->query('my_course_id');
        $session = $this->service->sessionDetail($id);
        $students = $this->service->enrollsDetail($id);
        return Inertia::render('my-learning/session-management', [
            'session' => $session,
            'students' => $students,
            'answers' => Inertia::lazy(fn() => $this->service->getQuizAnswers($myCourseId)),
        ]);
    }
}
