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

        $parentCategories = $this->service->getParentCategories();
        [$courses, $subCategories, $minPrice, $maxPrice] = $this->service->getCourses($filters);

        return Inertia::render('courses/list-courses', [
            'parentCategories' => $parentCategories,
            'courses' => Inertia::scroll($courses),
            'subCategories' => $subCategories,
            'activeCategory' => $filters['category_id'] ?? null,
            'activeSub' => $filters['sub'] ?? [],
            'search' => $filters['search'] ?? '',
            'price' => [
                'min' => $minPrice,
                'max' => $maxPrice
            ],
            'studentFilter' => [
                'rating' => $filters['rating'] ?? [],
                'price_min' => $filters['price_min'] ?? null,
                'price_max' => $filters['price_max'] ?? null
            ]
        ]);
    }

    public function getCourseDetail(int $id)
    {
        [$course, $popularCourses] = $this->service->getCourseDetail($id);
        return Inertia::render('courses/detail', [
            'course' => $course,
            'popularCourses' => $popularCourses
        ]);
    }
}
