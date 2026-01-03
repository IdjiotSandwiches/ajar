<?php

namespace App\Providers;

use App\Enums\DegreeTypeEnum;
use App\Enums\RoleEnum;
use App\Helpers\Helper;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->booted(function () {
            Event::forget(Registered::class);
            Event::listen(
                Registered::class,
                SendEmailVerificationNotification::class
            );
        });

        Inertia::share([
            'roles_enum' => RoleEnum::asArray(),
            'degree_type_enum' => DegreeTypeEnum::asArray()
        ]);

        \Broadcast::channel('online-users', fn($user) =>
            [
                'id' => $user->id,
                'name' => $user->name,
                'uuid' => $user->uuid,
                'last_seen_at' => Helper::userLastActivityStatus($user->last_seen_at),
            ]);

        // if ($this->app->environment('production')) {
        //     \URL::forceScheme('https');
        // }
    }
}
