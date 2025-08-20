import { Head, InertiaFormProps, router } from '@inertiajs/react';
import { FormEventHandler, JSX, useState } from 'react';

import { Button } from '@/components/ui/button';
import { RegisterFormProps, RoleConfig } from '@/interfaces/shared';
import AuthLayout from '@/layouts/auth-layout';

interface StepsProps {
    title?: string | null;
    component: JSX.Element;
}

interface RegisterLayoutProps {
    steps: StepsProps[];
    role_config: RoleConfig;
    form: InertiaFormProps<Partial<RegisterFormProps>>;
}

export default function RegisterLayout({ steps, role_config, form }: RegisterLayoutProps) {
    const [currentStep, setCurrentStep] = useState(1);

    const next = () => setCurrentStep(currentStep + 1);
    const back = () => setCurrentStep(currentStep - 1);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('register.submit'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
            onError: (errors) => {
                if (role_config.basic_info.some((key) => errors[key]))
                    setCurrentStep(1);
                else if (role_config.credential_info.some((key) => errors[key]))
                    setCurrentStep(2);
                else if (role_config.more_info)
                {
                    const more_info = role_config.more_info;
                    more_info.forEach((info, idx) => {
                        if (info.some((key) => errors[key]))
                            setCurrentStep(2 + idx + 1);
                    });
                }
            }
        });
    };

    let title = 'Register as ';
    if (role_config.title) title += role_config.title;
    else router.get(route('register.student'));

    return (
        <AuthLayout title={currentStep <= 2 ? title : steps[currentStep - 1].title ?? ""} step={currentStep}>
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">{steps[currentStep - 1].component}</div>

                <div className="mt-4 flex justify-end gap-2">
                    {currentStep - 1 !== 0 && (
                        <Button type="button" variant="ghost" onClick={back} className="rounded-full">
                            Back
                        </Button>
                    )}

                    <Button type="button" onClick={currentStep === steps.length ? submit : next} className="rounded-full">
                        {currentStep === steps.length ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
