<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private DashboardService $service;

    public function __construct(DashboardService $service)
    {
        $this->service = $service;
    }

    public function getDashboardData()
    {
        $todayCourses = $this->service->getTodayCourses();
        $upcomingCourses = $this->service->getUpcomingCourses();
        return Inertia::render('dashboard', [
            'today' => Inertia::scroll($todayCourses),
            'upcoming' => Inertia::scroll($upcomingCourses)
        ]);
    }
}
