<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSocialMediaType
 */
class SocialMediaType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name'];

    public function socialMedias()
    {
        return $this->hasMany(SocialMedia::class);
    }
}
