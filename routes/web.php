<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstituteController;
use App\Http\Controllers\MyLearningController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UtilityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([], function () {
    Route::get('/', [HomeController::class, 'getHomeData'])
        ->name('home');
    Route::controller(TeacherController::class)->group(function () {
        Route::get('detail-teacher/{id}', 'getTeacherDetail')->name('detail-teacher');
    });
    Route::controller(InstituteController::class)->group(function () {
        Route::get('detail-institute/{id}', 'getInstituteDetail')->name('detail-institute');
        Route::get('list-institute', 'getInstituteList')->name('list-institute');
    });
    Route::controller(CourseController::class)->group(function () {
        Route::get('list-course', 'getCourseList')->name('list-course');
        Route::get('detail-course/{id}', 'getCourseDetail')->name('detail-course');
    });
});



Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::group([], function () {
            // Route::controller(MyLearningController::class)->group(function () {
            //     Route::get('my-learning', 'getMyLearning')->name('my-learning');
            // });
            Route::get('chat', fn() => Inertia::render('chat'))->name('chat');
            Route::get('dashboard', [DashboardController::class, 'getDashboardData'])->name('dashboard');
            Route::controller(UtilityController::class)->group(function () {
                Route::post('update-image', 'postImage')->name('update-image');
            });
        });
        Route::middleware(['role:Student'])->group(function () {
            Route::controller(CourseController::class)->group(function () {
                Route::get('course-teachers', 'getCourseTeachers')->name('course-teachers');
                Route::post('enroll-course/{id}', 'enrollCourse')->name('enroll-course');
            });
            Route::controller(StudentController::class)->group(function () {
                Route::get('profile', 'getProfile')->name('profile');
                Route::put('profile', 'putProfile')->name('update-profile');
                Route::post('reviews/{id}', 'addReviews')->name('add-reviews');
            });
        });
        Route::middleware(['role:Admin'])
            ->prefix('admin')
            ->name('admin.')
            ->group(function () {
                Route::controller(AdminController::class)->group(function () {
                    Route::get('register-institute', fn() => Inertia::render('admin/register-institute'))->name('register-institute');
                    Route::get('course-completion', fn() => Inertia::render('my-learning/course-completion'))->name('course-completion');
                    Route::get('remove-course', fn() => Inertia::render('admin/remove-course'))->name('remove-course');
                    Route::get('teacher-applications', fn() => Inertia::render('admin/teacher-application'))->name('teacher-applications');
                    Route::get('list-teacher', fn() => Inertia::render('admin/list-teacher'))->name('list-teacher');
                    Route::get('list-institute', fn() => Inertia::render('admin/list-institute'))->name('list-institute');
                });
            });
        Route::middleware(['role:Teacher'])
            ->prefix('teacher')
            ->name('teacher.')
            ->group(function () {
                Route::controller(TeacherController::class)->group(function () {
                    Route::post('apply/{id}', 'applyAsTeacher')->name('apply-as-teacher');
                    Route::get('profile', 'getProfile')->name('profile');
                    Route::put('profile', 'putProfile')->name('update-profile');
                    Route::post('detail', 'putDetail')->name('update-detail');
                    Route::post('meeting-link/{id}', 'addMeetingLink')->name('add-meeting-link');
                });
                Route::get('add-schedule', fn() => Inertia::render('courses/add-schedule'))->name('add-schedule');
                Route::get('courses-taught', fn() => Inertia::render('teacher/courses-taught'))->name('courses-taught');
                Route::get('course-applications', fn() => Inertia::render('teacher/course-application'))->name('course-applications');
                Route::get('institute-applications', fn() => Inertia::render('teacher/institute-applications'))->name('institute-applications');
            });
        Route::middleware(['role:Institute'])
            ->prefix('institute')
            ->name('institute.')
            ->group(function () {
                Route::controller(CourseController::class)->group(function () {
                    Route::get('my-courses', 'getCourseByInstitution')->name('my-courses');
                    Route::get('course-detail/{id?}', 'getCourseData')->name('course-detail');
                    Route::post('course-detail', 'postCourse')->name('post-course');
                    Route::put('course-detail/{id?}', 'putCourse')->name('put-course');
                    Route::delete('course-detail/{id}', 'removeCourse')->name('delete-course');
                });
                Route::controller(InstituteController::class)->group(function () {
                    Route::get('teacher-application', 'getTeacherApplications')->name('teacher-application');
                    Route::get('list-teacher', fn() => Inertia::render('institute/teacher-list'))->name('list-teacher');
                    Route::post('accept-verification/{id}', 'acceptTeacher')->name('accept-teacher');
                    Route::post('reject-verification/{id}', 'rejectTeacher')->name('reject-teacher');
                    Route::get('profile', 'getProfile')->name('profile');
                    Route::put('profile', 'putProfile')->name('update-profile');
                });
                Route::get('course-taken', fn() => Inertia::render('institute/course-taken'))->name('courses-taken');
                Route::get('course-teacher-applications', fn() => Inertia::render('institute/course-teacher-applications'))->name('course-teacher-applications');
            });

        Route::middleware(['role:Student,Teacher'])
            ->group(function () {
                Route::get('my-learning', fn() => Inertia::render('mylearning'))->name('my-learning');
            });
    });

// tampil di semua role

// tampil hanya di student & teacher

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
