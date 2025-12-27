<?php

namespace App\Models;

use App\Enums\CourseStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperCourseSchedule
 */
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
        'recording_link',
        'course_id',
        'teacher_id',
        'is_verified',
        'status',
    ];

    protected $casts = [
        'status' => CourseStatusEnum::class,
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];


    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'user_id');
    }

    public function enrolledCourses()
    {
        return $this->hasMany(EnrolledCourse::class);
    }
}
