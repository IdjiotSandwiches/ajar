import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, title, step, ...props }: { children: React.ReactNode; title: string; step?: number }) {
    return (
        <AuthLayoutTemplate title={title} step={step} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
