<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSocialMedia
 */
class SocialMedia extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'url',
        'user_id',
        'social_media_type_id'
    ];

    public function socialMediaType()
    {
        return $this->belongsTo(SocialMediaType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
