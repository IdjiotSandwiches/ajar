<?php

namespace App\Services\Institute;

use Carbon\Carbon;
use App\Models\Skill;
use App\Models\Course;
use App\Models\Category;
use App\Models\CourseSchedule;
use App\Utilities\UploadUtility;
use App\Enums\CourseStatusEnum;
use App\Services\PaymentService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Auth;

class InstituteCourseService
{
    private PaymentService $service;

    public function __construct(PaymentService $service)
    {
        $this->service = $service;
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
            ->when(!empty($filters['duration']), fn($q) => $q->where('duration', $filters['duration']))
            ->when(!empty($filters['sort_by']), fn($q) => $q->orderBy('price', $filters['sort_by'] ? 'desc' : 'asc'))
            ->paginate(10)
            ->withQueryString();

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

    public function createOrUpdateCourses($data, $id = null)
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
        $scheduleIds = [];
        DB::transaction(function () use ($id, &$scheduleIds) {
            $scheduleIds = CourseSchedule::where('course_id', $id)
                ->pluck('id')
                ->toArray();

            CourseSchedule::query()
                ->whereIn('id', $scheduleIds)
                ->update([
                    'status' => CourseStatusEnum::Cancelled
                ]);
        });

        $jobs = $this->service->handleRefund($scheduleIds);
        if (!empty($jobs)) {
            Bus::batch($jobs)
                ->then(fn($batch) => $course->delete())
                ->name('Handle course refunds (Course Removal)')
                ->dispatch();
        } else {
            $course->delete();
        }
    }

    public function getOngoingCourses($filters)
    {
        $user = Auth::user();
        $courses = CourseSchedule::with(['course', 'teacher.user'])
            ->whereHas('course', fn($q) => $q->where('institute_id', $user->id)
                ->when(!empty($filters['search']), fn($query) => $query->where('name', $filters['search'])))
            ->when(!empty($filters['status']), fn($q) => $q->where('status', $filters['status']))
            ->when(!empty($filters['time']), fn($q) => $q->whereTime('start_time', '>=', Carbon::parse($filters['time'])->format('H:i:s')))
            ->when(!empty($filters['date']), fn($q) => $q->whereDate('start_time', $filters['date']))
            ->orderByRaw("
                CASE status
                    WHEN 'scheduled' THEN 3
                    WHEN 'cancelled' THEN 2
                    WHEN 'completed' THEN 1
                    ELSE 0
                END DESC
            ")
            ->orderBy('start_time')
            ->paginate(10)
            ->through(fn($item) => [
                'name' => $item->course->name,
                'teacher_name' => $item->teacher->user->name,
                'duration' => $item->course->duration,
                'start_time' => $item->start_time->format('d M Y H:i'),
                'end_time' => $item->end_time->format('d M Y H:i'),
                'recording_link' => $item->recording_link,
                'image' => $item->course->image,
                'status' => $item->status === CourseStatusEnum::Scheduled && now()->greaterThan($item->start_time) ? 'ongoing' : $item->status
            ]);

        return $courses;
    }
}
