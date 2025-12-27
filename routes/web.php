<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstituteController;
use App\Http\Controllers\MyLearningController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UtilityController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([], function () {
    Route::get('/', [HomeController::class, 'getHomeData'])->name('home');
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
    Route::post('payment-webhook', [PaymentController::class, 'updateStatus'])
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->name('midtrans-webhook');
});

Route::middleware(['auth', 'verified'])
    ->group(function () {
        Route::group([], function () {
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
            Route::controller(PaymentController::class)->group(function () {
                Route::get('payment-lms', 'getPaymentList')->name('payment-lms');
                Route::get('payment-register', 'getEnrollment')->name('payment-register');
                Route::get('payment-register/{id}', 'getPendingEnrollment')->name('pending-payment');
                Route::post('payment-register/{id}', 'createPayment')->name('pay');
            });
        });
        Route::middleware(['role:Admin'])
            ->prefix('admin')
            ->name('admin.')
            ->group(function () {
                Route::controller(AdminController::class)->group(function () {
                    Route::get('course-completion', fn() => Inertia::render('my-learning/course-completion'))->name('course-completion');
                    Route::get('remove-course', fn() => Inertia::render('admin/remove-course'))->name('remove-course');
                    Route::get('teacher-applications', 'getUnverifiedTeachers')->name('teacher-applications');
                    Route::post('accept-teacher/{id}', 'acceptTeacher')->name('accept-teacher');
                    Route::post('reject-teacher/{id}', 'rejectTeacher')->name('reject-teacher');
                    Route::get('list-teacher', 'getTeacherList')->name('list-teacher');
                    Route::delete('delete-teacher/{id}', 'deleteTeacher')->name('delete-teacher');
                    Route::get('list-institute', 'getInstituteList')->name('list-institute');
                    Route::delete('delete-institute/{id}', 'deleteInstitute')->name('delete-institute');
                    Route::get('register-institute', 'getRegisterInstitute')->name('register-institute');
                    Route::post('register-institute', 'registerInstitute')->name('post-institute');
                });
            });
        Route::middleware(['role:Teacher'])
            ->prefix('teacher')
            ->name('teacher.')
            ->group(function () {
                Route::controller(TeacherController::class)->group(function () {
                    Route::post('apply/institute/{id}', 'applyAsTeacher')->name('apply-as-teacher');
                    Route::post('apply/course/{id}', 'applyToCourse')->name('apply-to-course');
                    Route::get('profile', 'getProfile')->name('profile');
                    Route::put('profile', 'putProfile')->name('update-profile');
                    Route::post('detail', 'putDetail')->name('update-detail');
                    Route::post('meeting-link/{id}', 'addMeetingLink')->name('add-meeting-link');
                    Route::get('institute-applications', 'getTeacherApplications')->name('institute-applications');
                    Route::get('course-applications', 'getCourseApplications')->name('course-applications');
                    Route::get('manage-weekly-course', 'getScheduleManagement')->name('get-weekly-course');
                    Route::post('manage-weekly-course', 'manageWeeklyCourse')->name('manage-weekly-course');
                    Route::post('manage-availability', 'manageAvailability')->name('manage-availability');
                    Route::get('courses-taught', 'getTeachingCourses')->name('courses-taught');
                });
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
                    Route::get('list-teacher', 'getTeacherList')->name('list-teacher');
                    Route::delete('deactivate-teacher/{id}', 'removeTeacher')->name('deactivate-teacher');
                    Route::get('teacher-application', 'getTeacherApplications')->name('teacher-application');
                    Route::post('accept-teacher/{id}', 'acceptTeacher')->name('accept-teacher');
                    Route::post('reject-teacher/{id}', 'rejectTeacher')->name('reject-teacher');
                    Route::get('course-application', 'getCourseApplications')->name('course-application');
                    Route::post('accept-course/{id}', 'acceptCourse')->name('accept-course');
                    Route::post('reject-course/{id}', 'rejectCourse')->name('reject-course');
                    Route::get('profile', 'getProfile')->name('profile');
                    Route::put('profile', 'putProfile')->name('update-profile');
                });
                Route::get('course-taken', fn() => Inertia::render('institute/course-taken'))->name('courses-taken');
            });

        Route::middleware(['role:Student,Teacher'])
            ->group(function () {
                Route::controller(MyLearningController::class)->group(function () {
                    Route::get('my-learning', 'getMyLearning')->name('my-learning');
                    Route::post('course-recording/{id}', 'saveCourseRecording')->name('course-recording');
                    Route::post('course-meeting/{id}', 'saveCourseMeeting')->name('course-meeting');
                });
            });
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
