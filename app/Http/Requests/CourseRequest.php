<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function attributes(): array
    {
        return [
            'learning_objectives.*.description' => 'Learning Objectives',
            'benefit_for_students.*.description' => 'Benefit for Students',
            'benefit_for_teachers.*.description' => 'Benefit for Teachers',
            'course_overviews.*.description' => 'Course Overviews',
            'course_skills.*.description' => 'Course Skills',
            'course_images.*' => 'Course Images'
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'teacher_salary' => 'required|numeric|min:0',
            'learning_objectives' => 'required|array',
            'learning_objectives.*.id' => 'numeric',
            'learning_objectives.*.description' => 'required|string',
            'benefit_for_students' => 'required|array',
            'benefit_for_students.*.id' => 'numeric',
            'benefit_for_students.*.description' => 'required|string',
            'benefit_for_teachers' => 'required|array',
            'benefit_for_teachers.*.id' => 'numeric',
            'benefit_for_teachers.*.description' => 'required|string',
            'course_overviews' => 'required|array',
            'course_overviews.*.id' => 'numeric',
            'course_overviews.*.description' => 'required|string',
            'course_skills' => 'required|array',
            'course_skills.*.id' => 'numeric',
            'course_skills.*.description' => 'required|string',
            'course_images' => 'required|array',
            'course_images.*' => 'required|image|max:2048'
        ];
    }
}
