<?php

namespace App\Services\Institute;

use App\Models\Skill;
use App\Models\Course;
use App\Models\Category;
use App\Utilities\UploadUtility;
use Illuminate\Support\Facades\Auth;

class InstituteCourseService
{
    public function getCourseByInstitution($filters)
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $user = $user->load('institute');
        $categories = Category::where('parent_id', $user->institute->category_id)
            ->get();
        $courses = Course::where('institute_id', $user->id)
            ->when(!empty($filters['search']), fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(!empty($filters['price_min']), fn($q) => $q->where('price', '>=', $filters['price_min']))
            ->when(!empty($filters['price_max']), fn($q) => $q->where('price', '>=', $filters['price_max']))
            ->paginate(10);

        return [$categories, $courses];
    }

    public function getCourseById($id)
    {
        $course = Course::with(['courseSkills.skill', 'courseLearningObjectives', 'courseStudentBenefits', 'courseTeacherBenefits', 'courseOverviews'])
            ->where('id', $id)
            ->first();

        return $course;
    }

    public function getCourseSkillByCategory()
    {
        $user = Auth::user();
        $user = $user->load('institute');
        $skills = Skill::where('category_id', $user->institute->category_id)
            ->get();

        return $skills;
    }

    public function getCategories()
    {
        $user = Auth::user();
        $user = $user->load('institute');

        $categories = Category::with('children')
            ->where('parent_id', $user->institute->category_id)
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public function createOrUpdateCourses(array $data, $id = null)
    {
        $user = Auth::user();
        $user = $user->load('institute');

        $course = Course::firstOrNew(['id' => $id]);
        $course->institute_id = $user->institute->user_id;
        $course->fill([
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'duration' => $data['duration'],
            'discount' => $data['discount'],
            'teacher_salary' => $data['teacher_salary'],
            'category_id' => $data['category']
        ]);

        if (!empty($data['course_images'])) {
            if ($course?->image) {
                UploadUtility::remove($course->image);
            }

            $url = UploadUtility::upload($data['course_images'], 'course_images');
            $course->image = $url;
        }

        $course->save();
        $relations = [
            'learning_objectives' => 'courseLearningObjectives',
            'benefit_for_students' => 'courseStudentBenefits',
            'benefit_for_teachers' => 'courseTeacherBenefits',
            'course_overviews' => 'courseOverviews',
            'course_skills' => 'courseSkills',
            'course_sessions' => 'courseSessions'
        ];

        foreach ($relations as $key => $relationMethod) {
            if (isset($data[$key]) && \is_array($data[$key])) {
                if ($key === 'course_skills') {
                    $course->courseSkills()->delete();
                    $skills = array_map(fn($s) => ['skill_id' => $s['id']], $data[$key]);
                    $course->courseSkills()->createMany($skills);
                    continue;
                }

                $ids = [];
                foreach ($data[$key] as $item) {
                    $model = $course->$relationMethod()->updateOrCreate(
                        ['id' => $item['id'] ?? null],
                        ['description' => $item['description']]
                    );
                    $ids[] = $model->id;
                }

                $course->$relationMethod()->whereNotIn('id', $ids)->delete();
            }
        }
    }

    public function deleteCourse($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
    }
}
