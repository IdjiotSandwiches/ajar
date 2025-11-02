<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('home', fn() => Inertia::render('home'))
            ->name('home');
        Route::get('dashboard', fn() => Inertia::render('dashboard'))
            ->name('dashboard');
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
        Route::get('create-course', fn() => Inertia::render('courses/create'))
            ->name('create-course');
        Route::get('my-course', fn() => Inertia::render('courses/my-courses'))
            ->name('my-course');
        Route::get('edit-course', fn() => Inertia::render('courses/edit'))
            ->name('edit-course');
        Route::get('add-schedule', fn() => Inertia::render('courses/add-schedule'))
            ->name('add-schedule');
        Route::get('list-course', fn() => Inertia::render('courses/list-courses'))
            ->name('list-course');
    });

Route::middleware(['auth', 'verified', 'role:Institute'])
    ->prefix('institute')
    ->name('institute.')
    ->group(function () {

    });



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
