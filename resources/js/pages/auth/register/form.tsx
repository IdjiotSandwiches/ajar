import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { RegisterFormProps, RoleEnums } from '@/interfaces/shared';
import AuthLayout from '@/layouts/auth-layout';
import FormInput from './form-input';

interface RoleConfig {
    title: string;
    basic_info: Array<keyof RegisterFormProps>;
    credential_info: Array<keyof RegisterFormProps>;
}

export default function RegisterForm({ role }: { role: number }) {
    const [currentStep, setCurrentStep] = useState(1);

    const next = () => setCurrentStep(currentStep + 1);
    const back = () => setCurrentStep(currentStep - 1);

    const enums = usePage<RoleEnums>().props;
    const roles = enums.roles_enum;

    const form = useForm<Required<RegisterFormProps>>({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        role_id: role,
    });

    let title = 'Register as ';
    const roleConfig: Record<string, RoleConfig> = {
        [roles.Student]: {
            title: 'Student',
            basic_info: ['name', 'phone_number'],
            credential_info: ['email', 'password', 'password_confirmation'],
        },
        [roles.Teacher]: {
            title: 'Teacher',
            basic_info: ['name', 'phone_number'],
            credential_info: ['email', 'password', 'password_confirmation'],
        },
        [roles.Institute]: {
            title: 'Institute',
            basic_info: ['name', 'phone_number'],
            credential_info: ['email', 'password', 'password_confirmation'],
        },
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        form.post(route('register.submit'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
            onError: (errors) => {
                if (roleConfig[role].basic_info.some((key) => errors[key]))
                    setCurrentStep(1);
            }
        });
    };

    if (roleConfig[role]) title += roleConfig[role].title;
    else router.get(route('register.student'));

    const steps = [
        <FormInput form={form} content={roleConfig[role].basic_info} />,
        <FormInput form={form} content={roleConfig[role].credential_info} />
    ];

    return (
        <AuthLayout title={title}>
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">{steps[currentStep - 1]}</div>

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
