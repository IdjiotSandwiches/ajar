<?php

namespace App\Http\Requests\Register;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'role_id' => ['required', new Enum(RoleEnum::class)],
            'step' => 'required|integer'
        ];

        $step = intval($this->input('step'));
        if ($step === 0) {
            $rules['name'] = 'required|string|max:255';
            $rules['phone_number'] = [
                'required',
                'string',
                'phone:ID',
                Rule::unique('users', 'phone_number')->ignore(session('user_id')),
            ];
        }
        else if ($step === 1) {
            $rules['email'] = 'required|string|lowercase|email|max:255|unique:'.User::class;
            $rules['password'] = ['required', 'confirmed', Password::defaults()];
        }

        return $rules;
    }
}
