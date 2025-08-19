import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { RoleEnums } from '@/interfaces/shared';
import AuthLayout from '@/layouts/auth-layout';
import MultiStepForm from '@/layouts/auth/auth-multistep';
import ErrorWatcher from '@/layouts/auth/auth-register-watcher';

interface RegisterFormProps {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    role_id: number;
}

export default function Register() {
    const [currentStep, setCurrentStep] = useState(0);

    const enums = usePage<RoleEnums>().props;
    const roles = enums.roles_enum;

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterFormProps>>({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        role_id: roles.Institute,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register.submit'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const steps = [
        <>
            <div className="grid">
                <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Name"
                />
                <InputError message={errors.name} />
            </div>
            <div className="grid">
                <Input
                    id="phone_number"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="phone_number"
                    value={data.phone_number}
                    onChange={(e) => setData('phone_number', e.target.value)}
                    disabled={processing}
                    placeholder="Phone Number"
                />
                <InputError message={errors.phone_number} />
            </div>
        </>,
        <>
            <div className="grid">
                <Input
                    id="email"
                    type="email"
                    required
                    tabIndex={2}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="Email"
                />
                <InputError message={errors.email} />
            </div>

            <div className="grid">
                <Input
                    id="password"
                    type="password"
                    required
                    tabIndex={3}
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    disabled={processing}
                    placeholder="Password"
                />
                <InputError message={errors.password} />
            </div>

            <div className="grid">
                <Input
                    id="password_confirmation"
                    type="password"
                    required
                    tabIndex={4}
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    disabled={processing}
                    placeholder="Confirm password"
                />
                <InputError message={errors.password_confirmation} />
            </div>
        </>,
    ];

    return (
        <AuthLayout title="Register as Institute">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <ErrorWatcher
                    errors={errors}
                    steps={[
                        ['name', 'phone_number'],
                        ['email', 'password', 'password_confirmation'],
                    ]}
                    onError={(step) => setCurrentStep(step)}
                />
                <MultiStepForm steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} onFinish={submit} />
            </form>
        </AuthLayout>
    );
}
