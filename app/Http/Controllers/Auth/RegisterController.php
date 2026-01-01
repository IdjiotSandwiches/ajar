<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Category;
use App\Services\RegisterService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    private RegisterService $service;

    public function __construct(RegisterService $service)
    {
        $this->service = $service;
    }

    /**
     * Student Registration Form
     *
     * @return \Inertia\Response
     */
    public function studentForm(): Response
    {
        return Inertia::render('auth/register/form', [
            'role' => RoleEnum::Student
        ]);
    }

    /**
     * Teacher Registration Form
     *
     * @return \Inertia\Response
     */
    public function teacherForm(): Response
    {
        return Inertia::render('auth/register/form', [
            'role' => RoleEnum::Teacher
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $user = $this->service
                ->register($data);

            // event(new Registered($user));
            Auth::login($user);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }

        // return to_route('verification.notice');
        return to_route('dashboard');
    }
}
