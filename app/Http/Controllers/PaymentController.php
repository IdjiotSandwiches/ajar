<?php

namespace App\Http\Controllers;

use App\Http\Requests\MidtransWebhookRequest;
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

        $course = $this->service->getCourseDetail($courseId);
        $teachers = $this->service->getTeachingCourses($courseId);
        return Inertia::render('courses/payment', [
            'course' => $course,
            'teachers' => $teachers,
            'schedules' => Inertia::lazy(fn() => $this->service->getCourseSchedules($courseId, $teacherId)),
        ]);
    }

    public function getPendingEnrollment($id)
    {
        $enrollment = $this->service->getPendingEnrollment($id);
        return Inertia::render('courses/payment', [
            'course' => $enrollment['course'],
            'teachers' => [$enrollment['teacher']],
            'schedules' => [$enrollment['schedule']],
            'payment' => $enrollment['payment']
        ]);
    }

    public function createPayment($scheduleId)
    {
        try {
            $snapToken = $this->service->payment($scheduleId);
            return back()->with([
                'snap_token' => $snapToken
            ]);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function updateStatus(MidtransWebhookRequest $request)
    {
        try {
            $validated = $request->validated();
            $this->service->completePayment($validated);
        } catch (\Exception $e) {
            report($e);
            return response('Internal error', 500);
        }
    }

    public function getPaymentList()
    {
        [$payments, $amounts] = $this->service->getPaymentList();
        return Inertia::render('student/payment-lms', [
            'payments' => $payments,
            'amounts' => $amounts
        ]);
    }
}
