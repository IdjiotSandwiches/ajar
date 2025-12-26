<?php

namespace App\Services;

use App\Enums\MidtransTransactionEnum;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Midtrans\Config;
use App\Enums\CourseStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Course;
use App\Models\Payment;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use App\Models\TeachingCourse;
use Illuminate\Support\Facades\Auth;
use Midtrans\Snap;

class PaymentService
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');
    }

    public function getCourseDetail($id)
    {
        $course = Course::query()
            ->where('id', $id)
            ->select('name', 'price', 'duration', 'discount')
            ->selectRaw('(price - COALESCE(discount, 0)) as final_price')
            ->first();

        $hasSchedules = CourseSchedule::query()
            ->where('course_id', $id)
            ->exists();

        return $hasSchedules ? $course : null;
    }

    public function getTeachingCourses($id)
    {
        $teachers = TeachingCourse::with(['teacher.user'])
            ->where('course_id', $id)
            ->where('is_verified', true)
            ->get()
            ->map(fn($item) => [
                'id' => $item->teacher_id,
                'name' => $item->teacher->user->name
            ]);

        return $teachers;
    }

    public function getCourseSchedules($courseId, $teacherId)
    {
        $user = Auth::user();
        $buffer = 15;
        $schedules = CourseSchedule::query()
            ->where('course_id', $courseId)
            ->where('teacher_id', $teacherId)
            ->where('status', CourseStatusEnum::Scheduled)
            ->whereNotExists(function ($q) use ($user, $buffer) {
                $q->select(DB::raw(1))
                    ->from('enrolled_courses as ec')
                    ->join('course_schedules as cs2', 'cs2.id', '=', 'ec.course_schedule_id')
                    ->join('payments as p', 'p.enrolled_course_id', '=', 'ec.id')
                    ->where('ec.student_id', $user->id)
                    ->whereIn('p.status', [PaymentStatusEnum::Pending, PaymentStatusEnum::Paid])
                    ->whereRaw("cs2.start_time - INTERVAL ? MINUTE < course_schedules.end_time", [$buffer])
                    ->whereRaw("course_schedules.start_time < cs2.end_time + INTERVAL ? MINUTE", [$buffer]);
            })
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'date' => Carbon::parse($item->start_time)->format('d M Y'),
                'start_time' => Carbon::parse($item->start_time)->toTimeString('minute'),
                'end_time' => Carbon::parse($item->end_time)->toTimeString('minute')
            ]);

        return $schedules;
    }

    public function payment($scheduleId)
    {
        $user = Auth::user();
        $existingEnrollment = EnrolledCourse::where('course_schedule_id', $scheduleId)
            ->where('student_id', $user->id)
            ->whereHas('payment', function ($q) {
                $q->where('status', PaymentStatusEnum::Pending);
            })
            ->with('payment')
            ->first();

        if ($existingEnrollment && $existingEnrollment->payment->snap_token) {
            return [$existingEnrollment->payment->unique_id, $existingEnrollment->payment->snap_token];
        }

        $enrolled = EnrolledCourse::createOrFirst([
            'course_schedule_id' => $scheduleId,
            'student_id' => $user->id
        ]);

        $schedule = CourseSchedule::with(['course.category'])
            ->where('id', $scheduleId)
            ->first();

        $payment = Payment::create([
            'unique_id' => 'ENRL' . time() . random_int(100, 999),
            'enrolled_course_id' => $enrolled->id,
            'amount' => $schedule->course->price - $schedule->course->discount,
            'user_id' => $user->id
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $payment->unique_id,
                'gross_amount' => $payment->amount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone_number,
            ]
        ];

        $snapToken = Snap::getSnapToken($params);
        $payment->snap_token = $snapToken;
        $payment->save();

        return $payment->snap_token;
    }

    public function getPendingEnrollment($paymentId)
    {
        $user = Auth::user();
        $data = EnrolledCourse::with(['courseSchedule.teacher.user', 'courseSchedule.course', 'payment'])
            ->where('student_id', $user->id)
            ->whereHas(
                'payment',
                fn($q) => $q->where('status', PaymentStatusEnum::Pending)
                    ->where('id', $paymentId)
            )
            ->first();

        $schedule = $data->courseSchedule;
        $teacher = $schedule->teacher;
        $course = $schedule->course;
        $payment = $data->payment;

        $enrollment = [
            'payment' => [
                'status' => $payment->status,
                'snap_token' => $payment->snap_token,
                'amount' => $payment->amount,
                'enrolled_course_id' => $data->id,
                'teacher_id' => $teacher->user_id,
                'schedule_id' => $schedule->id
            ],
            'teacher' => [
                'id' => $teacher->user_id,
                'name' => $teacher->user->name
            ],
            'schedule' => [
                'id' => $schedule->id,
                'date' => Carbon::parse($schedule->start_time)->format('d M Y'),
                'start_time' => Carbon::parse($schedule->start_time)->toTimeString('minute'),
                'end_time' => Carbon::parse($schedule->end_time)->toTimeString('minute')
            ],
            'course' => [
                'name' => $course->name,
                'price' => $course->price,
                'duration' => $course->duration,
                'discount' => $course->discount,
                'final_price' => $course->price - $course->discount
            ]
        ];

        return $enrollment;
    }

    public function getPaymentList()
    {
        $user = Auth::user();
        $amounts = [
            'paid' => $this->getTotalAmount(PaymentStatusEnum::Paid),
            'pending' => $this->getTotalAmount(PaymentStatusEnum::Pending)
        ];

        $payments = Payment::with(['enrolledCourse.courseSchedule.teacher.user', 'enrolledCourse.courseSchedule.course'])
            ->where('user_id', $user->id)
            ->orderByRaw("
                CASE status
                    WHEN 'pending' THEN 3
                    WHEN 'paid' THEN 2
                    WHEN 'failed' THEN 1
                    ELSE 0
                END DESC
            ")
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(function ($item) {
                $schedule = $item->enrolledCourse->courseSchedule;
                $course = $schedule->course;
                $teacher = $schedule->teacher->user;

                return [
                    'id' => $item->id,
                    'course_name' => $course->name,
                    'teacher' => $teacher->name,
                    'schedule' => Carbon::parse($schedule->start_time)->format('d M Y') . ' '
                        . Carbon::parse($schedule->start_time)->toTimeString('minute') . ' - '
                        . Carbon::parse($schedule->end_time)->toTimeString('minute'),
                    'amount' => $item->amount,
                    'status' => $item->status
                ];
            });

        return [$payments, $amounts];
    }

    private function getTotalAmount($status)
    {
        $user = Auth::user();
        return Payment::query()
            ->where('user_id', $user->id)
            ->where('status', $status)
            ->sum('amount');
    }

    public function completePayment($data)
    {
        $signature = hash(
            'sha512',
            $data['order_id']
            . $data['status_code']
            . $data['gross_amount']
            . config('midtrans.server_key')
        );

        if ($signature !== $data['signature_key']) {
            abort(403);
        }

        return DB::transaction(function () use ($data) {
            $payment = Payment::with(['enrolledCourse'])
                ->where('unique_id', $data['order_id'])
                ->firstOrFail();

            $payment->status = match ($data['transaction_status']) {
                MidtransTransactionEnum::Settlement->value,
                MidtransTransactionEnum::Capture->value => PaymentStatusEnum::Paid,
                MidtransTransactionEnum::Pending->value => PaymentStatusEnum::Pending,
                MidtransTransactionEnum::Expire->value,
                MidtransTransactionEnum::Cancel->value,
                MidtransTransactionEnum::Deny->value => PaymentStatusEnum::Failed,
                default => PaymentStatusEnum::Failed,
            };

            if ($payment->enrolledCourse) {
                $payment->enrolledCourse()->update([
                    'is_verified' => match ($payment->status) {
                        PaymentStatusEnum::Paid => true,
                        PaymentStatusEnum::Pending => null,
                        PaymentStatusEnum::Failed => false,
                        default => null,
                    },
                ]);
            }

            $payment->save();
        });
    }
}
