<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseQuiz extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'question',
        'course_id'
    ];

    /**
     * BelongsTo: Course
     * @return BelongsTo<Course, CourseQuiz>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function options()
    {
        return $this->hasMany(CourseQuizOption::class);
    }
}
