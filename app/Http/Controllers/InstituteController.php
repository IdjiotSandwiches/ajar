<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
}
