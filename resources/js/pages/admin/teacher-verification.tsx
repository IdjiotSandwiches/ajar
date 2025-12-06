import DynamicModal from '@/components/modal/modal';
import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherVerificationsPage({ verifications }: any) {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean>();
    const [teacher, setTeacher] = useState<number>();

    const handleAction = (type: boolean, id: number) => {
        setAction(type);
        setTeacher(id);
        setShowModal(true);
    };

    const confirmAction = () => {
        if (action)
            router.post(route("admin.accept-teacher", { id: teacher }));
        else
            router.post(route("admin.reject-teacher", { id: teacher }));

        setShowModal(false);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f9fdfd] px-3 py-6 sm:px-6">
            <div className="mx-auto mt-4 w-full max-w-6xl rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:mt-10 sm:p-6 md:p-10">
                <h1 className="mb-6 cursor-default text-center text-xl font-semibold text-[#42C2FF] sm:mb-10 sm:text-2xl">Teacher Verifications</h1>
                <div className="flex flex-col gap-4 md:hidden">
                    {verifications.data.map((app: any) => (
                        <div key={app.user_id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="mb-3 flex items-center gap-3 cursor-pointer" onClick={() => router.get(route('detail-teacher', app?.user_id))}>
                                <img
                                    src={app?.user?.profile_picture || 'https://placehold.co/400'}
                                    alt={app?.user?.name}
                                    className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{app?.user?.name}</p>
                                    <p className="-mt-1 text-xs text-gray-500">{app?.category?.name}</p>
                                </div>
                            </div>

                            <p className="mb-2 text-sm text-gray-600">
                                I applied to be a Teacher at Ajar, I am a specialist in <span className="font-medium">{app?.category?.name}</span>
                            </p>

                            <p className="mb-3 text-xs text-gray-500">
                                <span className="font-medium">Submitted:</span>{' '}
                                {app?.user?.email_verified_at
                                    ? new Date(app.user.email_verified_at).toLocaleString('id-ID', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                      })
                                    : '-'}
                            </p>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleAction(true, app?.user_id)}
                                    className="rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    onClick={() => handleAction(false, app?.user_id)}
                                    className="rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hidden overflow-x-auto md:block">
                    <table className="min-w-full rounded-lg border border-gray-200 text-sm text-gray-700">
                        <thead className="border-b border-gray-200 bg-[#42C2FF]/10">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Teacher Verifications</th>
                                <th className="w-32 px-4 py-3 text-center font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {verifications.data.map((app: any, index: number) => (
                                <tr
                                    key={app.user_id}
                                    className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'}`}
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-start gap-4 cursor-pointer" onClick={() => router.get(route('detail-teacher', app?.user_id))}>
                                            <img
                                                src={app?.user?.profile_picture || 'https://placehold.co/400'}
                                                alt={app?.user?.name}
                                                className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{app?.user?.name}</p>
                                                <p className="mb-1 text-sm text-gray-600">
                                                    I applied to be a Teacher at Ajar, I am a specialist in{' '}
                                                    <span className="font-medium">{app?.category?.name}</span>
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Category:</span> {app?.category?.name}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Submitted:</span>{' '}
                                                    {app?.user?.email_verified_at
                                                        ? new Date(app.user.email_verified_at).toLocaleString('id-ID', {
                                                              day: '2-digit',
                                                              month: 'short',
                                                              year: 'numeric',
                                                              hour: '2-digit',
                                                              minute: '2-digit',
                                                          })
                                                        : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleAction(true, app?.user_id)}
                                                className="rounded-md bg-[#42C2FF] p-2 text-white shadow-sm transition hover:bg-[#42C2FF]/90"
                                            >
                                                <Check size={16} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(false, app?.user_id)}
                                                className="rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm transition hover:bg-[#E04343]"
                                            >
                                                <X size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex items-center justify-center gap-1 select-none">
                    {verifications.links.map((link: any, index: number) => {
                        const isActive = link.active;
                        const isDisabled = !link.url;

                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-md border px-3 py-1 text-sm transition ${isActive ? 'border-[#42C2FF] bg-[#42C2FF] text-white' : 'bg-white'} ${isDisabled ? 'cursor-default opacity-40' : 'hover:bg-gray-100'} `}
                            />
                        );
                    })}
                </div>
            </div>

            <DynamicModal
                type="confirmation"
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmAction}
                description={`Are you sure you want to ${action ? 'accept' : 'reject'} ${verifications.data?.find((x: any) => x.user_id == teacher)?.user?.name}'s application?`}
            />
        </div>
    );
}

TeacherVerificationsPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
