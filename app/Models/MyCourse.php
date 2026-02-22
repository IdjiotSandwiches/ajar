<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MyCourse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'course_id',
        'user_id'
    ];

    /**
     * BelongsTo: Course
     * @return BelongsTo<Course, MyCourse>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * BelongsTo: User
     * @return BelongsTo<User, MyCourse>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
