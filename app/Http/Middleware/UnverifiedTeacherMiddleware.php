<?php

namespace App\Http\Middleware;

use Closure;
use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UnverifiedTeacherMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $role = $user->role_id;

        if (!$user || $role !== RoleEnum::Teacher) {
            return $next($request);
        }

        $user->loadMissing('teacher');
        if (!$user->teacher || $user->teacher->is_verified === null) {
            return redirect()->route('home')
                ->with('info', "Thanks for your patience! Your account is being reviewed, and you'll be notified as soon as it's approved.");
        } else if (!$user->teacher || $user->teacher->is_verified == false) {
            return redirect()->route('home')
                ->with('info', "You can't access MyDashboard.");
        }

        return $next($request);
    }
}
