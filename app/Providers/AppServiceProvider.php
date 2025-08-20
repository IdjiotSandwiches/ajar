<?php

namespace App\Providers;

use App\Enums\DegreeTypeEnum;
use App\Enums\RoleEnum;
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
        Inertia::share([
            'roles_enum' => RoleEnum::asArray(),
            'degree_type_enum' => DegreeTypeEnum::asArray()
        ]);
    }
}
