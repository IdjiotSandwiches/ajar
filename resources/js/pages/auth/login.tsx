import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } =
        useForm<Required<LoginForm>>({
            email: '',
            password: '',
            remember: false,
        });

    const [visibleStatus, setVisibleStatus] = useState<string | null>(
        status || null,
    );

    useEffect(() => {
        if (status) {
            setVisibleStatus(status);
            const timer = setTimeout(() => {
                setVisibleStatus(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Login">
            <Head title="Log in" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Input
                            id="email"
                            name="email"
                            name="email"
                            type="email"
                            label="Email"
                            label="Email"
                            required
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Input
                            id="password"
                            name="password"
                            name="password"
                            type="password"
                            label="Password"
                            label="Password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() =>
                                    setData('remember', !data.remember)
                                }
                                tabIndex={3}
                                className="data-[state=checked]:bg-[#42C2FF] data-[state=checked]:border-[#42C2FF]"
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>

                        {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="text-sm text-gray-600 hover:text-[#42C2FF] transition-colors"
                                tabIndex={5}
                            >
                                Forgot password?
                            </TextLink>
                        )}
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                router.get(route('register.student'))
                            }
                            className="rounded-full hover:bg-[#42C2FF]/10 w-full sm:w-auto"
                        >
                            <p className="hover:text-[#42C2FF]">
                                Create Account
                            </p>
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-full bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white w-full sm:w-auto"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            Log in
                        </Button>
                    </div>
                </div>
            </form>

            {visibleStatus && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {visibleStatus}
                </div>
            )}
        </AuthLayout>
    );
}
