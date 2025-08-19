export interface RoleEnums {
    enums: {
        roles_enum: Record<string, number>;
    };
    [key: string]: any;
}

export interface RegisterFormProps {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    role_id: number;
};
