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

        $rules = $rules->merge(
            $user?->role_id === RoleEnum::Student || $user == null
            ? [
                'rating' => 'nullable|array',
                'rating.*' => 'numeric|min:1|max:5',
                'price_min' => 'nullable|numeric|min:0',
                'price_max' => 'nullable|numeric|min:0',
            ]
            : [
                'sub' => 'nullable|array',
                'sub.*' => [
                    'numeric',
                    Rule::exists('categories', 'id')->whereNotNull('parent_id'),
                ],
            ]
        );

        return $rules->toArray();
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated();

        if ($this->user()?->role_id === RoleEnum::Student) {
            unset($data['sub']);
        }

        return $data;
    }
}
