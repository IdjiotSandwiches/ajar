<?php

namespace App\Http\Controllers;

use App\Services\MyLearningService;
use Inertia\Inertia;

class MyLearningController extends Controller
{
    private MyLearningService $service;

    public function __construct(MyLearningService $service)
    {
        $this->service = $service;
    }

    public function getMyLearning()
    {
        return Inertia::render('my-learning/app', [
            'myLearning' => Inertia::lazy(fn() => Inertia::scroll($this->service->getEnrolledCourses()))
        ]);
    }
}
