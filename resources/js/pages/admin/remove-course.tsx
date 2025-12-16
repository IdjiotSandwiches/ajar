import Filter from '@/components/lms/filter/institute/filter-mycourses';
import DynamicModal from '@/components/modal/modal';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function RemoveCoursePage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const courses = [
        {
            id: 1,
            name: 'React for Beginners',
            image: 'https://placehold.co/80',
            institute: {
                name: 'Ajar Academy',
            },
            teachers: [
                { name: 'Budi Santoso' },
                { name: 'Siti Rahma' },
            ],
        },
        {
            id: 2,
            name: 'UI UX Design Fundamentals',
            image: 'https://placehold.co/80',
            institute: {
                name: 'Design Hub',
            },
            teachers: [{ name: 'Andi Wijaya' }],
        },
        {
            id: 3,
            name: 'Laravel Advanced',
            image: 'https://placehold.co/80',
            institute: {
                name: 'Code Mastery',
            },
            teachers: [],
        },
    ];

    const openDeleteModal = (course: any) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const confirmDelete = () => {
        console.log('DELETE COURSE:', selectedCourse?.id);
        setShowModal(false);
    };

    return (
        <>
            <Head title="Remove Course" />

            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Remove Course
                </h1>

                <Filter />

                <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">
                        Course Management
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#42C2FF]/10">
                                <tr>
                                    <th className="w-12 p-3 text-center font-semibold">
                                        No
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Course
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Institute
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Teacher
                                    </th>
                                    <th className="w-24 p-3 text-center font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {courses.map((course, index) => (
                                    <tr
                                        key={course.id}
                                        className={`border-b transition hover:bg-[#42C2FF]/10 ${
                                            index % 2 === 0
                                                ? 'bg-[#f9fcff]'
                                                : 'bg-white'
                                        }`}
                                    >
                                        {/* NO */}
                                        <td className="p-3 text-center">
                                            {index + 1}
                                        </td>

                                        {/* COURSE */}
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={course.image}
                                                    alt={course.name}
                                                    className="h-12 w-12 rounded-md border object-cover"
                                                />
                                                <span className="font-medium text-gray-800">
                                                    {course.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* INSTITUTE */}
                                        <td className="p-3">
                                            {course.institute.name}
                                        </td>

                                        {/* TEACHERS */}
                                        <td className="p-3">
                                            {course.teachers.length === 0 ? (
                                                <span className="italic text-gray-400">
                                                    No teacher
                                                </span>
                                            ) : (
                                                <ul className="list-disc pl-4">
                                                    {course.teachers.map(
                                                        (t: any, i: number) => (
                                                            <li key={i}>
                                                                {t.name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </td>

                                        {/* ACTION */}
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() =>
                                                    openDeleteModal(course)
                                                }
                                                className="inline-flex items-center justify-center rounded-md bg-red-500 p-2 text-white shadow-sm transition hover:bg-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmDelete}
                    description={`Are you sure you want to delete the course "${selectedCourse?.name}"? This action cannot be undone.`}
                />
            </div>
        </>
    );
}

RemoveCoursePage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Remove Course">{page}</LMSLayout>
);
