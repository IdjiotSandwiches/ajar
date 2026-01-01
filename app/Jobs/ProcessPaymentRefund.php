<?php

namespace App\Jobs;

use App\Models\User;
use App\Notifications\RequestApproved;
use Midtrans\Config;
use App\Models\EnrolledCourse;
use App\Enums\CourseStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\MidtransTransactionEnum;
use Illuminate\Support\Facades\DB;
use Illuminate\Bus\Queueable;
use Illuminate\Bus\Batchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcessPaymentRefund implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Batchable;

    /**
     * Create a new job instance.
     */
    private int $enrollId;

    public function __construct(int $enrollId)
    {
        $this->enrollId = $enrollId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');

        DB::transaction(function () {
            $enrollment = EnrolledCourse::query()
                ->where('id', $this->enrollId)
                ->lockForUpdate()
                ->with('courseSchedule')
                ->first();

            if (
                !$enrollment ||
                $enrollment->courseSchedule->status !== CourseStatusEnum::Cancelled
            ) {
                return;
            }

            $payment = $enrollment->payments()
                ->whereIn('status', [
                    PaymentStatusEnum::Paid,
                    PaymentStatusEnum::Pending,
                ])
                ->lockForUpdate()
                ->first();

            if (!$payment || $payment->refund_id) {
                return;
            }

            match ($payment->status) {
                PaymentStatusEnum::Paid => $this->refundPaid($payment),
                PaymentStatusEnum::Pending => $this->cancelPending($payment),
                default => null,
            };

            $enrollment->update([
                'status' => CourseStatusEnum::Cancelled,
            ]);
        });
    }

    private function refundPaid($payment): void
    {
        $refundId = 'RFD' . now(config('app.timezone'))->timestamp . random_int(100, 999);
        \Midtrans\Transaction::refund(
            $payment->unique_id,
            [
                'refund_key' => $refundId,
                'reason' => 'Class cancellation',
            ]
        );

        $payment->update([
            'status' => PaymentStatusEnum::Refund,
            'refund_id' => $refundId,
        ]);

        User::findOrFail($payment->user_id)->notify(new RequestApproved(
            'Payment Refunded',
            \sprintf('Your %s payment has been refunded.', $payment->course_name)
        ));
    }

    private function cancelPending($payment): void
    {
        try {
            $response = \Midtrans\Transaction::status($payment->unique_id);
            $transactionStatus = \is_array($response) ? ($response['transaction_status'] ?? null) : ($response->transaction_status ?? null);
            if ($transactionStatus === MidtransTransactionEnum::Pending) {
                \Midtrans\Transaction::cancel($payment->unique_id);
            }
        } catch (\Exception $e) {
            logger()->warning('Midtrans status/cancel failed', [
                'order_id' => $payment->unique_id
            ]);
        }

        $payment->update([
            'status' => PaymentStatusEnum::Failed,
        ]);

        User::findOrFail($payment->user_id)->notify(new RequestApproved(
            'Payment Cancelled',
            \sprintf('Your %s payment was cancelled due to exceeding the payment time limit.', $payment->course_name)
        ));
    }
}
