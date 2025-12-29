import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Head, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function RegisterLayout({ steps, role_config, form }: any) {
    const [currentStep, setCurrentStep] = useState(1);

    const next = () => {
        if (currentStep < steps.length) {
            setCurrentStep((s: number) => s + 1);
        }
    };

    const back = () => {
        if (currentStep > 1) {
            setCurrentStep((s: number) => s - 1);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('register.submit'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
            onError: (errors: any) => {
                if (role_config.basic_info?.some((key: string) => errors[key])) {
                    setCurrentStep(1);
                    return;
                }

                if (role_config.credential_info?.some((key: string) => errors[key])) {
                    setCurrentStep(2);
                    return;
                }

                if (role_config.more_info) {
                    const hasMoreInfoError = role_config.more_info.flat().some((key: string) => errors[key]);

                    if (hasMoreInfoError) {
                        setCurrentStep(3);
                    }
                }
            },
        });
    };

    useEffect(() => {
        if (!role_config?.title) {
            router.get(route('register.student'));
        }
    }, []);

    const pageTitle = currentStep <= 2 ? `Register as ${role_config.title}` : (steps[currentStep - 1]?.title ?? '');

    return (
        <AuthLayout title={pageTitle} step={currentStep}>
            <Head title="Register" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">{steps[currentStep - 1]?.component}</div>

                <div className="mt-4 flex justify-end gap-2">
                    {currentStep === 1 ? (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.get(route('login'))}
                            className="rounded-full hover:bg-[#3ABEFF]/10"
                        >
                            <p className="hover:text-[#3ABEFF]">Login</p>
                        </Button>
                    ) : (
                        <Button type="button" variant="ghost" onClick={back} className="rounded-full hover:bg-[#3ABEFF]/10">
                            <p className="hover:text-[#3ABEFF]">Back</p>
                        </Button>
                    )}

                    <Button
                        type={currentStep === steps.length ? 'submit' : 'button'}
                        onClick={currentStep === steps.length ? undefined : next}
                        className="rounded-full bg-[#3ABEFF] hover:bg-[#3ABEFF]/90"
                    >
                        {currentStep === steps.length ? (
                            <>
                                {form.processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </>
                        ) : (
                            'Next'
                        )}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
