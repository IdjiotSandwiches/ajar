<?php

namespace App\Http\Requests;

use App\Models\Course;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'course_sessions.*.description' => 'Course Sessions',
            'course_skills.*.id' => 'Course Skills',
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
        $course = Course::find($this->route('id'));
        $hasImage = !empty($course?->image);
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0|max:100',
            'teacher_salary' => 'required|numeric|min:0',
            'category' => 'required|numeric|exists:categories,id',
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
            // 'course_sessions' => 'required|array',
            // 'course_sessions.*.id' => 'numeric',
            // 'course_sessions.*.description' => 'required|string',
            'course_skills' => 'required|array',
            'course_skills.*.id' => 'required|numeric|exists:skills,id',
            'course_images' => [Rule::requiredIf(!$hasImage), 'image', 'max:1024']
        ];
    }
}
