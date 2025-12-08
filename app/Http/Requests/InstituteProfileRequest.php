<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InstituteProfileRequest extends FormRequest
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
            'name' => 'required|string',
            'instagram' => 'nullable|url|regex:/^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9._-]+)*$/',
            'linkedin' => 'nullable|url|regex:/^https:\/\/(www\.)?linkedin\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9._-]+)*$/',
            'github' => 'nullable|url|regex:/^https:\/\/github\.com\/[A-Za-z0-9_-]+(\/[A-Za-z0-9._-]+)*$/',
            'website' => 'nullable|url',
            'profile_picture' => 'nullable|image|max:256'
        ];
    }
}
