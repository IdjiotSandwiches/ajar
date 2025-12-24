<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
    }

    public function getEnrollment(Request $request)
    {
        $courseId = $request->query('course');
        $teacherId = $request->query('teacher');
        $teachers = $this->service->getTeachingCourses($courseId);

        $data = [
            'teachers' => $teachers,
            'schedules' => Inertia::lazy(fn() => $this->service->getCourseSchedules($courseId, $teacherId))
        ];

        return Inertia::render('courses/payment', $data);
    }

    public function getPendingEnrollment($id)
    {
        return Inertia::render('courses/payment');
    }
}
