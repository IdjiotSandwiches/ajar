<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'message',
        'notification_type_id',
        'receiver_id',
        'sender_id'
    ];

    /**
     * BelongsTo: NotificationType
     * @return BelongsTo<NotificationType, Notification>
     */
    public function notificationType(): BelongsTo
    {
        return $this->belongsTo(NotificationType::class);
    }

    /**
     * BelongsTo: Sender (User)
     * @return BelongsTo<User, Notification>
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * BelongsTo: Receiver (User)
     * @return BelongsTo<User, Notification>
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
