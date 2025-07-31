<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Graduate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'degree_title',
        'university_name',
        'teacher_id',
        'degree_type_id'
    ];

    /**
     * BelongsTo: Teacher
     * @return BelongsTo<Teacher, Graduate>
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'user_id');
    }

    /**
     * BelongsTo: DegreeType
     * @return BelongsTo<DegreeType, Graduate>
     */
    public function degreeType(): BelongsTo
    {
        return $this->belongsTo(DegreeType::class);
    }
}
