<?php

namespace App\Http\Controllers;

use App\Services\MyLearningService;
use Illuminate\Http\Request;

class MyLearningController extends Controller
{
    private MyLearningService $service;

    public function __construct(MyLearningService $service)
    {
        $this->service = $service;
    }

    // public function
}
