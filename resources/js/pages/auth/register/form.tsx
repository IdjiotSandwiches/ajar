import FormInput from '@/components/form-input';
import TeacherDetailForm from '@/components/register/teacher-detail-form';
import RegisterLayout from '@/layouts/auth/auth-register-layout';
import { useForm, usePage } from '@inertiajs/react';
import { JSX } from 'react';

export default function RegisterForm({ role, categories }: any) {
    const { props } = usePage();
    const roles = props.enums?.roles_enum;

    const baseConfig = {
        basic_info: ['name', 'phone_number'],
        credential_info: ['email', 'password', 'password_confirmation'],
    };

    const roleConfig: Record<string, any> = {
        [roles.Student]: baseConfig,
        [roles.Institute]: baseConfig,
        [roles.Teacher]: {
            ...baseConfig,
            more_info: [
                ['description'],
                ['category'],
                ['degree_title', 'university_name', 'degree_type'],
                ['position', 'institution', 'duration'],
                ['certificates'],
            ],
        },
    };

    const form = useForm<any>({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        role_id: role,

        ...(role === roles.Teacher && {
            certificates: [],
            description: '',
            graduates: [{ id: Date.now(), degree_title: '', university_name: '', degree_type: null }],
            works: [{ id: Date.now(), duration: 0, institution: '', position: '' }],
        }),
    });

    roleConfig[role].title = Object.keys(roles).find((key) => roles[key] === role);

    const steps: { title?: string; component: JSX.Element }[] = [
        {
            component: <FormInput form={form} content={roleConfig[role].basic_info} />,
        },
        {
            component: <FormInput form={form} content={roleConfig[role].credential_info} />,
        },
    ];

    if (role === roles.Teacher) {
        steps.push({
            title: 'Detail Information',
            component: <TeacherDetailForm form={form} categories={categories} />,
        });
    }

    return <RegisterLayout form={form} role_config={roleConfig[role]} steps={steps} />;
}
