<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Interfaces\RegisterInterface;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    private RegisterInterface $service;

    public function __construct(RegisterInterface $service)
    {
        $this->service = $service;
    }

    /**
     * Student Registration Form
     * @return \Inertia\Response
     */
    public function studentForm(): Response
    {
        return Inertia::render('auth.register.student-register');
    }

    /**
     * Teacher Registration Form
     * @return \Inertia\Response
     */
    public function teacherForm(): Response
    {
        return Inertia::render('auth.register.teacher-register');
    }

    /**
     * Institute Registration Form
     * @return \Inertia\Response
     */
    public function instituteForm(): Response
    {
        return Inertia::render('auth.register.institute-register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);

        $user = $request->validated();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
