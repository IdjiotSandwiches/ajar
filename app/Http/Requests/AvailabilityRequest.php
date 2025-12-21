<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AvailabilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function attributes(): array
    {
        return [
            'availability.*.day' => 'Day',
            'availability.*.start_time' => 'Start Time',
            'availability.*.end_time' => 'End Time',
            'availability.*.available' => 'Available',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'availability' => 'required|array',
            'availability.*.day' => 'nullable|string',
            'availability.*.start_time' => 'nullable|date_format:H:i',
            'availability.*.end_time' => 'nullable|date_format:H:i',
            'availability.*.available' => 'required|boolean'
        ];
    }
}
