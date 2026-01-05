<?php

namespace App\Http\Requests;

use App\Enums\DegreeTypeEnum;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

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
        $files = $this->file('certificates');
        $this->merge([
            'certificates' => \is_array($files) ? $files : ($files ? [$files] : []),
            'deleted_certificates' => $this->deleted_certificates ?? [],
        ]);
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

            $teacher = auth()->user()->teacher;

            $existing = $teacher->certificates()->count();
            $deleted = \count($this->deleted_certificates ?? []);
            $new = \count($this->certificates ?? []);

            if (($existing - $deleted + $new) <= 0) {
                $errors->add(
                    'certificates',
                    'At least one certificate is required.'
                );
            }
        });
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
        return [
            'description' => 'required|string',
            'graduates' => 'required|array|min:1',
            'graduates.*.degree_title' => 'required|string',
            'graduates.*.university_name' => 'required|string',
            'graduates.*.degree_type' => ['required', new Enum(DegreeTypeEnum::class)],
            'works' => 'required|array|min:1',
            'works.*.position' => 'required|string',
            'works.*.institution' => 'required|string',
            'works.*.duration' => 'required|integer|min:1',
            'certificates' => 'array',
            'certificates.*' => 'image|max:1024',
            'deleted_certificates' => 'nullable|array',
            'deleted_certificates.*' => 'string',
        ];
    }
}
