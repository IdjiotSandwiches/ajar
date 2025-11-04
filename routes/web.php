<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

// Route::middleware(['auth', 'verified'])->group(function () {
Route::middleware('guest')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('create-course', function () {
        return Inertia::render('courses/create');
    })->name('create-course');

    Route::get('my-course', function () {
        return Inertia::render('courses/my-courses');
    })->name('my-course');

    Route::get('edit-course/{id}', function ($id) {
    return Inertia::render('courses/edit', [
        'courseId' => $id,
    ]);
    })->name('edit-course');

    Route::get('add-schedule', function () {
        return Inertia::render('courses/add-schedule');
    })->name('add-schedule');

    Route::get('list-course', function () {
        return Inertia::render('courses/list-courses');
    })->name('list-course');

    Route::get('detail-institute', function () {
        return Inertia::render('institute/detail');
    })->name('detail-institute');

});

// Route::middleware(['auth', 'verified', 'role:Admin'])
//     ->prefix('admin')
//     ->name('admin.')
//     ->group(function () {

//     });

// Route::middleware(['auth', 'verified', 'role:Teacher'])
//     ->prefix('teacher')
//     ->name('teacher.')
//     ->group(function () {

//     });

// Route::middleware(['auth', 'verified', 'role:Institute'])
//     ->prefix('institute')
//     ->name('institute.')
//     ->group(function () {

//     });



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
