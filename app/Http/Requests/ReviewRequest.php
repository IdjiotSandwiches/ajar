<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            'teacher_rating' => 'required|integer',
            'teacher_review' => 'required|string',
            'institute_rating' => 'required|integer',
            'institute_review' => 'required|string',
            'course_rating' => 'required|integer',
            'course_review' => 'required|string',
        ];
    }
}
