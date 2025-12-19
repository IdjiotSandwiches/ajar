/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { manageTeacherAdminFilter } from '@/components/lms/filter/dictionary/manage-teacher-admin';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function ManageTeachersPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);

    const teachers = {
        data: [
            {
                id: 1,
                full_name: 'Budi Santoso',
                avatar: 'https://placehold.co/200',
                register_date: '12 Dec 2025 12:00',
                institute: {
                    name: 'Ajar Academy',
                },
                courses: [
                    { id: 1, name: 'React Fundamentals' },
                    { id: 2, name: 'Advanced TypeScript' },
                ],
            },
            {
                id: 2,
                full_name: 'Siti Rahma',
                avatar: 'https://placehold.co/200',
                register_date: '05 Jan 2025 09:30',
                institute: null,
                courses: [],
            },
            {
                id: 3,
                full_name: 'Andi Wijaya',
                avatar: null,
                register_date: '20 Feb 2025 15:45',
                institute: {
                    name: 'Tech Edu Indonesia',
                },
                courses: [{ id: 3, name: 'Flutter for Beginner' }],
            },
        ],
        links: [],
    };

    const handleRemoveClick = (id: number) => {
        setSelectedTeacherId(id);
        setShowModal(true);
    };

    const confirmRemove = () => {
        console.log('REMOVE TEACHER ID:', selectedTeacherId);
        setShowModal(false);
    };

    const selectedTeacherName = teachers.data.find(
        (t: any) => t.id === selectedTeacherId
    )?.full_name;

    return (
        <>
            <Head title="Manage Teachers" />

            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Manage Teachers
                </h1>

                <Filter
                    schema={manageTeacherAdminFilter}
                    onChange={(filters: any) => {
                        console.log(filters);
                    }}
                />

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">Teacher List</h3>

                    <div className="hidden overflow-x-auto md:block rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10">
                                <tr>
                                    <th className="p-2 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Teacher</th>
                                    <th className="p-3 text-left font-semibold">Institute</th>
                                    <th className="p-3 text-left font-semibold">Courses Taught</th>
                                    <th className="p-3 text-left font-semibold">Register Date</th>
                                    <th className="w-24 p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teachers.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            No teachers found.
                                        </td>
                                    </tr>
                                ) : (
                                    teachers.data.map((teacher: any, index: number) => (
                                        <tr
                                            key={teacher.id}
                                            className={`border-b transition hover:bg-[#3ABEFF]/10 ${index % 2 === 0
                                                ? 'bg-[#f9fcff]'
                                                : 'bg-white'
                                                }`}
                                        >
                                            <td className="p-2 text-center">
                                                {index + 1}
                                            </td>

                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            teacher.avatar ||
                                                            'https://placehold.co/400'
                                                        }
                                                        alt={teacher.full_name}
                                                        className="h-10 w-10 rounded-full border object-cover"
                                                    />
                                                    <span className="font-semibold">
                                                        {teacher.full_name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-3">
                                                {teacher.institute?.name ?? (
                                                    <span className="text-gray-400 italic">
                                                        Not assigned
                                                    </span>
                                                )}
                                            </td>

                                            <td className="p-3">
                                                {teacher.courses.length === 0 ? (
                                                    <span className="text-gray-400 italic">
                                                        No course
                                                    </span>
                                                ) : (
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {teacher.courses.map((c: any) => (
                                                            <li key={c.id}>{c.name}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </td>

                                            <td className="p-3 text-left">
                                                {teacher.register_date}
                                            </td>

                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleRemoveClick(teacher.id)
                                                    }
                                                    className="rounded-md bg-[#FF5C5C] p-2 text-white hover:bg-[#E04343]"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {teachers.data.map((teacher: any) => (
                            <div
                                key={teacher.id}
                                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <img
                                        src={
                                            teacher.avatar ||
                                            'https://placehold.co/400'
                                        }
                                        alt={teacher.full_name}
                                        className="h-12 w-12 rounded-full border object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {teacher.full_name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {teacher.institute?.name ??
                                                'Not assigned to institute'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-3 text-sm">
                                    <p className="font-medium text-gray-700 mb-1">
                                        Courses Taught:
                                    </p>
                                    {teacher.courses.length === 0 ? (
                                        <p className="italic text-gray-400">
                                            No course
                                        </p>
                                    ) : (
                                        <ul className="list-disc list-inside text-gray-600">
                                            {teacher.courses.map((c: any) => (
                                                <li key={c.id}>{c.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <p className="text-xs text-gray-500">
                                    Registered on{" "}
                                    {new Date(teacher.register_date).toLocaleDateString("id-ID")}
                                </p>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() =>
                                            handleRemoveClick(teacher.id)
                                        }
                                        className="rounded-md bg-[#FF5C5C] p-2 text-white"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination links={teachers.links} />
                </div>

                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmRemove}
                    description={`Are you sure you want to remove ${selectedTeacherName} from the system?`}
                />
            </div>
        </>
    );
}

ManageTeachersPage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Manage Teachers">{page}</LMSLayout>
);
