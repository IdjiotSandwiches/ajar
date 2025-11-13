<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FilterRequest extends FormRequest
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
        $user = $this->user();

        $rules = collect([
            'category_id' => 'nullable|integer|exists:categories,id',
            'search' => 'nullable|string',
        ]);

        if ($user->role_id === RoleEnum::Student) {
            $rules = $rules->merge([
                'rating' => 'nullable|array',
                'rating.*' => 'numeric|min:1|max:5',
                'price_min' => 'nullable|numeric|min:0',
                'price_max' => 'nullable|numeric|min:0',
            ]);
        } else {
            $rules = $rules->merge([
                'sub' => 'nullable|array',
                // 'sub.*' => [
                //     'numeric',
                //     Rule::exists('categories', 'id')->whereNotNull('parent_id'),
                // ]
                'sub.*' => 'numeric'
            ]);
        }

        return $rules->toArray();
    }
}
