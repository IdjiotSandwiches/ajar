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
        'active',
        'teacher_id'
    ];

    protected $casts = [
        'day' => DayEnum::class,
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class,  'teacher_id', 'user_id');
    }
}
