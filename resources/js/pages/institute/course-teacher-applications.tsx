import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseTeacherApplicationsPage({ applications }: any) {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    console.log(applications);

    const handleAction = (type: boolean, id: number) => {
        setAction(type);
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmAction = () => {
        console.log(
            `${action ? 'ACCEPT' : 'REJECT'} application ID:`,
            selectedId
        );
        setShowModal(false);
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Course Teacher Applications
                </h1>

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">
                        Applications to Teach Courses
                    </h3>

                    {/* ================= MOBILE ================= */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {applications.data.map((app: any) => (
                            <div
                                key={app.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                {/* Teacher */}
                                <div className="mb-3 flex items-center gap-3">
                                    <img
                                        src={app.teacher.user.profile_picture}
                                        alt={app.teacher.user.name}
                                        className="h-12 w-12 rounded-full border object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {app.teacher.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {app.teacher.category.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Course */}
                                <div className="mb-3 flex items-center gap-3 rounded-lg bg-[#F9FCFF] p-3">
                                    <img
                                        src={app.course.image}
                                        alt={app.course.name}
                                        className="h-10 w-10 rounded-md object-cover"
                                    />
                                    <p className="text-sm font-medium text-gray-700">
                                        {app.course.name}
                                    </p>
                                </div>

                                <p className="mb-3 text-xs text-gray-500">
                                    Submitted:{' '}
                                    {new Date(app.created_at).toLocaleString(
                                        'id-ID',
                                        {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }
                                    )}
                                </p>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() =>
                                            handleAction(true, app.id)
                                        }
                                        className="rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                    >
                                        <Check size={16} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleAction(false, app.id)
                                        }
                                        className="rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ================= DESKTOP ================= */}
                    <div className="hidden overflow-x-auto md:block rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#42C2FF]/10">
                                <tr>
                                    <th className="p-1 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">
                                        Teacher
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Course
                                    </th>
                                    <th className="p-3 text-center font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {applications.data.map((app: any, index: number) => (
                                    <tr
                                        key={app.id}
                                        className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0
                                                ? 'bg-[#f9fcff]'
                                                : 'bg-white'
                                            }`}
                                    >
                                        <td className="p-1 text-center">{index + 1}</td>
                                        {/* Teacher */}
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        app.teacher.user
                                                            .profile_picture
                                                    }
                                                    className="h-12 w-12 rounded-full border object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {
                                                            app.teacher.user
                                                                .name
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {
                                                            app.teacher.category
                                                                .name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Course */}
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={app.course.image}
                                                    className="h-10 w-10 rounded-md object-cover"
                                                />
                                                <span className="font-medium">
                                                    {app.course.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Action */}
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            true,
                                                            app.id
                                                        )
                                                    }
                                                    className="rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90"
                                                >
                                                    <Check
                                                        size={16}
                                                        strokeWidth={2.5}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            false,
                                                            app.id
                                                        )
                                                    }
                                                    className="rounded-md bg-[#FF5C5C] p-2 text-white shadow-sm hover:bg-[#E04343]"
                                                >
                                                    <X
                                                        size={16}
                                                        strokeWidth={2.5}
                                                    />
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
                    description={`Are you sure you want to ${action ? 'accept' : 'reject'
                        } this course teacher application?`}
                />
            </div>
        </>
    );
}

CourseTeacherApplicationsPage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Course Teacher Applications">{page}</LMSLayout>
);
