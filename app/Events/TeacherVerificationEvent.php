<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TeacherVerificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private int $id;
    private bool $isVerified;

    /**
     * Create a new event instance.
     */
    public function __construct(int $id, bool $isVerified)
    {
        $this->id = $id;
        $this->isVerified = $isVerified;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('teacher.' . $this->id);
    }

    public function broadcastAs()
    {
        return 'teacher.verified';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->id,
            'isVerified' => $this->isVerified,
        ];
    }
}
