<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TeacherVerificationRejectedEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public int $id,
        public ?string $reason = null
    ) {}

    public function broadcastOn()
    {
        return new PrivateChannel('teacher.' . $this->id);
    }

    public function broadcastAs()
    {
        return 'teacher.rejected';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->id,
            'reason' => $this->reason,
        ];
    }
}
