<?php

namespace App\Http\Controllers;

use App\Services\Teacher\TeacherService;
use Inertia\Inertia;
use App\Utilities\Utility;
use App\Http\Requests\FilterRequest;
use App\Services\CourseService;
use App\Services\Institute\InstituteService;

class CommonController extends Controller
{
    private CourseService $courseService;
    private InstituteService $instituteService;
    private TeacherService $teacherService;

    public function __construct(CourseService $courseService, InstituteService $instituteService, TeacherService $teacherService)
    {
        $this->courseService = $courseService;
        $this->instituteService = $instituteService;
        $this->teacherService = $teacherService;
    }

    public function getTeacherDetail($id)
    {
        $detail = $this->teacherService->getTeacherDetail($id);
        return Inertia::render('teacher/detail', [
            'teacher' => $detail['teacher'],
            'application' => $detail['application']
        ]);
    }

    public function getInstituteDetail($id)
    {
        $data = $this->instituteService->getInstituteDetail($id);
        $application = $this->instituteService->getTeacherApplication($id);

        return Inertia::render('institute/detail', [
            'institute' => $data['institute'],
            'courses' => Inertia::scroll($data['courses']),
            'teachers' => $data['teachers'],
            'application' => $application
        ]);
    }

    public function getInstituteList(FilterRequest $request)
    {
        $filters = $request->validated();
        $parentCategories = Utility::getParentCategories();
        $institutes = $this->instituteService->getInstituteList($filters);
        return Inertia::render('institute/list-institute', [
            'parentCategories' => $parentCategories,
            'institutes' => Inertia::scroll($institutes),
            'activeCategory' => $filters['category_id'] ?? null,
            'search' => $filters['search'] ?? '',
        ]);
    }

    public function getCourseList(FilterRequest $request)
    {
        $filters = $request->validated();

        $parentCategories = Utility::getParentCategories();
        [$courses, $subCategories, $minPrice, $maxPrice] = $this->courseService->getCourses($filters);

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

    public function getCourseDetail($id)
    {
        [$course, $popularCourses, $teaching, $canApply, $hasSchedule] = $this->courseService->getCourseDetail($id);
        return Inertia::render('courses/detail', [
            'course' => $course,
            'popularCourses' => $popularCourses,
            'teaching' => $teaching,
            'canApply' => $canApply,
            'hasSchedule' => $hasSchedule
        ]);
    }
}
