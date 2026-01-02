<?php

namespace App\Jobs;

use App\Enums\DayEnum;
use Carbon\Carbon;
use App\Models\CourseSchedule;
use App\Models\CourseWeeklyRule;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class GenerateWeeklyCourseSchedules implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    private bool $generateNow;
    private $id;

    public function __construct(bool $generateNow = false, $id = null)
    {
        $this->generateNow = $generateNow;
        $this->id = $id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        date_default_timezone_set(config('app.timezone'));
        $rules = CourseWeeklyRule::with('teachingCourse.course')
            ->when($this->generateNow, fn($q) => $q->where('teacher_id', $this->id))
            ->where('active', true)
            ->get();

        foreach ($rules as $rule) {
            if (!$rule->teachingCourse || !$rule->teachingCourse->course) {
                continue;
            }

            if ($this->generateNow) {
                $tomorrow = Carbon::tomorrow();
                $tomorrowIso = $tomorrow->dayOfWeekIso;
                $ruleIso = $rule->day->isoDay();

                if ($ruleIso < $tomorrowIso) {
                    continue;
                }

                $daysToAdd = $ruleIso - $tomorrowIso;
                $date = $tomorrow->copy()->addDays($daysToAdd);
            } else {
                $weekStart = Carbon::now()
                    ->startOfWeek()
                    ->addWeek();

                $date = $weekStart->copy()
                    ->addDays($rule->day->offsetFromMonday());
            }

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
