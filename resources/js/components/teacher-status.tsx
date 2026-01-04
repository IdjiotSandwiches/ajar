import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type VerificationStatus = 'review' | 'verified' | 'rejected' | 'hidden';

export default function TeacherVerificationStatus() {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums.roles_enum;
    const isTeacher = user && user.role_id === roles.Teacher;

    const [status, setStatus] = useState<VerificationStatus>('review');
    const [rejectMessage, setRejectMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const channelName = `private-teacher.${user.id}`;
        const channel = window.Echo.private(`teacher.${user.id}`);

        channel.listen('.teacher.verified', () => {
            setStatus('verified');

            setTimeout(() => setStatus('hidden'), 1000);

            setTimeout(() => {
                router.visit(route('dashboard'), {
                    replace: true,
                    preserveScroll: true,
                });
            }, 1500);
        });

        channel.listen('.teacher.rejected', (e: any) => {
            setRejectMessage(e.reason ?? 'Your verification was rejected');
            setStatus('rejected');
        });

        return () => {
            window.Echo.leave(channelName);
        };
    }, [user]);

    if (!isTeacher || user?.teacher?.is_verified) return null;
    if (status === 'hidden') return null;

    return (
        <div className="fixed right-5 bottom-6 z-50 max-w-sm rounded-lg border bg-white px-4 py-3 shadow-lg transition-all duration-100 dark:border-white/20 dark:bg-[#222831] dark:shadow-white/20">
            <div className="flex items-start gap-2">
                <span
                    className={`mt-1 h-3 w-3 rounded-full ${
                        status === 'verified'
                            ? 'bg-green-500'
                            : status === 'rejected'
                            ? 'bg-red-500'
                            : 'animate-pulse bg-yellow-400'
                    }`}
                />

                <div className="text-sm">
                    {status === 'review' && 'Account under review'}

                    {status === 'verified' && 'Account verified'}

                    {status === 'rejected' && (
                        <div>
                            <p className="font-medium text-red-500">
                                Verification rejected
                            </p>
                            {rejectMessage && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-white/70">
                                    {rejectMessage}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
