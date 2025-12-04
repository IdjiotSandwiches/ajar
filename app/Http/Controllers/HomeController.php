<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\HomeService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private HomeService $service;

    public function __construct(HomeService $service)
    {
        $this->service = $service;
    }

    public function getHomeData(): Response
    {
        return Inertia::render('home', [
            'courses' => $this->service->getCoursesPreview(),
            'institutes' => $this->service->getInstituteWithBestTeacher(),
            'reviews' => $this->service->getRandomReviews()
        ]);
    }
}
