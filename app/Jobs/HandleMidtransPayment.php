<?php

namespace App\Jobs;

use App\Enums\MidtransTransactionEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Payment;
use App\Models\User;
use App\Notifications\RequestApproved;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HandleMidtransPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public function __construct(private array $data) {}

    public function handle()
    {
        $payment = Payment::with('enrolledCourse')
            ->where('unique_id', $this->data['order_id'])
            ->first();

        if (!$payment) {
            Log::warning('Payment not found', $this->data);
            return;
        }

        DB::transaction(function () use ($payment) {

            $status = $this->data['transaction_status'];

            if (
                in_array($status, [
                    MidtransTransactionEnum::Settlement->value,
                    MidtransTransactionEnum::Capture->value
                ]) &&
                now()->gt($payment->expired_at)
            ) {
                $payment->status = PaymentStatusEnum::Refund;
            } else {
                $payment->status = match ($status) {
                    MidtransTransactionEnum::Settlement->value,
                    MidtransTransactionEnum::Capture->value => PaymentStatusEnum::Paid,
                    default => PaymentStatusEnum::Failed,
                };
            }

            $payment->save();

            if ($payment->enrolledCourse) {
                $payment->enrolledCourse()->update([
                    'is_verified' => $payment->status === PaymentStatusEnum::Paid
                        ? true
                        : false,
                ]);
            }
        });

        $this->handleMidtransAction($payment);
        $this->notifyUser($payment);
    }

    private function handleMidtransAction(Payment $payment)
    {
        try {
            if ($payment->status === PaymentStatusEnum::Refund) {
                $refundId = 'RFD' . now()->timestamp . rand(100, 999);

                \Midtrans\Transaction::refund($payment->unique_id, [
                    'refund_key' => $refundId,
                    'reason' => 'Payment completed after class started',
                ]);

                $payment->update(['refund_id' => $refundId]);
                $payment->enrolledCourse()?->delete();
            }

            if ($this->data['transaction_status'] === MidtransTransactionEnum::Pending->value) {
                \Midtrans\Transaction::cancel($payment->unique_id);
            }

        } catch (\Throwable $e) {
            Log::warning('Midtrans API failed', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    private function notifyUser(Payment $payment)
    {
        $user = User::find($payment->user_id);
        if (!$user) return;

        $user->notify(new RequestApproved(
            $payment->status === PaymentStatusEnum::Paid
                ? 'Payment Success'
                : 'Payment Failed',
            sprintf('Your %s payment %s.',
                $payment->course_name,
                $payment->status === PaymentStatusEnum::Paid ? 'was successful' : 'failed'
            )
        ));
    }
}
