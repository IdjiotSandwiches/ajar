<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherProfileRequest extends FormRequest
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
        $userId = $this->user()->id;
        return [
            'name' => 'required|string',
            'phone_number' => 'required|string|phone:ID|unique:users,phone_number,' . $userId,
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $userId,
            'instagram' => 'nullable|url|regex:/^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/',
            'linkedin' => 'nullable|url|regex:/^https:\/\/(www\.)?linkedin\.com\/[A-Za-z0-9._-]+\/?$/',
            'github' => 'nullable|url|regex:/^https:\/\/github\.com\/[A-Za-z0-9._-]+\/?$/'
        ];
    }
}
