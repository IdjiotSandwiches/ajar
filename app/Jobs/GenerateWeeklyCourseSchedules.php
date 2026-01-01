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

class GenerateWeeklyCourseSchedules implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    private bool $generateNow;

    public function __construct(bool $generateNow = false)
    {
        $this->generateNow = $generateNow;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        date_default_timezone_set(config('app.timezone'));
        $tomorrow = Carbon::tomorrow();
        $rules = CourseWeeklyRule::with('teachingCourse.course')
            ->when($this->generateNow, function ($q) use ($tomorrow) {
                $tomorrowIso = $tomorrow->dayOfWeekIso;
                $allowedDays = array_filter(DayEnum::cases(), fn($d) => $d->carbonDay() + 1 >= $tomorrowIso);
                $allowedDayValues = array_map(fn($d) => $d->value, $allowedDays);
                return $q->whereIn('day', $allowedDayValues);
            })
            ->where('active', true)
            ->get();

        foreach ($rules as $rule) {
            if ($this->generateNow) {
                $ruleOffset = $rule->day->offsetFromMonday();
                $tomorrowOffset = $tomorrow->dayOfWeekIso - 1;
                $daysToAdd = $ruleOffset - $tomorrowOffset;

                if ($daysToAdd < 0) continue;
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
