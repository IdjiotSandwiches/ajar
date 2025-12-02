<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\TeacherService;
use Inertia\Inertia;

class TeacherController extends Controller
{
    private TeacherService $service;

    public function __construct(TeacherService $service)
    {
        $this->service = $service;
    }

    public function getTeacherDetail($id)
    {
        $teacher = $this->service->getTeacherDetail($id);

        return Inertia::render('teacher/detail', [
            'teacher' => $teacher
        ]);
    }
}
