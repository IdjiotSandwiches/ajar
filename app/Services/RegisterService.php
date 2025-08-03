<?php

namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Interfaces\RegisterInterface;
use App\Models\User;

class RegisterService implements RegisterInterface
{
    public function register(RegisterRequest $request): User
    {

    }
}
