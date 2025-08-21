export interface RoleEnums {
    enums: {
        roles_enum: Record<string, number>;
    };
    [key: string]: any;
}

export interface DegreeTypeEnums {
    enums: {
        degree_type_enum: Record<string, number>;
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
}

export interface RoleConfig {
    title?: string | null | undefined;
    basic_info: Array<keyof RegisterFormProps>;
    credential_info: Array<keyof RegisterFormProps>;
    more_info?: Array<keyof TeacherRegisterProps | keyof GraduateProps | keyof WorkProps>[];
}

export interface GraduateProps {
    id: number;
    degree_title: string;
    university_name: string;
    degree_type: number | null;
}

export interface WorkProps {
    id: number;
    position: string;
    institution: string;
    duration: number;
}

export interface TeacherRegisterProps {
    description: string;
    category: number | null;
    graduates: any[];
    works: any[];
    certificates: File[];
}

export interface Category {
    id: number;
    name: string;
    parent_id?: number | null;
    children?: Category[];
}
