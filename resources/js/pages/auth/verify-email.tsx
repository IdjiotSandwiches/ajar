import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verify Email">
            <Head title="Email Verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} className="rounded-lg bg-[#3ABEFF] px-7 py-3 font-medium text-white transition hover:bg-[#2fa5d8] cursor-pointer">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    <p>Resend verification email</p>
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm hover:text-[#3ABEFF] cursor-pointer">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}
