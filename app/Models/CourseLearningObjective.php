<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseLearningObjective extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
        'course_id'
    ];

    /**
     * BelongsTo: Course
     * @return BelongsTo<Course, CourseLearningObjective>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
