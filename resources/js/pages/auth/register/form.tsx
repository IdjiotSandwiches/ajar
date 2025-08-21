import { useForm, usePage } from '@inertiajs/react';

import { Textarea } from '@/components/ui/textarea';
import { Category, GraduateProps, RegisterFormProps, RoleConfig, RoleEnums, TeacherRegisterProps, WorkProps } from '@/interfaces/shared';
import RegisterLayout from '@/layouts/auth/auth-register-layout';
import { JSX } from 'react';
import CategoryForm from '../../../components/register/category';
import FormInput from '../../../components/register/form-input';
import GraduateForm from '../../../components/register/graduate';
import WorkForm from '../../../components/register/work';

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
            basic_info: ['email', 'password', 'password_confirmation'],
            credential_info: ['name', 'phone_number'],
            more_info: [
                ['description'],
                ['category'],
                ['degree_title', 'university_name', 'degree_type'],
                ['position', 'institution', 'duration'],
                ['certificates'],
            ],
        },
    };

    const form = useForm<Partial<RegisterFormProps & TeacherRegisterProps>>(
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
                  graduates: [{ id: Date.now(), degree_title: '', university_name: '', degree_type: null }] as GraduateProps[],
                  works: [{ id: Date.now(), duration: 0, institution: '', position: '' }] as WorkProps[],
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

    if (role === roles.Teacher) {
        const more_steps: { title: string; component: JSX.Element }[] = [
            {
                title: 'Tell us a bit about yourself',
                component: (
                    <Textarea
                        id="description"
                        autoFocus
                        tabIndex={1}
                        autoComplete="description"
                        value={form.data.description}
                        onChange={(e) => form.setData('description', e.target.value)}
                        disabled={form.processing}
                        placeholder="Description"
                    />
                ),
            },
            {
                title: 'Your preferred category?',
                component: <CategoryForm categories={categories} form={form} />,
            },
            {
                title: 'Tell us about your graduation',
                component: <GraduateForm form={form} />,
            },
            {
                title: 'Do you have any work experience?',
                component: <WorkForm form={form} />
            },
            {
                title: 'Certificates',
                component: <></>
            }
        ];
        steps.push(...more_steps);
    }

    return <RegisterLayout form={form} role_config={role_config[role]} steps={steps} />;
}
