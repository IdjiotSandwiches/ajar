<?php

use App\Jobs\GenerateWeeklyCourseSchedules;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new GenerateWeeklyCourseSchedules())
    ->weeklyOn(0, '23:00');
