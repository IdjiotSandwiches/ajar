<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperInstitute
 */
class Institute extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'website',
        'description',
        'category_id'
    ];

    /**
     * BelongsTo: User
     * @return BelongsTo<User, Institute>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * BelongsTo: Category
     * @return BelongsTo<Category, Institute>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * HasMany: InstituteReviews
     * @return HasMany<InstituteReview, Institute>
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(InstituteReview::class, 'institute_id', 'user_id');
    }

    /**
     * HasMany: Courses
     * @return HasMany<Course, Institute>
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'institute_id', 'user_id');
    }
}
