<?php

namespace App\Http\Controllers;

use App\Enums\LearningStatusEnum;
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
        return Inertia::render('mylearning', [
            'courses' => Inertia::scroll($courses)
        ]);
    }
}
