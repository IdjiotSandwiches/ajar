<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'getHomeData'])
    ->name('home');

Route::get('detail-institute/{id}', function ($id) {
    return Inertia::render('institute/detail', [
        'instituteId' => $id,
    ]);
})->name('detail-institute');

Route::get('detail-course/{id}', function ($id) {
    return Inertia::render('courses/detail', [
        'courseId' => $id,
    ]);
})->name('detail-course');

Route::get('detail-teacher/{teacherName}', function ($teacherName) {
            return Inertia::render('teacher/detail', [
                'teacherName' => $teacherName,
            ]);
        })->name('detail-teacher');


Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('list-course', fn() => Inertia::render('courses/list-courses'))->name('list-course');
        Route::get('my-learning', fn() => Inertia::render('my-learning/app'))->name('my-learning');
    });

Route::middleware(['auth', 'verified', 'role:Admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {});

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
        Route::get('my-courses', fn() => Inertia::render('courses/my-courses'))->name('my-courses');
        Route::get('edit-course/{id}', function ($id) {
            return Inertia::render('courses/edit', [
                'courseId' => $id,
            ]);
        })->name('edit-course');
    });

// Route::middleware(['auth', 'verified', 'role:Institute,Teacher'])
//     ->prefix('combine')
//     ->name('combine.')
//     ->group(function () {
//
//     });



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
