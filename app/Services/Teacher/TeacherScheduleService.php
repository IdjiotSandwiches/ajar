<?php

namespace App\Services\Teacher;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\TeachingCourse;
use App\Models\TeacherSchedule;
use App\Models\CourseWeeklyRule;

class TeacherScheduleService
{
    public function getSchedules()
    {
        $user = Auth::user();
        $schedules = CourseWeeklyRule::with('teachingCourse.course')
            ->where('teacher_id', $user->id)
            ->orderBy('day')
            ->orderBy('start_time')
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'day' => $s->day->value,
                'start_time' => $s->start_time->format('H:i'),
                'end_time' => $s->end_time?->format('H:i'),
                'teaching_course_id' => $s->teaching_course_id,
                'course_name' => $s->teachingCourse?->course->name
            ]);

        return $schedules;
    }

    public function getTeachingCourses()
    {
        $user = Auth::user();
        $teachings = TeachingCourse::with(['course'])
            ->where('teacher_id', $user->id)
            ->get();

        return $teachings;
    }

    public function manageSchedule($data)
    {
        $user = Auth::user();
        $teachingCourse = TeachingCourse::with('course')
            ->findOrFail($data['teaching_course_id']);

        return DB::transaction(function () use ($data, $user, $teachingCourse) {
            $courseDuration = $teachingCourse->course->duration;
            $duration = (int) ceil($courseDuration / 60) * 60;

            $start = Carbon::createFromFormat('H:i', $data['start_time']);
            $end = $start->copy()->addMinutes($duration);

            if (!$data['delete']) {
                $available = TeacherSchedule::query()
                    ->where('teacher_id', $user->id)
                    ->where('day', $data['day'])
                    ->where('start_time', '<=', $start)
                    ->where('end_time', '>=', $start)
                    ->where('active', true)
                    ->exists();

                if (!$available) {
                    throw new \Exception('Schedule not available.');
                }
            }

            CourseWeeklyRule::where('teacher_id', $user->id)
                ->where('day', $data['day'])
                ->where(function ($q) use ($start, $end) {
                    $q->where('start_time', '<', $end)
                        ->where('end_time', '>', $start);
                })
                ->delete();

            if (!$data['delete']) {
                CourseWeeklyRule::create([
                    'teacher_id' => $user->id,
                    'day' => $data['day'],
                    'start_time' => $start->format('H:i'),
                    'end_time' => $end->format('H:i'),
                    'teaching_course_id' => $teachingCourse->id,
                ]);
            }
        });
    }

    public function getAvailability()
    {
        $user = Auth::user();
        $availability = TeacherSchedule::where('teacher_id', $user->id)
            ->get();

        return $availability;
    }

    public function manageAvailability($data)
    {
        $user = Auth::user();
        foreach ($data['availability'] as $availability) {
            TeacherSchedule::updateOrCreate(
                [
                    'day' => $availability['day'],
                    'teacher_id' => $user->id
                ],
                [
                    'start_time' => $availability['start_time'],
                    'end_time' => $availability['end_time'],
                    'active' => $availability['available']
                ]
            );
        }
    }

    public function getTeachingCoursesWithSchedule($data)
    {
        $user = Auth::user();
        $teaching = TeachingCourse::with(['course.institute.user', 'courseWeeklyRules'])
            ->where('teacher_id', $user->id)
            ->when(
                !empty($data['search']),
                fn($q) => $q->whereHas('course', fn($query) => $query->where('name', 'like', "%{$data['search']}%"))
            )
            ->when(
                !empty($data['category_id']),
                fn($q) => $q->whereHas('course', function ($query) use ($data) {
                    $category = Category::where('parent_id', $data['category_id'])
                        ->pluck('id');
                    $query->whereIn('category_id', $category);
                })
            )
            ->when(
                !empty($data['time']),
                fn($q) => $q->whereHas(
                    'courseWeeklyRules',
                    fn($query) => $query->whereTime('start_time', '>=', Carbon::parse($data['time'])->format('H:i:s'))
                )
            )
            ->when(
                !empty($data['day']),
                fn($q) => $q->whereHas('courseWeeklyRules', fn($query) => $query->where('day', $data['day']))
            )
            ->paginate(10)
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->course->id,
                'name' => $item->course->name,
                'description' => $item->course->description,
                'institute' => $item->course->institute->user->name,
                'duration' => $item->course->duration,
                'teacher_salary' => $item->course->teacher_salary,
                'schedules' => $item->courseWeeklyRules->map(fn($q) => [
                    'day' => $q->day->value,
                    'start_time' => $q->start_time,
                    'end_time' => $q->end_time
                ])
            ]);

        return $teaching;
    }
}
