<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperSkill
 */
class Skill extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name', 'category_id'];

    /**
     * HasMany: CourseSkills
     * @return HasMany<CourseSkill, Skill>
     */
    public function courseSKills(): HasMany
    {
        return $this->hasMany(CourseSkill::class);
    }
}
