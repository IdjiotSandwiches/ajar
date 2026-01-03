<?php

namespace App\Models;

use App\Enums\CourseStatusEnum;
use App\Enums\PaymentStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperEnrolledCourse
 */
class EnrolledCourse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'status',
        'is_verified',
        'course_schedule_id',
        'student_id'
    ];

    protected $casts = [
        'status' => CourseStatusEnum::class,
    ];

    /**
     * BelongsTo: Course
     * @return BelongsTo<CourseSchedule, EnrolledCourse>
     */
    public function courseSchedule(): BelongsTo
    {
        return $this->belongsTo(CourseSchedule::class);
    }

    /**
     * BelongsTo: User(Student)
     * @return BelongsTo<User, EnrolledCourse>
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function activePayment()
    {
        return $this->hasOne(Payment::class)
            ->whereIn('status', [
                PaymentStatusEnum::Paid,
                PaymentStatusEnum::Pending,
            ])
            ->latestOfMany();
    }

    public function courseReviews()
    {
        return $this->hasMany(CourseReview::class);
    }

    public function instituteReviews()
    {
        return $this->hasMany(InstituteReview::class);
    }

    public function teacherReviews()
    {
        return $this->hasMany(TeacherReview::class);
    }
}
