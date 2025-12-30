<?php

namespace App\Jobs;

use App\Enums\CourseStatusEnum;
use App\Models\CourseSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;

class CancelScheduleWhenNoEnrollments implements ShouldQueue
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
        CourseSchedule::with(['enrolledCourses'])
            ->where('status', CourseStatusEnum::Scheduled)
            ->whereTime('start_time', '<=', now())
            ->whereDoesntHave('enrolledCourses')
            ->update([
                'status' => CourseStatusEnum::Cancelled
            ]);
    }
}
