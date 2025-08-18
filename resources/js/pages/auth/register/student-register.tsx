import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import MultiStepForm from '@/layouts/auth/auth-multistep';

interface RegisterFormProps {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    role_id: number;
}

interface PageProps {
    enums: {
        roles_enum: Record<string, number>;
    };
    [key: string]: any;
}

export default function Register() {
    const enums = usePage<PageProps>().props;
    const roles = enums.roles_enum;

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterFormProps>>({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        role_id: roles.Student,
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
        <AuthLayout title="Register as Student">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="">
                    <MultiStepForm
                        steps={steps}
                        onFinish={submit}
                        errors={errors}
                        stepFields={[
                            ['name', 'phone_number'],
                            ['email', 'password', 'password_confirmation'],
                        ]}
                    />
                </div>
            </form>
        </AuthLayout>
    );
}
