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
        $detail = $this->service->getTeacherDetail($id);

        return Inertia::render('teacher/detail', [
            'teacher' => $detail['teacher'],
            'application' => $detail['application']
        ]);
    }

    public function applyAsTeacher($id)
    {
        try {
            $this->service->applyAsTeacher($id);
            return back()->with('success', 'You have applied, please wait for a moment!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
