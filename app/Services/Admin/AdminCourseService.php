<?php

namespace App\Services\Admin;

use Carbon\Carbon;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Enums\CourseStatusEnum;
use Illuminate\Support\Facades\DB;

class AdminCourseService
{
    public function getCompletedCourses($filters)
    {
        $schedules = CourseSchedule::with(['teacher.user', 'course'])
            ->where('status', CourseStatusEnum::Completed)
            ->whereNull('is_verified')
            ->whereNotNull('recording_link')
            ->whereHas(
                'course',
                fn($query) => $query->when(
                    !empty($filters['search']),
                    fn($q) => $q->where('name', 'like', "%{$filters['search']}%")
                )
                    ->when(
                        !empty($filters['category_id']),
                        fn($q) => $q->where('category_id', $filters['category_id'])
                    )
            )
            ->when(!empty($filters['time']), fn($q) => $q->whereTime('start_time', '>=', Carbon::parse($filters['time'])->format('H:i:s')))
            ->when(!empty($filters['date']), fn($q) => $q->whereDate('start_time', $filters['date']))
            ->paginate(10)
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->course->name,
                'teacher_name' => $item->teacher->user->name,
                'duration' => $item->course->duration,
                'start_time' => $item->start_time->format('d M Y H:i'),
                'end_time' => $item->end_time->format('d M Y H:i'),
                'recording_link' => $item->recording_link,
                'image' => $item->course->image
            ]);

        return $schedules;
    }

    public function completeCourse($id)
    {
        return DB::transaction(function () use ($id) {
            $schedule = CourseSchedule::with(['course'])
                ->findOrFail($id);
            $schedule->is_verified = true;

            $teacherAmount = $schedule->course->teacher_salary;
            $instituteAmount = $schedule->course->price - $teacherAmount;
            $schedule->disbursements()->createMany([
                [
                    'course_schedule_id' => $schedule->id,
                    'user_id' => $schedule->teacher_id,
                    'unique_id' => 'TCR_PAY' . time() . random_int(100, 999),
                    'amount' => $teacherAmount
                ],
                [
                    'course_schedule_id' => $schedule->id,
                    'user_id' => $schedule->course->institute_id,
                    'unique_id' => 'INS_PAY' . time() . random_int(100, 999),
                    'amount' => $instituteAmount
                ]
            ]);
            $schedule->save();
        });
    }

    public function getAllCourses($filters)
    {
        $courses = Course::with(['institute.user'])
            ->when(!empty($filters['search']), fn($q) => $q->where('name', 'like', "%{$filters['search']}%"))
            ->when(!empty($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(!empty($filters['search_secondary']), fn($query) => $query->whereHas(
                'institute.user',
                fn($q) => $q->where('name', 'like', "%{$filters['search_secondary']}%")
            ))
            ->paginate(10)
            ->withQueryString()
            ->through(fn($item) => [
                'id' => $item->id,
                'name' => $item->name,
                'institute_name' => $item->institute->user->name,
                'image' => $item->image
            ]);

        return $courses;
    }

    public function removeCourse($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
    }
}
