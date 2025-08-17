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
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:users,phone_number|phone:ID',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
            'role_id' => ['required', new Enum(RoleEnum::class)],
        ];

        if ($this->input('role_id') == RoleEnum::Teacher) {
            $rules['category_id'] = 'required|exists:categories,id';
            $rules['description'] = 'string';

            $rules['graduates'] = 'required|array|min:1';
            $rules['graduates.*.degree_title'] = 'required|string';
            $rules['graduates.*.university_name'] = 'required|string';
            $rules['graduates.*.degree_type_id'] = ['required', new Enum(DegreeTypeEnum::class)];

            $rules['works'] = 'required|array|min:1';
            $rules['works.*.position'] = 'required|string';
            $rules['works.*.institution'] = 'required|string';
            $rules['works.*.duration'] = 'required|int';

            $rules['certificates'] ='required|array|min:1';
            $rules['certificates.*.image'] = 'file|image|mimes:jpeg,png,jpg|max:2048';
        }

        return $rules;
    }
}
