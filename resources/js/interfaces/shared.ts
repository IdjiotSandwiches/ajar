// export interface RoleEnums {
//     enums: {
//         roles_enum: Record<string, number>;
//     };
//     [key: string]: any;
// }

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
    duration: number;
    institution: string;
    position: string;
}

export interface CertificateProps {
    image: File | string;
}

export interface TeacherRegisterProps extends RegisterFormProps {
    description: string | number;
    category: number | null;
    graduates: any[];
    works: any[];
    certificates: File[] | string[];
    image?: File[] | string[];
}

export interface Category {
    id: number;
    name: string;
    parent_id?: number | null;
    children?: Category[];
}

export interface LearnObjProps {
    id: number;
    description: string;
    course_id?: number;
}

export interface BenefitStudentProps {
    id: number;
    description: string;
    course_id?: number;
}

export interface BenefitTeacherProps {
    id: number;
    description: string;
    course_id?: number;
}

export interface CourseOverviewProps {
    id: number;
    description: string;
    course_id?: number;
}

export interface ProgrammingLanguageProps {
    id: number;
    programming_language: string;
}

export interface CourseSkillProps {
  id: number;
  course_id: number;
  skill_id: number;
  course?: CourseData;
  skill?: SkillProps;
}


export interface CourseData {
    [key: string]: any;
    id?: number
    name: string;
    description: string;
    price: number;
    duration: number;
    discount?: number;

    category: number | null;

    learning_objectives?: LearnObjProps[];
    benefit_for_students?: BenefitStudentProps[];
    benefit_for_teachers?: BenefitTeacherProps[];
    course_overviews?: CourseOverviewProps[];
    course_skills?: SkillProps[];

    course_images?: (File | string)[];

    teacher?: TeacherRegisterProps[];
    institution?: string | InstitutionData | null;

    ratings?: number[];
    reviews?: string[];

    teacher_salary: number;
}

export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    description: string;
}

export interface InstitutionData {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  rating: number;
  totalCourses: number;
  totalTeachers: number;
  category: string;
  location: string;
  contactEmail: string;
  reviews?: string[];
}
