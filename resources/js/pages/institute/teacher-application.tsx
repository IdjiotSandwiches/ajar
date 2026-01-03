import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
import { router } from '@inertiajs/react';
import { Check, UserPlus, X } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherApplicationsPage({ applications }: any) {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean>();
    const [teacher, setTeacher] = useState<number>();

    const hasApplications = applications?.data && applications.data.length > 0;

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
            <div className="flex min-h-screen flex-col gap-6">
                <div className="mx-auto w-full rounded-2xl border p-4 shadow-sm backdrop-blur-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                    <h3 className="mb-6 text-xl font-semibold">Applications</h3>
                    <div className="flex flex-col gap-4 lg:hidden">
                        {!hasApplications && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <UserPlus className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
                                <p className="text-base font-semibold text-gray-700 dark:text-white">
                                    No teacher applications yet
                                </p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-white/70">
                                    There are currently no teacher applications to review.
                                </p>
                            </div>
                        )}
                        {hasApplications &&
                            applications.data.map((app: any) => {
                                const teacher = app?.teacher?.user;
                                return (
                                    <div key={app.id} className="rounded-xl border p-4 shadow-sm dark:border-white/20 dark:shadow-white/20">
                                        <div
                                            className="mb-3 flex cursor-pointer items-center gap-3"
                                            onClick={() => router.get(route('detail-teacher', app?.teacher_id))}
                                        >
                                            <img
                                                src={storageUrl(teacher?.profile_picture)}
                                                alt={teacher?.name}
                                                className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                                            />
                                            <p className="font-semibold text-gray-800 dark:text-white">{teacher?.name}</p>
                                        </div>
                                        <p className="mb-2 text-sm text-gray-600 dark:text-white/80">I applied to be a Teacher at Ajar.</p>
                                        <p className="mb-3 text-xs text-gray-500 dark:text-white/70">
                                            <span className="font-medium">Submitted:</span>{' '}
                                            {teacher?.created_at
                                                ? new Date(teacher?.created_at).toLocaleString('id-ID', {
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
                    <div className="hidden overflow-x-auto rounded-lg border shadow-sm lg:block dark:border-white/20 dark:shadow-white/20">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10 dark:text-white">
                                <tr>
                                    <th className="p-1 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Teacher Applications</th>
                                    <th className="w-32 px-3 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!hasApplications && (
                                    <tr>
                                        <td colSpan={3} className="p-6 text-center text-sm text-gray-500 dark:text-white/70">
                                            No teacher applications yet.
                                        </td>
                                    </tr>
                                )}
                                {hasApplications &&
                                    applications.data.map((app: any, index: number) => {
                                        const teacher = app?.teacher?.user;
                                        return (
                                            <tr
                                                key={app.id}
                                                className={`border-b transition hover:bg-[#3ABEFF]/10 ${index % 2 === 0 ? 'bg-[#F9FCFF] dark:bg-[#31363F]' : 'bg-white dark:bg-[#222831]'
                                                    }`}
                                            >
                                                <td className="p-1 text-center dark:text-white">{index + 1}</td>
                                                <td className="p-3">
                                                    <div
                                                        className="flex cursor-pointer items-center gap-4"
                                                        onClick={() => router.get(route('detail-teacher', app?.teacher_id))}
                                                    >
                                                        <img
                                                            src={storageUrl(teacher?.profile_picture)}
                                                            alt={teacher?.name}
                                                            className="h-16 w-16 rounded-full border border-gray-300 object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-800 dark:text-white">{teacher?.name}</p>
                                                            <p className="mb-1 text-sm text-gray-600 dark:text-white/80">
                                                                I applied to be a Teacher at Ajar.
                                                            </p>
                                                            <p className="text-sm text-gray-700 dark:text-white/90">
                                                                <span className="font-medium">Submitted:</span>{' '}
                                                                {teacher?.created_at
                                                                    ? new Date(teacher?.created_at).toLocaleString('id-ID', {
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
