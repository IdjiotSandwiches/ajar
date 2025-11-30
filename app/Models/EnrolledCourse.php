<?php

namespace App\Models;

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
        'is_complete',
        'is_verified',
        'course_schedule_id',
        'student_id'
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
}
