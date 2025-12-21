<?php

namespace App\Services;

use App\Models\TeacherApplication;
use App\Models\TeachingCourse;
use Carbon\Carbon;
use App\Enums\RoleEnum;
use App\Models\Category;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Models\EnrolledCourse;
use App\Models\Skill;
use App\Models\Teacher;
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
            ->when($user?->role_id == RoleEnum::Teacher || $user?->role_id == RoleEnum::Institute, fn($q) => $q->with('teachingCourses.teacher.user'))
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

        $courses = $filteredQuery->paginate(10)
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'institute' => $item->institute->user->name,
                'duration' => $item->duration,
                'teacher_salary' => $item->teacher_salary,
                'course_reviews_avg_rating' => $item->course_reviews_avg_rating ?? 0,
                'course_reviews_count' => $item->course_reviews_count
            ]);
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
                'teachingCourses' => fn($q) => $q->where('is_verified', true),
                'teachingCourses.teacher.user.socialMedias',
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

        $teaching = null;
        $canApply = false;
        if ($user?->role_id == RoleEnum::Teacher) {
            $canApply = TeacherApplication::query()
                ->where('teacher_id', $user->id)
                ->where('institute_id', $course->institute->user_id)
                ->where('is_verified', true)
                ->exists();

            if ($canApply) {
                $teaching = TeachingCourse::where('teacher_id', $user->id)
                    ->where('course_id', $course->id)
                    ->first();
            }
        }

        $popularCourses = $this->getPopularCourseByCategory($course->category_id, $course->id);
        return [$course, $popularCourses, $teaching, $canApply];
    }

    public function getPopularCourseByCategory($categoryId, $currentCourseId)
    {
        $count = 10;

        $user = Auth::user();
        $courses = Course::with(['institute.user', 'courseSkills.skill', 'category.parent'])
            ->when($user?->role_id == RoleEnum::Teacher || $user?->role_id == RoleEnum::Institute, fn($q) => $q->with('teachingCourses.teacher.user'))
            ->withCount('teachingCourses')
            ->withAvg('courseReviews', 'rating')
            ->where('category_id', $categoryId)
            ->whereNotIn('id', [$currentCourseId])
            ->orderByDesc('teaching_courses_count')
            ->inRandomOrder()
            ->limit(10)
            ->get();

        $coursesCount = $courses->count();
        if ($coursesCount < $count) {
            $parentCategory = Category::query()
                ->whereNotNull('parent_id')
                ->where('id', $categoryId)
                ->value('parent_id');

            $filteredCourseIds = $courses->pluck('id');
            $moreCourses = Course::with(['institute.user', 'courseSkills.skill', 'category.parent'])
                ->when($user?->role_id == RoleEnum::Teacher || $user?->role_id == RoleEnum::Institute, fn($q) => $q->with('teachingCourses.teacher.user'))
                ->withCount('teachingCourses')
                ->withAvg('courseReviews', 'rating')
                ->whereRelation('category.parent', 'id', $parentCategory)
                ->whereNotIn('id', $filteredCourseIds->merge($currentCourseId))
                ->orderByDesc('teaching_courses_count')
                ->inRandomOrder()
                ->limit($count - $coursesCount)
                ->get();

            $courses = $courses->merge($moreCourses)
                ->map(fn($item) => [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'institute' => $item->institute->user->name,
                    'duration' => $item->duration,
                    'teacher_salary' => $item->teacher_salary,
                    'price' => $item->price,
                    'course_reviews_avg_rating' => $item->course_reviews_avg_rating ?? 0,
                    'course_reviews_count' => $item->course_reviews_count
                ]);
        }

        return $courses;
    }

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
        $course = Course::find($id);
        if ($course) {
            $course->delete();
            return true;
        }

        return false;
    }

    public function getCourseTeachers($id)
    {
        $teachers = Teacher::whereHas(
            'teacherSchedules',
            fn($q) =>
            $q->where('course_id', $id)
        )
            ->with('user')
            ->paginate(5);

        return $teachers;
    }

    public function getCourseSchedules($teacherId, $courseId)
    {
        $schedules = CourseSchedule::with(['teacherSchedule'])
            ->whereHas(
                'teacherSchedule',
                fn($q) =>
                $q->where('teacher_id', $teacherId)
                    ->where('course_id', $courseId)
                    ->where('start_time', '>=', now()->addHour())
            )
            ->get();

        $result = $schedules->groupBy(
            fn($s) =>
            Carbon::parse($s->start_time)->format('Y-m-d')
        )
            ->map(
                fn($items) =>
                $items->map(fn(CourseSchedule $s) =>
                    [
                        'id' => $s->id,
                        'time' => Carbon::parse($s->teacherSchedule->start_time)->format('H:i')
                    ])->values()
            );

        return $result;
    }

    public function getCourseScheduleDetails($id)
    {
        $schedule = CourseSchedule::with(['teacherSchedule.course'])
            ->where('id', $id)
            ->first();

        $teacherSchedule = $schedule->teacherSchedule;
        $course = $teacherSchedule->course;
        $detail = [
            'title' => $course->name,
            'date_time' => $teacherSchedule->start_time,
            'duration' => Carbon::parse($teacherSchedule->start_time)
                ->diffInMinutes(Carbon::parse($teacherSchedule->end_time)),
            'discount' => $course->price * $course->discount,
            'price' => $course->price,
            'final_price' => $course->price - $course->price * $course->discount
        ];

        return $detail;
    }

    public function enrollCourse($id)
    {
        $user = Auth::user();
        $enroll = EnrolledCourse::where('course_schedule_id', $id)
            ->where('student_id', $user?->id)
            ->first();

        if ($enroll)
            return false;

        $enroll = new EnrolledCourse();
        $enroll->course_schedule_id = $id;
        $enroll->student_id = $user?->id;
        $enroll->is_complete = false;
        $enroll->save();
        return true;
    }
}
