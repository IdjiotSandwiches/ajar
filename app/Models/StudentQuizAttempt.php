<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentQuizAttempt extends Model
{
    protected $fillable = [
        'user_id',
        'my_course_id',
        'score',
    ];

    public function answers()
    {
        return $this->hasMany(StudentQuizAnswer::class, 'attempt_id');
    }
}
