<?php

namespace App\Interfaces;

use App\Http\Requests\RegisterRequest;
use App\Models\User;

interface RegisterInterface
{
    public function register(RegisterRequest $request): User;
}
