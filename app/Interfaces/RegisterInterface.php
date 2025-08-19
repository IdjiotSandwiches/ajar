<?php

namespace App\Interfaces;

use App\Models\User;

interface RegisterInterface
{
    public function register(array $data): User;
    public function findUserOnSession(): User|null;
}
