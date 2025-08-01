<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'start_time',
        'end_time',
        'meeting_link',
        'is_verified',
        'teacher_id',
        'course_id'
    ];

    /**
     * BelongsTo: Teacher
     * @return BelongsTo<Teacher, CourseSchedule>
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'user_id');
    }

    /**
     * BelongsTo: Course
     * @return BelongsTo<Course, CourseSchedule>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * HasMany: EnrolledCourses
     * @return HasMany<EnrolledCourse, CourseSchedule>
     */
    public function enrolledCourses(): HasMany
    {
        return $this->hasMany(EnrolledCourse::class);
    }
}
