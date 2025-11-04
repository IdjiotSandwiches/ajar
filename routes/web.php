<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'getHomeData'])
    ->name('home');

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('list-course', fn() => Inertia::render('courses/list-courses'))->name('list-course');
    });

Route::middleware(['auth', 'verified', 'role:Admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

    });

Route::middleware(['auth', 'verified', 'role:Teacher'])
    ->prefix('teacher')
    ->name('teacher.')
    ->group(function () {
        Route::get('add-schedule', fn() => Inertia::render('courses/add-schedule'))->name('add-schedule');
    });

Route::middleware(['auth', 'verified', 'role:Institute'])
    ->prefix('institute')
    ->name('institute.')
    ->group(function () {
        Route::get('create-course', fn() => Inertia::render('courses/create'))->name('create-course');
        Route::get('my-course', fn() => Inertia::render('courses/my-courses'))->name('my-course');
        Route::get('edit-course', fn() => Inertia::render('courses/edit'))->name('edit-course');
    });

// Route::middleware(['auth', 'verified', 'role:Institute,Teacher'])
//     ->prefix('combine')
//     ->name('combine.')
//     ->group(function () {
//
//     });



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
