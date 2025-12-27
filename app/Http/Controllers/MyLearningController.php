<?php

namespace App\Http\Controllers;

use App\Enums\LearningStatusEnum;
use App\Http\Requests\LinkRequest;
use App\Services\MyLearningService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyLearningController extends Controller
{
    private MyLearningService $service;

    public function __construct(MyLearningService $service)
    {
        $this->service = $service;
    }

    public function getMyLearning(Request $request)
    {
        $status = LearningStatusEnum::Ongoing;

        if (!empty($request['status']))
            $status = LearningStatusEnum::from($request['status']);

        $courses = $this->service->getCourses($status);
        $counts = $this->service->getCoursesCount();
        return Inertia::render('mylearning', [
            'courses' => Inertia::scroll($courses),
            'counts' => $counts,
            'state' => $status
        ]);
    }

    public function saveCourseRecording(LinkRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            return back()->with('success', 'Recording link saved.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function saveCourseMeeting(LinkRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            return back()->with('success', 'Meeting link added.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
