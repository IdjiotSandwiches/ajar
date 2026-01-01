<?php

namespace App\Http\Controllers\Institute;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\ItemFilterRequest;
use App\Services\Institute\InstituteCourseService;

class InstituteCourseController extends Controller
{
    private InstituteCourseService $service;

    public function __construct(InstituteCourseService $service)
    {
        $this->service = $service;
    }

    public function getCourseByInstitution(ItemFilterRequest $request)
    {
        $filters = $request->validated();
        [$categories, $courses] = $this->service->getCourseByInstitution($filters);
        return Inertia::render('courses/my-courses', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => [
                'search' => $filters['search'] ?? null,
                'category_id' => $filters['category_id'] ?? null,
                'duration' => $filters['duration'] ?? null
            ]
        ]);
    }

    public function getOngoingCourses(ItemFilterRequest $request)
    {
        $filters = $request->validated();
        $courses = $this->service->getOngoingCourses($filters);
        return Inertia::render('institute/course-taken', [
            'courses' => $courses,
            'filters' => [
                'search' => $filters['search'] ?? null,
                'status' => $filters['status'] ?? null,
                'time' => $filters['time'] ?? null,
                'date' => $filters['date'] ?? null
            ]
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

    public function postCourse(CourseRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $this->service->createOrUpdateCourses($data, $id);
            return redirect(route('institute.my-courses'))->with('success', 'Course created!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function removeCourse($id)
    {
        try {
            $this->service->deleteCourse($id);
            return back()->with('success', 'Course deleted!');
        } catch (\Exception $e) {
            return back()->with('error', 'Course not found!');
        }
    }
}
