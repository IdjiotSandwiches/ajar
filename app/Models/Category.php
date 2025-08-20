<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name'];

    /**
     * HasMany: Teachers
     * @return HasMany<Teacher, Category>
     */
    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class);
    }

    /**
     * HasMany: Institutes
     * @return HasMany<Institute, Category>
     */
    public function institutes(): HasMany
    {
        return $this->hasMany(Institute::class);
    }

    /**
     * HasMany: Institutes
     * @return HasMany<Course, Category>
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    /**
     * Self referencing
     * @return BelongsTo<Category, Category>
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Self referencing
     * @return HasMany<Category, Category>
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
