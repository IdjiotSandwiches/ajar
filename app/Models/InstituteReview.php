<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperInstituteReview
 */
class InstituteReview extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'rating',
        'description',
        'reviewer_id',
        'institute_id',
        'enrolled_course_id'
    ];

    /**
     * BelongsTo: Institute
     * @return BelongsTo<Institute, InstituteReview>
     */
    public function institute(): BelongsTo
    {
        return $this->belongsTo(Institute::class, 'institute_id', 'user_id');
    }

    /**
     * BelongsTo: User(Reviewer)
     * @return BelongsTo<User, InstituteReview>
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
