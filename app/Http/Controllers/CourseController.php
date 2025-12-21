<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseFilterRequest;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\FilterRequest;
use App\Services\CourseService;
use App\Utilities\Utility;
use Illuminate\Support\Facades\URL;
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

        $parentCategories = Utility::getParentCategories();
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

    public function getCourseDetail($id)
    {
        [$course, $popularCourses, $teaching, $canApply] = $this->service->getCourseDetail($id);
        return Inertia::render('courses/detail', [
            'course' => $course,
            'popularCourses' => $popularCourses,
            'teaching' => $teaching,
            'canApply' => $canApply
        ]);
    }

    public function getCourseByInstitution(CourseFilterRequest $request)
    {
        $filters = $request->validated();
        [$categories, $courses] = $this->service->getCourseByInstitution($filters);
        return Inertia::render('courses/my-courses', [
            'courses' => $courses,
            'categories' => $categories
        ]);
    }

    public function getCourseData($id = null)
    {
        $course = $this->service->getCourseById($id);
        $skills = $this->service->getCourseSkillByCategory();
        $categories = $this->service->getCategories();
        return Inertia::render('courses/create', [
            'course' => $course,
            'skills' => $skills,
            'categories' => $categories,
        ]);
    }

    public function postCourse(CourseRequest $request)
    {
        try {
            $data = $request->validated();
            $this->service->createOrUpdateCourses($data);
            return redirect(route('institute.my-courses'))->with('success', 'Course created!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function putCourse(CourseRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $this->service->createOrUpdateCourses($data, $id);
            return redirect(route('institute.my-courses'))->with('success', 'Course updated!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function removeCourse($id)
    {
        $isDeleted = $this->service->deleteCourse($id);
        if ($isDeleted)
            return back()->with('success', 'Course deleted!');
        else
            return back()->with('error', 'Course not found!');
    }

    public function enrollCourse($id)
    {
        $isNotEnrolled = $this->service->enrollCourse($id);
        $url = strtok(URL::previous(), '?');

        if (!$isNotEnrolled)
            return redirect($url)->with('error', 'You have already been enrolled to this course.');

        return redirect($url)->with('success', 'You have been enrolled.');
    }
}
