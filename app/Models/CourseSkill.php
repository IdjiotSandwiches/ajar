<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseSkill extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'course_id',
        'skill_id'
    ];

    /**
     * BelongsTo: Skill
     * @return BelongsTo<Skill, CourseSkill>
     */
    public function skill(): BelongsTo
    {
        return $this->belongsTo(Skill::class);
    }

    /**
     * BelongsTo: Course
     * @return BelongsTo<Course, CourseSkill>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
