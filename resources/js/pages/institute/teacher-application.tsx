import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
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
            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden text-2xl font-semibold text-gray-800 md:flex">Teacher Applications</h1>
                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">Applications</h3>
                    <div className="flex flex-col gap-4 md:hidden">
                        {applications.data.map((app: any) => {
                            const teacher = app?.teacher?.user;
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
                                        <p className="font-semibold text-gray-800">{teacher?.name}</p>
                                    </div>
                                    <p className="mb-2 text-sm text-gray-600">I applied to be a Teacher.</p>
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
                                            className="cursor-pointer rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleAction(false, app?.teacher_id)}
                                            className="cursor-pointer rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b border-gray-200 bg-[#42C2FF]/10">
                                <tr>
                                    <th className="p-1 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Teacher Applications</th>
                                    <th className="w-32 px-3 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.data.map((app: any, index: number) => {
                                    const teacher = app?.teacher?.user;
                                    return (
                                        <tr
                                            key={app.id}
                                            className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'}`}
                                        >
                                            <td className="p-1 text-center">{index + 1}</td>
                                            <td className="p-3">
                                                <div
                                                    className="flex cursor-pointer items-center gap-4"
                                                    onClick={() => router.get(route('detail-teacher', app?.teacher_id))}
                                                >
                                                    <img
                                                        src={teacher?.profile_picture || 'https://placehold.co/400'}
                                                        alt={teacher?.name}
                                                        className="h-16 w-16 rounded-full border border-gray-300 object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{teacher?.name}</p>
                                                        <p className="mb-1 text-sm text-gray-600">I applied to be a Teacher.</p>
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
                                            <td className="p-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAction(true, app?.teacher_id)}
                                                        className="cursor-pointer rounded-md bg-[#42C2FF] p-2 text-white shadow-sm transition hover:bg-[#42C2FF]/90"
                                                    >
                                                        <Check size={16} strokeWidth={2.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(false, app?.teacher_id)}
                                                        className="cursor-pointer rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm transition hover:bg-[#E04343]"
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

TeacherApplicationsPage.layout = (page: React.ReactNode) => <LMSLayout title="Teacher Applications">{page}</LMSLayout>;
