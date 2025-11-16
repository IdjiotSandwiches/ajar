import { useForm, usePage } from '@inertiajs/react';
import { Category, RoleConfig, RoleEnums, TeacherRegisterProps } from '@/interfaces/shared';
import RegisterLayout from '@/layouts/auth/auth-register-layout';
import { JSX } from 'react';
import FormInput from '../../../components/form-input';
import TeacherDetailForm from '@/components/register/teacher-detail-form';

export default function RegisterForm({ role, categories }: { role: number; categories: Category[] }) {
    const enums = usePage<RoleEnums>().props;
    const roles = enums.roles_enum;

    const base_config: RoleConfig = {
        basic_info: ['name', 'phone_number'],
        credential_info: ['email', 'password', 'password_confirmation'],
    };

    const role_config: Record<string, RoleConfig> = {
        [roles.Student]: base_config,
        [roles.Institute]: base_config,
        [roles.Teacher]: {
            basic_info: ['name', 'phone_number'],
            credential_info: ['email', 'password', 'password_confirmation'],
            more_info: [
                ['description'],
                ['category'],
                ['degree_title', 'university_name', 'degree_type'],
                ['position', 'institution', 'duration'],
                ['certificates'],
            ],
        },
    };

    const form = useForm<Partial<TeacherRegisterProps>>(
        role === roles.Teacher
            ? {
                name: '',
                email: '',
                phone_number: '',
                password: '',
                password_confirmation: '',
                role_id: role,
                category: null,
                certificates: [],
                description: '',
                graduates: [{ id: Date.now(), degree_title: '', university_name: '', degree_type: null }],
                works: [{ id: Date.now(), duration: 0, institution: '', position: '' }],
            }
            : {
                name: '',
                email: '',
                phone_number: '',
                password: '',
                password_confirmation: '',
                role_id: role,
            },
    );


    role_config[role].title = Object.keys(roles).find((key) => roles[key] === role);
    const steps: { title?: string; component: JSX.Element }[] = [
        {
            component: <FormInput form={form} content={role_config[role].basic_info} />,
        },
        {
            component: <FormInput form={form} content={role_config[role].credential_info} />,
        },
    ];

    console.log(form);


    if (role === roles.Teacher) {
        steps.push({
            title: "Detail Information",
            component: (
                <TeacherDetailForm
                    form={form}
                    categories={categories}
                    onNext={() => console.log("Next clicked")}
                />
            ),
        });
    }


    return <RegisterLayout form={form} role_config={role_config[role]} steps={steps} />;
}
