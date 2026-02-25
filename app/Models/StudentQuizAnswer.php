<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentQuizAnswer extends Model
{
    protected $fillable = [
        'attempt_id',
        'quiz_id',
        'selected_option_id',
        'is_correct'
    ];

    public function quiz()
    {
        return $this->belongsTo(CourseQuiz::class);
    }

    public function option()
    {
        return $this->belongsTo(CourseQuizOption::class, 'selected_option_id');
    }
}
