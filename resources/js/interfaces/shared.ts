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
    id?: number;
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

export interface CertificateProps {
    image: File | string;
}

export interface TeacherRegisterProps extends RegisterFormProps {
    description: string;
    category: number | null;
    graduates: any[];
    works: any[];
    certificates: File[];
    image?: File[];
}

export interface Category {
    id: number;
    name: string;
    parent_id?: number | null;
    children?: Category[];
}

export interface LearnObjProps {
    id: number;
    learning_objective: string;
}

export interface BenefitStudentProps {
    id: number;
    benefit_for_students: string;
}

export interface BenefitTeacherProps {
    id: number;
    benefit_for_teachers: string;
}

export interface CourseOverviewProps {
    id: number;
    course_overview: string;
}

export interface ProgrammingLanguageProps {
    id: number;
    programming_language: string;
}

export interface CourseData {
    [key: string]: any;
    title: string;
    description: string;
    parent_category: string;
    category: string[] | null;
    learning_objectives: LearnObjProps[];
    benefit_for_students: BenefitStudentProps[];
    benefit_for_teachers: BenefitTeacherProps[];
    course_overviews: CourseOverviewProps[];
    programming_language: ProgrammingLanguageProps[];
    duration: number;
    price_for_student: number;
    discount: number;
    teacher_salary: number;
    course_images: File[] | string[];
    teacher?: TeacherRegisterProps[];
    institution?: string;
    ratings?: number[];
    reviews?: string[];
}

export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    description: string;
}
