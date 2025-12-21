<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeachingCourse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'teacher_id',
        'course_id',
        'is_verified'
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'user_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function courseWeeklyRules()
    {
        return $this->hasMany(CourseWeeklyRule::class);
    }
}
