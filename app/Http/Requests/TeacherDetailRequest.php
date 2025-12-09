<?php

namespace App\Http\Requests;

use App\Enums\DegreeTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class TeacherDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     * This filters out existing string URLs so validation only runs on new files.
     */
    protected function prepareForValidation(): void
    {
        $certificates = collect($this->get('certificates'))
            ->filter(fn($certificate) => !\is_string($certificate))
            ->all();

        $this->merge([
            'certificates' => $certificates,
            'deleted_certificates' => $this->get('deleted_certificates', []),
        ]);
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
        // dd($this->all());
        return [
            'description' => 'required|string',
            'graduates' => 'required|array|min:1',
            'graduates.*.degree_title' => 'required|string',
            'graduates.*.university_name' => 'required|string',
            'graduates.*.degree_type' => ['required', new Enum(DegreeTypeEnum::class)],
            'works' => 'required|array|min:1',
            'works.*.position' => 'required|string',
            'works.*.institution' => 'required|string',
            'works.*.duration' => 'required|int|min:1',
            'certificates' => 'nullable|array',
            'certificates.*' => 'file|image|mimes:jpeg,png,jpg|max:256',
            'deleted_certificates' => 'nullable|array',
            'deleted_certificates.*' => 'string',
        ];
    }
}
