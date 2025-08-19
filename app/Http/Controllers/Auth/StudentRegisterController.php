<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Register\RegisterRequest;
use App\Interfaces\RegisterInterface;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class StudentRegisterController extends Controller
{
    private RegisterInterface $service;

    public function __construct(RegisterInterface $service)
    {
        $this->service = $service;
    }

    /**
     * Student Registration Form
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function show(Request $request): Response
    {
        return Inertia::render('auth/register/student-register', [
            'step' => $this->service
                ->findUserOnSession() ? $request->query('step') : 0
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param \App\Http\Requests\Register\RegisterRequest $request
     * @return RedirectResponse
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $data['step'] = intval($data['step']);
            if ($data['step'] === 0) {
                $user = User::updateOrCreate(
                    ['id' => session('user_id')],
                    [
                        'name' => $data['name'],
                        'phone_number' => $data['phone_number'],
                        'role_id' => RoleEnum::from($data['role_id'])
                    ]
                );

                session(['user_id' => $user->id]);
                return redirect()->route('register.student', ['step' => $data['step'] + 1]);
            }
            else if ($data['step'] === 1) {
                $user = $this->service
                    ->findUserOnSession();
                $user->email = $data['email'];
                $user->password = Hash::make($data['password']);
                $user->save();

                session()->flush();
                event(new Registered($user));
                Auth::login($user);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }

        return to_route('dashboard');
    }
}
