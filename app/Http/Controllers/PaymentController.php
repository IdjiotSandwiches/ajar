<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\PaymentService;
use App\Http\Requests\MidtransWebhookRequest;

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
        if (!$course) {
            return redirect()->intended(route('detail-course', $courseId));
        }

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
        if (!$enrollment)
            return back();

        return Inertia::render('courses/payment', [
            'course' => $enrollment['course'],
            'teachers' => [$enrollment['teacher']],
            'schedules' => [$enrollment['schedule']],
            'payment' => $enrollment['payment']
        ]);
    }

    public function createPayment($scheduleId, $bypass = false)
    {
        try {
            $snapToken = $this->service->payment($scheduleId, $bypass);
            if (!$bypass) {
                return back()->with([
                    'snap_token' => $snapToken
                ]);
            } else {
                return Inertia::location(route('my-learning'));
            }
        } catch (\Exception $e) {
            return redirect()->route('payment-lms')
                ->with('error', $e->getMessage());
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
