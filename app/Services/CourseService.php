<?php

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\Category;
use App\Models\Course;
use App\Models\Skill;
use App\Utilities\UploadUtility;
use Illuminate\Support\Facades\Auth;

class CourseService
{
    public function getParentCategories()
    {
        $categories = Category::with('parent')
            ->whereNull('parent_id')
            ->select(['id', 'name'])
            ->get();

        return $categories;
    }

    public function getCourses($filters)
    {
        $user = Auth::user();
        $categories = Category::with('children')
            ->when(isset($filters['category_id']), function ($q) use ($filters) {
                $q->where('parent_id', $filters['category_id']);
            })
            ->select(['id', 'name'])
            ->get();

        if (!$categories) {
            return collect();
        }

        $categoryIds = $categories->pluck('id');
        $baseQuery = Course::query()
            ->when($user?->role_id == RoleEnum::Teacher || $user?->role_id == RoleEnum::Institute, fn($q) => $q->with('teachers.user'))
            ->when($filters['search'] ?? null, fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->with(['institute.user'])
            ->withAvg('courseReviews', 'rating')
            ->withCount('courseReviews');

        switch ($user?->role_id) {
            case RoleEnum::Teacher:
            case RoleEnum::Institute:
                $baseQuery->when(!empty($filters['sub']), function ($q) use ($filters, $categories) {
                    $subIds = $categories->whereIn('id', $filters['sub'])->pluck('id');
                    $q->whereIn('category_id', $subIds);
                });

                $baseQuery->when(empty($filters['sub']), function ($q) use ($categoryIds) {
                    $q->whereIn('category_id', $categoryIds);
                });
                break;
            default:
                $baseQuery->whereIn('category_id', $categoryIds);
                break;
        }

        $minPrice = (clone $baseQuery)->min('price');
        $maxPrice = (clone $baseQuery)->max('price');

        $filteredQuery = (clone $baseQuery);
        switch ($user?->role_id) {
            case RoleEnum::Teacher:
            case RoleEnum::Institute:
                break;
            default:
                $filteredQuery->when(!empty($filters['rating']), function ($q) use ($filters) {
                    $ratings = (array) $filters['rating'];

                    $includesUnrated = \in_array(0, $ratings);
                    $numericRatings = array_filter($ratings, fn($r) => $r > 0);

                    $q->having(function ($subQuery) use ($numericRatings, $includesUnrated) {
                        $hasNumericCondition = false;

                        if (!empty($numericRatings)) {
                            $hasNumericCondition = true;
                            foreach ($numericRatings as $index => $rating) {
                                $min = max($rating - 0.5, 1);
                                $max = min($rating + 0.49, 5);

                                if ($index === 0) {
                                    $subQuery->havingBetween('course_reviews_avg_rating', [$min, $max]);
                                } else {
                                    $subQuery->orHavingRaw(
                                        'course_reviews_avg_rating BETWEEN ? AND ?',
                                        [$min, $max]
                                    );
                                }
                            }
                        }

                        if ($includesUnrated) {
                            if ($hasNumericCondition) {
                                $subQuery->orHavingNull('course_reviews_avg_rating');
                            } else {
                                $subQuery->havingNull('course_reviews_avg_rating');
                            }
                        }
                    });
                });

                $filteredQuery->when(!empty($filters['price_min']), function ($q) use ($filters) {
                    $q->where('price', '>=', $filters['price_min']);
                });

                $filteredQuery->when(!empty($filters['price_max']), function ($q) use ($filters) {
                    $q->where('price', '<=', $filters['price_max']);
                });
                break;
        }

        $courses = $filteredQuery->paginate(10);
        return [$courses, $categories, $minPrice, $maxPrice];
    }

    public function getCourseDetail($id)
    {
        $user = Auth::user();
        $query = Course::with(
            [
                'institute.user',
                'courseReviews.reviewer',
                'courseSkills.skill',
                'courseLearningObjectives',
                'courseOverviews',
                'courseSchedules',
                'teachers.user'
            ]
        )
            ->withAvg('courseReviews', 'rating')
            ->withCount('courseReviews');

        $course = $query->find($id);
        if (\in_array($user?->role_id, [RoleEnum::Teacher, RoleEnum::Institute])) {
            $course->setRelation('benefits', $course->courseTeacherBenefits);
        } else {
            $course->setRelation('benefits', $course->courseStudentBenefits);
        }

        $popularCourses = $this->getPopularCourseByCategory($course->category_id, $course->id);
        return [$course, $popularCourses];
    }

    public function getPopularCourseByCategory($categoryId, $currentCourseId)
    {
        $count = 10;

        $user = Auth::user();
        $courses = Course::with(['institute.user', 'courseSkills.skill', 'category.parent'])
            ->when($user?->role_id == RoleEnum::Teacher || $user?->role_id == RoleEnum::Institute, fn($q) => $q->with('teachers.user'))
            ->withCount('courseSchedules')
            ->withAvg('courseReviews', 'rating')
            ->where('category_id', $categoryId)
            ->whereNotIn('id', [$currentCourseId])
            ->orderByDesc('course_schedules_count')
            ->inRandomOrder()
            ->limit(10)
            ->get();

        $coursesCount = $courses->count();
        if ($coursesCount < $count) {
            $parentCategory = Category::whereNotNull('parent_id')
                ->where('id', $categoryId)
                ->value('parent_id');

            $filteredCourseIds = $courses->pluck('id');
            $moreCourses = Course::with(['institute.user', 'courseSkills.skill', 'category.parent'])
                ->when($user?->role_id == RoleEnum::Teacher || $user?->role_id == RoleEnum::Institute, fn($q) => $q->with('teachers.user'))
                ->withCount('courseSchedules')
                ->withAvg('courseReviews', 'rating')
                ->whereRelation('category.parent', 'id', $parentCategory)
                ->whereNotIn('id', $filteredCourseIds->merge($currentCourseId))
                ->orderByDesc('course_schedules_count')
                ->inRandomOrder()
                ->limit($count - $coursesCount)
                ->get();

            $courses = $courses->merge($moreCourses);
        }

        return $courses;
    }

    public function getCourseByInstitution()
    {
        $user = Auth::user();
        if (!$user)
            return null;

        $courses = Course::where('institute_id', $user->id)
            ->paginate(10);

        return $courses;
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
        $course = Course::find($id);
        if ($course) {
            $course->delete();
            return true;
        }

        return false;
    }
}
