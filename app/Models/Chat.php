<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperChat
 */
class Chat extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = ['id'];

    protected $casts = [
        'seen_at' => 'datetime',
        'message_deleted_at' => 'datetime',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id');
    }

    public function reply()
    {
        return $this->belongsTo(Chat::class, 'reply_id', 'id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id', 'id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id');
    }
}
