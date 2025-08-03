<?php

namespace App\Providers;

use App\Interfaces\RegisterInterface;
use App\Services\RegisterService;
use Illuminate\Support\ServiceProvider;

class AuthenticationProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(RegisterInterface::class, RegisterService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
