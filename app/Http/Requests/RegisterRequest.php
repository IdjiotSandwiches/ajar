<?php

namespace App\Http\Requests;

use App\Enums\DegreeTypeEnum;
use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Custom attribute to be shown
     *
     * @return array{certificates.*: string, graduates.*.degree_title: string, graduates.*.degree_type: string, graduates.*.university_name: string, works.*.duration: string, works.*.institution: string, works.*.position: string}
     */
    public function attributes(): array
    {
        return [
            'graduates.*.degree_title' => 'Title/Major',
            'graduates.*.university_name' => 'Institution',
            'graduates.*.degree_type' => 'Degree',
            'works.*.position' => 'Position',
            'works.*.institution' => 'Institution',
            'works.*.duration' => 'Duration',
            'certificates.*' => 'Certificate',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:users,phone_number|phone:ID',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'role_id' => ['required', new Enum(RoleEnum::class)],
        ];

        $role = RoleEnum::from($this->input('role_id'));
        if ($role === RoleEnum::Teacher) {
            $rules['description'] = 'nullable|string';

            $rules['graduates'] = 'required|array|min:1';
            $rules['graduates.*.degree_title'] = 'required|string';
            $rules['graduates.*.university_name'] = 'required|string';
            $rules['graduates.*.degree_type'] = ['required', new Enum(DegreeTypeEnum::class)];

            $rules['works'] = 'required|array|min:1';
            $rules['works.*.position'] = 'required|string';
            $rules['works.*.institution'] = 'required|string';
            $rules['works.*.duration'] = 'required|integer|min:1';

            $rules['certificates'] = 'required|array|min:1';
            $rules['certificates.*'] = 'required|file|image|max:1024';
        }

        if ($role === RoleEnum::Institute) {
            $rules['password'] = ['required', Password::defaults()];
            $rules['category'] = 'required|numeric|exists:categories,id';
        }
        else {
            $rules['password'] = ['required', 'confirmed', Password::defaults()];
        }

        return $rules;
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $errors = $validator->errors();
            $certificateErrors = collect($errors->getMessages())
                ->filter(fn($_, $key) => str_starts_with($key, 'certificates.'));

            if ($certificateErrors->isNotEmpty()) {
                foreach ($certificateErrors as $key => $_) {
                    $errors->forget($key);
                }

                $errors->add(
                    'certificates',
                    'One or more certificates are invalid. Please upload valid images (max 1024KB).'
                );
            }
        });
    }
}
