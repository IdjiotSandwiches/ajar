<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperNotificationType
 */
class NotificationType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name'];

    /**
     * HasMany: Notifications
     * @return HasMany<Notification, NotificationType>
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}
