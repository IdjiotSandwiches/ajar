<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\LinkRequest;
use App\Http\Requests\ReviewRequest;
use App\Enums\LearningStatusEnum;
use App\Services\MyLearningService;

class MyLearningController extends Controller
{
    private MyLearningService $service;

    public function __construct(MyLearningService $service)
    {
        $this->service = $service;
    }

    public function getMyLearning(Request $request)
    {
        $enroll_id = $request->query('enroll_id');
        $status = LearningStatusEnum::Ongoing;
        $date = now()->format('Y-m-d');
        if (!empty($request['status']))
            $status = LearningStatusEnum::from($request['status']);
        if (!empty($request['date']))
            $date = $request['date'];

        $courses = $this->service->getCourses($status);
        $counts = $this->service->getCoursesCount();
        $dateCourses = $this->service->getCoursesByDate($date);
        return Inertia::render('mylearning', [
            'courses' => Inertia::scroll($courses),
            'counts' => $counts,
            'dateCourses' => $dateCourses,
            'review' => Inertia::lazy(fn() => $this->service->getRelatedIdentity($enroll_id)),
            'filters' => [
                'state' => $status,
                'date' => $date
            ]
        ]);
    }

    public function saveCourseRecording(LinkRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $this->service->saveCourseRecording($id, $validated);
            return back();
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function saveCourseMeeting(LinkRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $this->service->saveCourseMeeting($id, $validated);
            return back();
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function addReviews($id, ReviewRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->addReviews($id, $data);
            return back();
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
