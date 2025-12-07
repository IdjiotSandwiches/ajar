import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherApplicationsPage({ applications }: any) {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean>();
    const [teacher, setTeacher] = useState<number>();

    const handleAction = (type: boolean, id: number) => {
        setAction(type);
        setTeacher(id);
        setShowModal(true);
    };

    const confirmAction = () => {
        if (action) router.post(route('institute.accept-teacher', { id: teacher }));
        else router.post(route('institute.reject-teacher', { id: teacher }));
        setShowModal(false);
    };

    return (
        <>
            <Head title="Teacher Applications" />
            <div className="flex min-h-screen flex-col bg-[#f9fdfd] px-3 py-6 sm:px-6">
                <div className="mx-auto mt-4 w-full max-w-6xl rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:mt-10 sm:p-6 md:p-10">
                    <h1 className="mb-6 cursor-default text-center text-xl font-semibold text-[#42C2FF] sm:mb-10 sm:text-2xl">
                        Teacher Applications
                    </h1>
                    <div className="flex flex-col gap-4 md:hidden">
                        {applications.data.map((app: any) => {
                            const teacher = app?.teacher?.user;
                            const category = app?.teacher?.category;
                            return (
                                <div key={app.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div
                                        className="mb-3 flex cursor-pointer items-center gap-3"
                                        onClick={() => router.get(route('detail-teacher', app?.teacher_id))}
                                    >
                                        <img
                                            src={teacher?.profile_picture || 'https://placehold.co/400'}
                                            alt={teacher?.name}
                                            className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">{teacher?.name}</p>
                                            <p className="-mt-1 text-xs text-gray-500">{category?.name}</p>
                                        </div>
                                    </div>

                                    <p className="mb-2 text-sm text-gray-600">
                                        I applied to be a Teacher at Ajar, I am a specialist in <span className="font-medium">{category?.name}</span>
                                    </p>

                                    <p className="mb-3 text-xs text-gray-500">
                                        <span className="font-medium">Submitted:</span>{' '}
                                        {teacher?.email_verified_at
                                            ? new Date(teacher?.email_verified_at).toLocaleString('id-ID', {
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
                                            onClick={() => handleAction(true, app?.teacher_id)}
                                            className="rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleAction(false, app?.teacher_id)}
                                            className="rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full rounded-lg border border-gray-200 text-sm text-gray-700">
                            <thead className="border-b border-gray-200 bg-[#42C2FF]/10">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">Teacher Applications</th>
                                    <th className="w-32 px-4 py-3 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.data.map((app: any, index: number) => {
                                    const teacher = app?.teacher?.user;
                                    const category = app?.teacher?.category;
                                    return (
                                        <tr
                                            key={app.id}
                                            className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'}`}
                                        >
                                            <td className="px-4 py-4">
                                                <div
                                                    className="flex cursor-pointer items-start gap-4"
                                                    onClick={() => router.get(route('detail-teacher', app?.teacher_id))}
                                                >
                                                    <img
                                                        src={teacher?.profile_picture || 'https://placehold.co/400'}
                                                        alt={teacher?.name}
                                                        className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{teacher?.name}</p>
                                                        <p className="mb-1 text-sm text-gray-600">
                                                            I applied to be a Teacher at Ajar, I am a specialist in{' '}
                                                            <span className="font-medium">{category?.name}</span>
                                                        </p>
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-medium">Category:</span> {category?.name}
                                                        </p>
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-medium">Submitted:</span>{' '}
                                                            {teacher?.email_verified_at
                                                                ? new Date(teacher?.email_verified_at).toLocaleString('id-ID', {
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
                                                        onClick={() => handleAction(true, app?.teacher_id)}
                                                        className="rounded-md bg-[#42C2FF] p-2 text-white shadow-sm transition hover:bg-[#42C2FF]/90"
                                                    >
                                                        <Check size={16} strokeWidth={2.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(false, app?.teacher_id)}
                                                        className="rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm transition hover:bg-[#E04343]"
                                                    >
                                                        <X size={16} strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={applications.links} />
                </div>
                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmAction}
                    description={`Are you sure you want to ${action ? 'accept' : 'reject'} ${applications.data?.find((x: any) => x.teacher_id == teacher)?.teacher?.user?.name}'s application?`}
                />
            </div>
        </>
    );
}

TeacherApplicationsPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
