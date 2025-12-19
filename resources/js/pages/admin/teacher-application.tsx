import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherApplicationsPage() {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<boolean | undefined>();
    const [teacherId, setTeacherId] = useState<number | undefined>();

    const applications = {
        data: [
            {
                id: 1,
                teacher_id: 101,
                teacher: {
                    user: {
                        name: 'Budi Santoso',
                        profile_picture: 'https://placehold.co/200',
                        email_verified_at: '2024-01-15 10:30:00',
                    },
                    category: {
                        name: 'Web Development',
                    },
                },
            },
            {
                id: 2,
                teacher_id: 102,
                teacher: {
                    user: {
                        name: 'Siti Rahma',
                        profile_picture: 'https://placehold.co/200',
                        email_verified_at: '2024-02-01 09:15:00',
                    },
                    category: {
                        name: 'UI / UX Design',
                    },
                },
            },
            {
                id: 3,
                teacher_id: 103,
                teacher: {
                    user: {
                        name: 'Andi Wijaya',
                        profile_picture: null,
                        email_verified_at: null,
                    },
                    category: {
                        name: 'Mobile Development',
                    },
                },
            },
        ],
        links: [],
    };

    const handleAction = (type: boolean, id: number) => {
        setAction(type);
        setTeacherId(id);
        setShowModal(true);
    };

    const confirmAction = () => {
        if (action) {
            console.log('ACCEPT teacher id:', teacherId);
        } else {
            console.log('REJECT teacher id:', teacherId);
        }
        setShowModal(false);
    };

    const selectedTeacherName = applications.data.find(
        (x: any) => x.teacher_id === teacherId
    )?.teacher?.user?.name;

    return (
        <>
            <Head title="Teacher Applications" />

            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Teacher Applications
                </h1>

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">Applications</h3>

                    <div className="flex flex-col gap-4 md:hidden">
                        {applications.data.map((app: any) => {
                            const teacher = app.teacher.user;
                            return (
                                <div
                                    key={app.id}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <img
                                            src={
                                                teacher.profile_picture ||
                                                'https://placehold.co/400'
                                            }
                                            alt={teacher.name}
                                            className="h-12 w-12 rounded-full border object-cover"
                                        />
                                        <p className="font-semibold text-gray-800">
                                            {teacher.name}
                                        </p>
                                    </div>

                                    <p className="mb-2 text-sm text-gray-600">
                                        I applied to be a Teacher at Ajar
                                    </p>

                                    <p className="mb-3 text-xs text-gray-500">
                                        <span className="font-medium">
                                            Submitted:
                                        </span>{' '}
                                        {teacher.email_verified_at
                                            ? new Date(
                                                  teacher.email_verified_at
                                              ).toLocaleString('id-ID')
                                            : '-'}
                                    </p>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() =>
                                                handleAction(true, app.teacher_id)
                                            }
                                            className="rounded-md bg-[#3ABEFF] p-2 text-white"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleAction(false, app.teacher_id)
                                            }
                                            className="rounded-md bg-[#FF5C5C] p-2 text-white"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden overflow-x-auto md:block rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10">
                                <tr>
                                    <th className="p-1 text-center font-semibold">
                                        No
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Teacher Applications
                                    </th>
                                    <th className="w-32 px-3 text-center font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {applications.data.map(
                                    (app: any, index: number) => {
                                        const teacher = app.teacher.user;

                                        return (
                                            <tr
                                                key={app.id}
                                                className={`border-b transition hover:bg-[#3ABEFF]/10 ${
                                                    index % 2 === 0
                                                        ? 'bg-[#f9fcff]'
                                                        : 'bg-white'
                                                }`}
                                            >
                                                <td className="p-1 text-center">
                                                    {index + 1}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={
                                                                teacher.profile_picture ||
                                                                'https://placehold.co/400'
                                                            }
                                                            alt={teacher.name}
                                                            className="h-16 w-16 rounded-full border object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold">
                                                                {teacher.name}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                I applied to be a Teacher at Ajar
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Submitted:{' '}
                                                                {teacher.email_verified_at
                                                                    ? new Date(
                                                                          teacher.email_verified_at
                                                                      ).toLocaleString(
                                                                          'id-ID'
                                                                      )
                                                                    : '-'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-3 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleAction(
                                                                    true,
                                                                    app.teacher_id
                                                                )
                                                            }
                                                            className="rounded-md bg-[#3ABEFF] p-2 text-white"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleAction(
                                                                    false,
                                                                    app.teacher_id
                                                                )
                                                            }
                                                            className="rounded-md bg-[#FF5C5C] p-2 text-white"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
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
                    description={`Are you sure you want to ${
                        action ? 'accept' : 'reject'
                    } ${selectedTeacherName}'s application?`}
                />
            </div>
        </>
    );
}

TeacherApplicationsPage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Teacher Applications">{page}</LMSLayout>
);
