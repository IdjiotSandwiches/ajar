<?php

namespace App\Http\Requests;

use App\Enums\MidtransFraudEnum;
use App\Enums\MidtransTransactionEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class MidtransWebhookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'transaction_status' => ['required', new Enum(MidtransTransactionEnum::class)],
            'fraud_status' => ['required', new Enum(MidtransFraudEnum::class)],
            'status_code' => 'required',
            'order_id' => 'required',
            'gross_amount' => 'required',
            'signature_key' => 'required',
        ];
    }
}
