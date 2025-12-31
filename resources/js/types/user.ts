export interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    role_id: number;
    profile_picture?: string | null;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
    teacher?: any;
    uuid: any;
}
