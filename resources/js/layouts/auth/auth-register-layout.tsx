import { Head, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { LoaderCircle } from 'lucide-react';

export default function RegisterLayout({ steps, role_config, form }: any) {
    const [currentStep, setCurrentStep] = useState(1);

    const next = () => setCurrentStep(currentStep + 1);
    const back = () => setCurrentStep(currentStep - 1);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('register.submit'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
            onError: (errors: any) => {
                if (role_config.basic_info.some((key: any) => errors[key])) setCurrentStep(1);
                else if (role_config.credential_info.some((key: any) => errors[key])) setCurrentStep(2);
                else if (role_config.more_info) {
                    const more_info = role_config.more_info;
                    more_info.forEach((info: any, idx: number) => {
                        if (info.some((key: any) => errors[key])) setCurrentStep(2 + idx + 1);
                    });
                }
            },
        });
    };

    let title = 'Register as ';
    if (role_config.title) title += role_config.title;
    else router.get(route('register.student'));

    return (
        <AuthLayout title={currentStep <= 2 ? title : (steps[currentStep - 1].title ?? '')} step={currentStep}>
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">{steps[currentStep - 1].component}</div>

                <div className="mt-4 flex justify-end gap-2">
                    {/* {currentStep - 1 !== 0 && (
                        <Button type="button" variant="ghost" onClick={back} className="rounded-full hover:bg-[#3ABEFF]/10">
                            <p className="hover:text-[#3ABEFF]">Back</p>
                        </Button>
                    )} */}
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
                        type="button"
                        onClick={currentStep === steps.length ? submit : next}
                        className="rounded-full bg-[#3ABEFF] hover:bg-[#3ABEFF]/90"
                    >
                        {currentStep === steps.length ? (
                            <>
                                {form.processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
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
