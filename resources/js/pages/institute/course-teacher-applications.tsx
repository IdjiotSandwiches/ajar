import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseTeacherApplicationsPage() {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const applications = {
        data: [
            {
                id: 1,
                status: 'pending',
                created_at: '2024-10-01 14:30',
                teacher: {
                    id: 11,
                    user: {
                        name: 'Budi Santoso',
                        profile_picture: 'https://placehold.co/100',
                    },
                    category: { name: 'Web Development' },
                },
                course: {
                    id: 101,
                    name: 'React for Beginners',
                    image: 'https://placehold.co/400',
                },
            },
            {
                id: 2,
                status: 'pending',
                created_at: '2024-10-03 09:20',
                teacher: {
                    id: 12,
                    user: {
                        name: 'Siti Rahma',
                        profile_picture: 'https://placehold.co/100',
                    },
                    category: { name: 'UI / UX Design' },
                },
                course: {
                    id: 102,
                    name: 'Figma Masterclass',
                    image: 'https://placehold.co/400',
                },
            },
        ],
        links: [],
    };

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
            <Head title="Course Teacher Applications" />

            <div className="flex min-h-screen flex-col gap-6">
                {/* <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Course Teacher Applications
                </h1> */}

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">
                        Applications to Teach Courses
                    </h3>

                    <div className="flex flex-col gap-4 md:hidden">
                        {applications.data.map((app) => (
                            <div
                                key={app.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
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

                                <p className="mb-2 text-sm font-medium text-gray-600">
                                    Saya ingin mengajar di kursus ini
                                </p>

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
                                        className="rounded-md bg-[#3ABEFF] p-2 text-white shadow-sm hover:bg-[#3ABEFF]/90"
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

                    <div className="hidden overflow-x-auto md:block rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10">
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
                                {applications.data.map((app, index) => (
                                    <tr
                                        key={app.id}
                                        className={`border-b transition hover:bg-[#3ABEFF]/10 ${index % 2 === 0
                                            ? 'bg-[#f9fcff]'
                                            : 'bg-white'
                                            }`}
                                    >
                                        <td className="p-1 text-center">{index + 1}</td>
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

                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            true,
                                                            app.id
                                                        )
                                                    }
                                                    className="rounded-md bg-[#3ABEFF] p-2 text-white shadow-sm hover:bg-[#3ABEFF]/90"
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
