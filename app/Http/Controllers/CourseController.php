<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Services\CourseService;
use Inertia\Inertia;

class CourseController extends Controller
{
    private CourseService $service;

    public function __construct(CourseService $service)
    {
        $this->service = $service;
    }

    public function getCourseList(FilterRequest $request)
    {
        $filters = $request->validated();
        $filters['category_id'] ??= 1;

        $parentCategories = $this->service->getParentCategories();
        [$courses, $subCategories] = $this->service->getCourses($filters);

        return Inertia::render('courses/list-courses', [
            'activeCategory' => $filters['category_id'],
            'parentCategories' => $parentCategories,
            'courses' => Inertia::scroll($courses),
            'subCategories' => $subCategories,
            'activeSub' => $filters['sub'] ?? []
        ]);
    }
}
