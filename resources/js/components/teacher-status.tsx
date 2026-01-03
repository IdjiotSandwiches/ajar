import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function TeacherVerificationStatus() {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums.roles_enum;
    const isTeacher = user && user.role_id === roles.Teacher;

    if (!isTeacher || user?.teacher?.is_verified) return null;
    const [status, setStatus] = useState<'review' | 'verified' | 'hidden'>('review');

    useEffect(() => {
        if (!user) return;

        const channel = window.Echo.private(`teacher.${user.id}`);

        channel.listen('.teacher.verified', (e: any) => {
            if (!e.isVerified) return;
            setStatus('verified');
            setTimeout(() => {
                setStatus('hidden');
            }, 1000);

            setTimeout(() => {
                router.visit(route('dashboard'), {
                    replace: true,
                    preserveScroll: true,
                });
            }, 1500);
        });

        return () => {
            channel.stopListening('.teacher.verified');
        };
    }, []);

    if (status === 'hidden') return null;

    return (
        <div className="fixed right-5 bottom-6 z-50 rounded-lg border bg-white px-4 py-3 shadow-lg transition-all duration-500">
            <div className="flex items-center gap-2">
                <span
                    className={`h-3 w-3 rounded-full ${
                        status === 'verified'
                            ? 'bg-green-500'
                            : 'animate-pulse bg-yellow-400'
                    }`}
                />
                <span className="text-sm">
                    {status === 'verified'
                        ? 'Account verified'
                        : 'Account under review'}
                </span>
            </div>
        </div>
    );
}
