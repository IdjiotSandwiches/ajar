<?php

namespace App\Models;

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
        'course_id',
        'teacher_id',
        'status',
    ];

    protected $casts = [
        'status' => CourseStatusEnum::class,
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'user_id');
    }
}
