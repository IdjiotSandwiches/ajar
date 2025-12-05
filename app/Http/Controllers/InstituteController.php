<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Services\InstituteService;
use Inertia\Inertia;

class InstituteController extends Controller
{
    private InstituteService $service;

    public function __construct(InstituteService $service)
    {
        $this->service = $service;
    }

    public function getInstituteDetail($id)
    {
        $data = $this->service->getInstituteDetail($id);

        return Inertia::render('institute/detail', [
            'institute' => $data['institute'],
            'courses' => Inertia::scroll($data['courses']),
            'teachers' => $data['teachers']
        ]);
    }

    public function getInstituteList(FilterRequest $request)
    {
        $filters = $request->validated();

        $parentCategories = $this->service->getParentCategories();
        $institutes = $this->service->getInstituteList($filters);

        return Inertia::render('institute/list-institute', [
            'parentCategories' => $parentCategories,
            'institutes' => Inertia::scroll($institutes),
            'activeCategory' => $filters['category_id'] ?? null,
            'search' => $filters['search'] ?? '',
        ]);
    }
}
