<?php

use App\Http\Controllers\CourseController;
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

Route::get('detail-teacher/{teacherName}', function ($teacherName) {
    return Inertia::render('teacher/detail', [
        'teacherName' => $teacherName,
    ]);
})->name('detail-teacher');

Route::controller(CourseController::class)->group(function () {
    Route::get('list-course', 'getCourseList')->name('list-course');
    Route::get('detail-course/{id}', 'getCourseDetail')->name('detail-course');
});


Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('my-learning', fn() => Inertia::render('my-learning/app'))->name('my-learning');

        Route::get('profile', fn() => Inertia::render('student/edit-profile'))->name('profile-student');
        Route::get('chat', fn() => Inertia::render('chat'))->name('chat');
    });

Route::middleware(['auth', 'verified', 'role:Admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('course-completion', fn() => Inertia::render('my-learning/course-completion'))->name('course-completion');
    });

Route::middleware(['auth', 'verified', 'role:Teacher'])
    ->prefix('teacher')
    ->name('teacher.')
    ->group(function () {
        Route::get('add-schedule', fn() => Inertia::render('courses/add-schedule'))->name('add-schedule');
        Route::get('profile', fn() => Inertia::render('teacher/edit-profile'))->name('profile-teacher');
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
        Route::get('teacher-application', fn() => Inertia::render('institute/teacher-application'))->name('teacher-application');
        Route::get('profile', fn() => Inertia::render('institute/edit-profile'))->name('profile-institute');
    });

// Route::middleware(['auth', 'verified', 'role:Institute,Teacher'])
//     ->prefix('combine')
//     ->name('combine.')
//     ->group(function () {
//
//     });



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
