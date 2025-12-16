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
        'session_date',
        'meeting_link',
        'teacher_schedule_id',
        'status',
    ];

    protected $casts = [
        'status' => StatusEnum::class,
    ];

    public function teacherSchedule()
    {
        return $this->belongsTo(TeacherSchedule::class);
    }
}
