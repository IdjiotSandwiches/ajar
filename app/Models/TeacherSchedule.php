<?php

namespace App\Models;

use App\Enums\DayEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'day',
        'start_time',
        'end_time',
        'is_verified',
        'course_id',
        'teacher_id',
        'teaching_course_id'
    ];

    protected $casts = [
        'day' => DayEnum::class,
    ];

    public function courseSchedules()
    {
        return $this->hasMany(CourseSchedule::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class,  'teacher_id', 'user_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teachingCourse()
    {
        return $this->belongsTo(TeachingCourse::class);
    }
}
