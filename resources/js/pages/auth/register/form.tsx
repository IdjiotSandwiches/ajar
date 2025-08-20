import { useForm, usePage } from '@inertiajs/react';

import { Category, RegisterFormProps, RoleConfig, RoleEnums, TeacherRegisterProps } from '@/interfaces/shared';
import RegisterLayout from '@/layouts/auth/auth-register-layout';
import { useState } from 'react';
import CategoryForm from './category';
import FormInput from './form-input';

export default function RegisterForm({ role, categories }: { role: number; categories: Category[] }) {
    const [isFilled, setIsFilled] = useState<Boolean>(false);

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
                // ['description'],
                ['category'],
                ['degree_title', 'university_name', 'degree_type_id'],
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
                  graduates: [],
                  works: [],
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
    const steps = [
        <FormInput form={form} content={role_config[role].basic_info} />,
        <FormInput form={form} content={role_config[role].credential_info} />,
    ];

    if (role === roles.Teacher) {
        const more_steps = [<CategoryForm categories={categories} form={form} />];
        steps.push(...more_steps);
    }

    console.log(form);

    return <RegisterLayout form={form} role_config={role_config[role]} steps={steps} />;
}
