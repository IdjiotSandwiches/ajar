<?php

namespace App\Jobs;

use App\Models\CourseSchedule;
use App\Models\CourseWeeklyRule;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateWeeklyCourseSchedules implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $rules = CourseWeeklyRule::with('teachingCourse.course')
            ->where('active', true)
            ->get();

        foreach ($rules as $rule) {
            $weekStart = Carbon::now()
                ->startOfWeek()
                ->addWeek();

            $date = $weekStart->copy()
                ->addDays($rule->day->offsetFromMonday());

            $start = $date->copy()->setTime($rule->start_time->hour, $rule->start_time->minute);
            $end = $start->copy()->addMinutes($rule->teachingCourse->course->duration);

            $exists = CourseSchedule::query()
                ->where([
                    'start_time' => $start,
                    'end_time' => $end,
                    'course_id' => $rule->teachingCourse->course_id,
                    'teacher_id' => $rule->teachingCourse->teacher_id,
                ])->exists();

            if ($exists)
                continue;

            CourseSchedule::create([
                'start_time' => $start,
                'end_time' => $end,
                'course_id' => $rule->teachingCourse->course_id,
                'teacher_id' => $rule->teachingCourse->teacher_id,
            ]);
        }
    }
}
