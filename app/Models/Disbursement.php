<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disbursement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'course_schedule_id',
        'user_id',
        'unique_id',
        'amount',
    ];

    public function courseSchedule()
    {
        return $this->belongsTo(CourseSchedule::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
