<?php

namespace App\Jobs;

use App\Models\User;
use App\Notifications\RequestApproved;
use Illuminate\Bus\Queueable;
use Illuminate\Bus\Batchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnrollmentMassNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Batchable;

    /**
     * Create a new job instance.
     */
    private array $scheduleIds;
    private string $title;
    private string $message;

    public function __construct(array $scheduleIds, string $title, string $message)
    {
        $this->scheduleIds = $scheduleIds;
        $this->title = $title;
        $this->message = $message;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        User::query()
            ->whereHas('enrolledCourses', fn($q) => $q->whereIn('course_schedule_id', $this->scheduleIds))
            ->chunkById(50, function ($users) {
                foreach ($users as $user) {
                    $user->notify(
                        new RequestApproved($this->title, $this->message)
                    );
                }
            });
    }
}
