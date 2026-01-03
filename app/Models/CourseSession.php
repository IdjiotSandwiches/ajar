<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseSession extends Model
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
     * @return BelongsTo<Course, CourseSession>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
