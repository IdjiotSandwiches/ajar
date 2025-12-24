import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseTeacherApplicationsPage({ applications }: any) {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean>();
    const [selectedId, setSelectedId] = useState<number>();

    const handleAction = (type: boolean, id: number) => {
        setAction(type);
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmAction = () => {
        if (action) router.post(route('institute.accept-course', { id: selectedId }));
        else router.post(route('institute.reject-course', { id: selectedId }));
        setShowModal(false);
    };

    const hasApplications = applications?.data && applications.data.length > 0;

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <div className="mx-auto w-full border dark:border-white/20 rounded-2xl p-4 lg:p-8 shadow-sm dark:shadow-white/20">
                    <h3 className="mb-6 text-xl font-semibold">Applications to Teach Courses</h3>

                    <div className="flex flex-col gap-4 lg:hidden">
                        {!hasApplications && (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="flex p-6 text-center justify-center text-sm text-gray-500 dark:text-white/70"
                                >
                                    No course's teacher applications available.
                                </td>
                            </tr>
                        )}
                        {hasApplications && applications.data.map((app: any) => (
                            <div key={app.id} className="rounded-xl border dark:border-white/20 p-4 shadow-sm dark:shadow-white/20">
                                <div className="mb-3 flex items-center gap-3">
                                    <img
                                        src={app.teacher.profile_picture || 'https://placehold.co/400'}
                                        alt={app.teacher.name}
                                        className="h-12 w-12 rounded-full border object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{app.teacher.name}</p>
                                    </div>
                                </div>

                                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-white/80">Saya ingin mengajar di kursus ini</p>

                                <div className="mb-3 flex items-center gap-3 rounded-lg border dark:border-white/20 p-3">
                                    <img
                                        src={app.course.image || 'https://placehold.co/400'}
                                        alt={app.course.name}
                                        className="h-10 w-10 rounded-md object-cover"
                                    />
                                    <p className="text-sm font-medium text-gray-700 dark:text-white/90">{app.course.name}</p>
                                </div>

                                <p className="mb-3 text-xs text-gray-500 dark:text-white/70">
                                    Submitted:{' '}
                                    {new Date(app.created_at).toLocaleString('id-ID', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => handleAction(true, app.id)}
                                        className="cursor-pointer rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                    >
                                        <Check size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleAction(false, app.id)}
                                        className="cursor-pointer rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden overflow-x-auto rounded-lg border dark:border-white/20 shadow-sm dark:shadow-white/20 lg:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10 dark:text-white">
                                <tr>
                                    <th className="p-1 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Teacher</th>
                                    <th className="p-3 text-left font-semibold">Course</th>
                                    <th className="p-3 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!hasApplications && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="p-6 text-center text-sm text-gray-500 dark:text-white/70"
                                        >
                                            No course's teacher applications available.
                                        </td>
                                    </tr>
                                )}
                                {hasApplications && applications.data.map((app: any, index: number) => (
                                    <tr
                                        key={app.id}
                                        className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0
                                            ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                            : 'bg-white dark:bg-[#222831]'}`}
                                    >
                                        <td className="p-1 text-center dark:text-white">{applications.from + index}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={app.teacher.profile_picture || 'https://placehold.co/400'}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{app.teacher.name}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img src={app.course.image} className="h-10 w-10 rounded-md object-cover" />
                                                <span className="font-medium dark:text-white">{app.course.name}</span>
                                            </div>
                                        </td>

                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleAction(true, app.id)}
                                                    className="cursor-pointer rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                                >
                                                    <Check size={16} strokeWidth={2.5} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(false, app.id)}
                                                    className="cursor-pointer rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
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

                    <Pagination links={applications.links} />
                </div>

                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmAction}
                    description={`Are you sure you want to ${action ? 'accept' : 'reject'} this course teacher application?`}
                />
            </div>
        </>
    );
}

CourseTeacherApplicationsPage.layout = (page: React.ReactNode) => <LMSLayout title="Course Teacher Applications">{page}</LMSLayout>;
