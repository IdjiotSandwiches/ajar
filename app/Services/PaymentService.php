<?php

namespace App\Services;

use Carbon\Carbon;
use Midtrans\Snap;
use Midtrans\Config;
use App\Enums\RoleEnum;
use App\Enums\CourseStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\MidtransTransactionEnum;
use App\Models\User;
use App\Models\Course;
use App\Models\Earning;
use App\Models\Payment;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use App\Models\TeachingCourse;
use App\Jobs\ProcessPaymentRefund;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Notifications\RequestApproved;

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
        $buffer = 30;
        $schedules = CourseSchedule::query()
            ->where('course_id', $courseId)
            ->where('teacher_id', $teacherId)
            ->where('status', CourseStatusEnum::Scheduled)
            ->where('start_time', '>', now())
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
            ->orderBy('start_time')
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'date' => Carbon::parse($item->start_time)->format('d M Y'),
                'start_time' => Carbon::parse($item->start_time)->toTimeString('minute'),
                'end_time' => Carbon::parse($item->end_time)->toTimeString('minute')
            ]);

        return $schedules;
    }

    public function payment($scheduleId, $bypass)
    {
        $user = Auth::user();
        $existingEnrollment = EnrolledCourse::where('course_schedule_id', $scheduleId)
            ->where('student_id', $user->id)
            ->whereHas('activePayment')
            ->with('activePayment')
            ->first();

        if ($existingEnrollment && $existingEnrollment->activePayment->snap_token) {
            return [$existingEnrollment->activePayment->unique_id, $existingEnrollment->activePayment->snap_token];
        }

        $snapToken = "";
        DB::transaction(function () use ($scheduleId, $user, $bypass, &$snapToken) {
            $enrolled = EnrolledCourse::createOrFirst([
                'course_schedule_id' => $scheduleId,
                'student_id' => $user->id
            ]);

            $enrolled->status = CourseStatusEnum::Scheduled;
            $enrolled->save();

            $schedule = CourseSchedule::with(['course.category', 'teacher.user'])
                ->where('id', $scheduleId)
                ->first();

            $payment = Payment::create([
                'unique_id' => 'ENRL' . time() . random_int(100, 999),
                'enrolled_course_id' => $enrolled->id,
                'amount' => $schedule->course->price - $schedule->course->discount,
                'user_id' => $user->id,
                'course_name' => $schedule->course->name,
                'teacher_name' => $schedule->teacher->user->name,
                'schedule' => Carbon::parse($schedule->start_time)->format('d M Y') . ' '
                    . Carbon::parse($schedule->start_time)->toTimeString('minute') . ' - '
                    . Carbon::parse($schedule->end_time)->toTimeString('minute'),
                'expired_at' => $schedule->start_time->subMinutes(10)
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
                ],
                "page_expiry" => [
                    "duration" => 10,
                    "unit" => "minutes"
                ]
            ];


            if (!$bypass) {
                $snapToken = Snap::getSnapToken($params);
                $payment->snap_token = $snapToken;
            } else {
                $this->completePayment([
                    'order_id' => $payment->unique_id,
                    'status_code' => 200,
                    'gross_amount' => $payment->amount,
                    'transaction_status' => MidtransTransactionEnum::Settlement->value,
                    'signature_key' => hash(
                        'sha512',
                        $payment->unique_id
                        . 200
                        . $payment->amount
                        . config('midtrans.server_key')
                    )
                ]);
            }

            $payment->save();
        });

        return $snapToken;
    }

    public function getPendingEnrollment($paymentId)
    {
        $user = Auth::user();
        $data = EnrolledCourse::with(['courseSchedule.teacher.user', 'courseSchedule.course', 'activePayment'])
            ->where('student_id', $user->id)
            ->whereHas('activePayment', fn($q) => $q->where('id', $paymentId))
            ->first();

        if (!$data) {
            return null;
        }

        $schedule = $data->courseSchedule;
        $teacher = $schedule->teacher;
        $course = $schedule->course;
        $payment = $data->activePayment;

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
        [$payments, $amounts] = match ($user->role_id) {
            RoleEnum::Student => $this->getStudentPayments($user->id),
            RoleEnum::Teacher, RoleEnum::Institute => $this->getEarnings($user)
        };

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

        $payment = null;
        DB::transaction(function () use ($data, &$payment) {
            $payment = Payment::with(['enrolledCourse'])
                ->where('unique_id', $data['order_id'])
                ->firstOrFail();

            if (
                ($data['transaction_status'] === MidtransTransactionEnum::Settlement->value ||
                    $data['transaction_status'] === MidtransTransactionEnum::Capture->value) && now()->gt($payment->expired_at)
            ) {
                $refundId = 'RFD' . time() . random_int(100, 999);
                \Midtrans\Transaction::refund($payment->unique_id, [
                    'refund_key' => $refundId,
                    'reason' => 'Payment completed after class started'
                ]);

                $payment->status = PaymentStatusEnum::Refund;
                $payment->refund_id = $refundId;
                $payment->enrolledCourse()->delete();
            } else {
                if ($data['transaction_status'] === MidtransTransactionEnum::Pending->value) {
                    \Midtrans\Transaction::cancel($payment->unique_id);
                }

                $payment->status = match ($data['transaction_status']) {
                    MidtransTransactionEnum::Settlement->value,
                    MidtransTransactionEnum::Capture->value => PaymentStatusEnum::Paid,
                    MidtransTransactionEnum::Pending->value,
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
            }

            $payment->save();
        });

        $user = User::findOrFail($payment->user_id);
        if ($payment) {
            $user->notify(new RequestApproved(
                'Payment Success',
                \sprintf('Your %s payment has success.', $payment->course_name)
            ));
        } else {
            $user->notify(new RequestApproved(
                'Payment Failed',
                \sprintf('Your %s payment has failed.', $payment->course_name)
            ));
        }
    }

    public function handleRefund($ids)
    {
        $jobs = [];
        EnrolledCourse::with(['activePayment'])
            ->whereIn('course_schedule_id', $ids)
            ->whereHas('activePayment')
            ->chunkById(50, function ($enrollments) use (&$jobs) {
                foreach ($enrollments as $enrollment) {
                    $jobs[] = new ProcessPaymentRefund($enrollment->id);
                }
            });

        return $jobs;
    }

    private function getStudentPayments($userId)
    {
        $amounts = [
            'paid' => $this->getTotalAmount(PaymentStatusEnum::Paid),
            'pending' => $this->getTotalAmount(PaymentStatusEnum::Pending)
        ];

        $payments = Payment::query()
            ->where('user_id', $userId)
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
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->id,
                'course_name' => $item->course_name,
                'related_user' => $item->teacher_name,
                'schedule' => $item->schedule,
                'amount' => $item->amount,
                'status' => $item->status
            ]);

        return [$payments, $amounts];
    }

    private function getEarnings($user)
    {
        $amounts = [
            'pending' => Earning::query()
                ->where('user_id', $user->id)
                ->where('status', PaymentStatusEnum::Pending)
                ->sum('amount'),
            'paid' => Earning::query()
                ->where('user_id', $user->id)
                ->where('status', PaymentStatusEnum::Paid)
                ->sum('amount')
        ];

        $earnings = Earning::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->paginate(10);

        return [$earnings, $amounts];
    }
}
