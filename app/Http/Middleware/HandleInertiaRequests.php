<?php

namespace App\Http\Middleware;

use App\Enums\CourseStatusEnum;
use App\Enums\DayEnum;
use App\Enums\DegreeTypeEnum;
use App\Enums\LearningStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\ReminderEnum;
use App\Enums\RoleEnum;
use App\Enums\StateEnum;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => fn() => $request->user()
                    ? $request->user()->loadMissing('teacher')
                    : null,
                'notifications' => fn() => auth()->user()?->unreadNotifications ?? []
            ],
            'enums' => [
                'roles_enum' => RoleEnum::asArray(),
                'degree_type_enum' => DegreeTypeEnum::asArray(),
                'reminder_enum' => ReminderEnum::asArray(),
                'state_enum' => StateEnum::asArray(),
                'days_enum' => DayEnum::asArray(),
                'payment_status_enum' => PaymentStatusEnum::asArray(),
                'learning_status_enum' => LearningStatusEnum::asArray(),
                'course_status_enum' => CourseStatusEnum::asArray()
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->pull('success'),
                'error' => fn() => $request->session()->pull('error'),
                'info' => fn() => $request->session()->pull('info'),
                'snap_token' => fn() => $request->session()->pull('snap_token'),
            ],
        ];
    }
}
