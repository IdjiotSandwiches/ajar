<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Interfaces\RegisterInterface;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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
     *
     * @return \Inertia\Response
     */
    public function studentForm(): Response
    {
        return Inertia::render('auth/register/student-register');
    }

    /**
     * Teacher Registration Form
     *
     * @return \Inertia\Response
     */
    public function teacherForm(): Response
    {
        return Inertia::render('auth/register/teacher-register');
    }

    /**
     * Institute Registration Form
     *
     * @return \Inertia\Response
     */
    public function instituteForm(): Response
    {
        return Inertia::render('auth/register/institute-register');
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

            event(new Registered($user));
            Auth::login($user);
        } catch (\Exception $e) {
            return back($e->getMessage());
        }

        return to_route('dashboard');
    }
}
