<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CommonController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MyLearningController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UtilityController;
use App\Http\Controllers\Admin\AdminCourseController;
use App\Http\Controllers\Admin\AdminTeacherController;
use App\Http\Controllers\Admin\AdminInstituteController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\Teacher\TeacherScheduleController;
use App\Http\Controllers\Teacher\TeacherApplicationController;
use App\Http\Controllers\Institute\InstituteController;
use App\Http\Controllers\Institute\InstituteCourseController;
use App\Http\Controllers\Institute\InstituteManagementController;

Route::group([], function () {
    Route::get('/', [HomeController::class, 'getHomeData'])->name('home');
    Route::controller(CommonController::class)->group(function () {
        Route::get('detail-teacher/{id}', 'getTeacherDetail')->name('detail-teacher');
        Route::get('list-institute', 'getInstituteList')->name('list-institute');
        Route::get('detail-institute/{id}', 'getInstituteDetail')->name('detail-institute');
        Route::get('list-course', 'getCourseList')->name('list-course');
        Route::get('detail-course/{id}', 'getCourseDetail')->name('detail-course');
    });
    Route::post('payment-webhook', [PaymentController::class, 'updateStatus'])
        ->withoutMiddleware([VerifyCsrfToken::class])
        ->name('midtrans-webhook');
    Route::middleware(['auth'])
        ->post('notifications/read', fn() => auth()->user()
            ->notifications()
            ->whereNull('read_at')
            ->update(['read_at' => now()]))
        ->name('mark-as-read');
});

// Route::middleware(['auth', 'verified', 'block.unverified.teacher'])
Route::middleware(['auth', 'block.unverified.teacher'])
    ->group(function () {
        Route::group([], function () {
            Route::get('dashboard', [DashboardController::class, 'getDashboardData'])->name('dashboard');
            Route::post('update-image', [UtilityController::class, 'postImage'])->name('update-image');
        });
        Route::middleware(['role:Student'])->group(function () {
            Route::controller(StudentController::class)->group(function () {
                Route::get('profile', 'getProfile')->name('profile');
                Route::put('profile', 'putProfile')->name('update-profile');
            });
            Route::controller(PaymentController::class)->group(function () {
                Route::get('payment-register', 'getEnrollment')->name('payment-register');
                Route::get('payment-register/{id}', 'getPendingEnrollment')->name('pending-payment');
                Route::post('payment-register/{id}/{bypass?}', 'createPayment')->name('pay');
            });
        });
        Route::middleware(['role:Admin'])
            ->prefix('admin')
            ->name('admin.')
            ->group(function () {
                Route::controller(AdminCourseController::class)->group(function () {
                    Route::get('course-completion', 'getCompletedCourses')->name('course-completion');
                    Route::post('course-completion/{id}/{isVerified}', 'completeCourse')->name('complete-course');
                    Route::get('remove-course', 'getAllCourses')->name('course-management');
                    Route::delete('remove-course/{id}', 'removeCourse')->name('remove-course');
                });
                Route::controller(AdminInstituteController::class)->group(function () {
                    Route::get('list-institute', 'getInstituteList')->name('list-institute');
                    Route::delete('delete-institute/{id}', 'deleteInstitute')->name('delete-institute');
                    Route::get('register-institute', 'getRegisterInstitute')->name('register-institute');
                    Route::post('register-institute', 'registerInstitute')->name('post-institute');
                });
                Route::controller(AdminTeacherController::class)->group(function () {
                    Route::get('list-teacher', 'getTeacherList')->name('list-teacher');
                    Route::get('teacher-applications', 'getUnverifiedTeachers')->name('teacher-applications');
                    Route::post('accept-teacher/{id}', 'acceptTeacher')->name('accept-teacher');
                    Route::post('reject-teacher/{id}', 'rejectTeacher')->name('reject-teacher');
                    Route::delete('delete-teacher/{id}', 'deleteTeacher')->name('delete-teacher');
                });
            });
        Route::middleware(['role:Teacher'])
            ->prefix('teacher')
            ->name('teacher.')
            ->group(function () {
                Route::controller(TeacherController::class)->group(function () {
                    Route::get('profile', 'getProfile')->name('profile');
                    Route::put('profile', 'putProfile')->name('update-profile');
                    Route::post('detail', 'putDetail')->name('update-detail');
                });
                Route::controller(TeacherApplicationController::class)->group(function () {
                    Route::get('institute-applications', 'getTeacherApplications')->name('institute-applications');
                    Route::get('course-applications', 'getCourseApplications')->name('course-applications');
                    Route::post('apply/institute/{id}', 'applyAsTeacher')->name('apply-as-teacher');
                    Route::post('apply/course/{id}', 'applyToCourse')->name('apply-to-course');
                });
                Route::controller(TeacherScheduleController::class)->group(function () {
                    Route::get('manage-weekly-course', 'getScheduleManagement')->name('get-weekly-course');
                    Route::post('manage-weekly-course', 'manageWeeklyCourse')->name('manage-weekly-course');
                    Route::post('manage-availability', 'manageAvailability')->name('manage-availability');
                    Route::get('courses-taught', 'getTeachingCourses')->name('courses-taught');
                    Route::post('cancel-schedule/{id}', 'cancelSchedule')->name('cancel-schedule');
                    Route::post('generate-now', 'generateScheduleNow')->name('generate-now');
                });
            });
        Route::middleware(['role:Institute'])
            ->prefix('institute')
            ->name('institute.')
            ->group(function () {
                Route::controller(InstituteController::class)->group(function () {
                    Route::get('profile', 'getProfile')->name('profile');
                    Route::put('profile', 'putProfile')->name('update-profile');
                });
                Route::controller(InstituteCourseController::class)->group(function () {
                    Route::get('my-courses', 'getCourseByInstitution')->name('my-courses');
                    Route::get('course-taken', 'getOngoingCourses')->name('courses-taken');
                    Route::get('course-detail/{id?}', 'getCourseData')->name('course-detail');
                    Route::post('course-detail/{id?}', 'postCourse')->name('post-course');
                    Route::delete('course-detail/{id}', 'removeCourse')->name('delete-course');
                });
                Route::controller(InstituteManagementController::class)->group(function () {
                    Route::get('teacher-application', 'getTeacherApplications')->name('teacher-application');
                    Route::post('accept-teacher/{id}', 'acceptTeacher')->name('accept-teacher');
                    Route::post('reject-teacher/{id}', 'rejectTeacher')->name('reject-teacher');
                    Route::get('course-application', 'getCourseApplications')->name('course-application');
                    Route::post('accept-course/{id}', 'acceptCourse')->name('accept-course');
                    Route::post('reject-course/{id}', 'rejectCourse')->name('reject-course');
                    Route::get('list-teacher', 'getTeacherList')->name('list-teacher');
                    Route::delete('deactivate-teacher/{id}', 'removeTeacher')->name('deactivate-teacher');
                });
            });

        Route::middleware(['role:Student,Teacher'])
            ->group(function () {
                Route::controller(MyLearningController::class)->group(function () {
                    Route::get('my-learning', 'getMyLearning')->name('my-learning');
                    Route::post('course-recording/{id}', 'saveCourseRecording')->name('course-recording');
                    Route::post('course-meeting/{id}', 'saveCourseMeeting')->name('course-meeting');
                    Route::post('reviews/{id}', 'addReviews')->name('add-reviews');
                });
            });
        Route::middleware(['role:Student,Teacher,Institute'])
            ->group(function () {
                Route::middleware(['user.last.seen.at'])
                    ->controller(ChatController::class)
                    ->group(function () {
                        Route::get('chat', 'index')->name('chat.index');
                        Route::get('chat/{user:uuid}', 'show')->name('chat.show');
                        Route::post('chat/{user:uuid}', 'chat')->name('chat.store');
                        Route::delete('chat/delete/{chat}', 'destroy')->name('chat.destroy');
                    });
                Route::get('payment-lms', [PaymentController::class, 'getPaymentList'])->name('payment-lms');
            });
    });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
