import { removeCourseFilter } from '@/components/lms/filter/dictionary/remove-course';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
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
                <Filter
                    schema={removeCourseFilter}
                    onChange={(filters: any) => {
                        console.log(filters);
                    }}
                />

                <div className="rounded-2xl border dark:border-white/20 p-4 lg:p-8 shadow-sm dark:shadow-white/20">
                    <h3 className="mb-6 text-xl font-semibold">
                        Course Management
                    </h3>

                    <div className="flex flex-col gap-4 lg:hidden">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className="rounded-xl border dark:border-white/20 p-4 shadow-sm dark:shadow-white/20"
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <img
                                        src={storageUrl(course.image)}
                                        alt={course.name}
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            {course.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-white/70">
                                            {course.institute.name}
                                        </p>
                                    </div>

                                    <span className="text-xs text-gray-400 dark:text-white/60">
                                        #{index + 1}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-white/70">
                                        Teachers
                                    </p>

                                    {course.teachers.length === 0 ? (
                                        <span className="italic text-sm text-gray-400 dark:text-white/40">
                                            No teacher
                                        </span>
                                    ) : (
                                        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-white/90">
                                            {course.teachers.map(
                                                (t: any, i: number) => (
                                                    <li key={i}>{t.name}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() =>
                                            openDeleteModal(course)
                                        }
                                        className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
                                    >
                                        <Trash2 size={16} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden overflow-x-auto lg:block rounded-lg border dark:border-white/20 shadow-sm dark:shadow-white/20">
                        <table className="min-w-full text-sm text-gray-700 dark:text-white">
                            <thead className="border-b dark:border-white/20 bg-[#3ABEFF]/10">
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
                                        className={`border-b dark:border-white/20 transition hover:bg-[#3ABEFF]/10 ${index % 2 === 0
                                            ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                            : 'bg-white dark:bg-[#222831]'}`}
                                    >
                                        <td className="p-3 text-center">
                                            {index + 1}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={storageUrl(course.image)}
                                                    alt={course.name}
                                                    className="h-12 w-12 rounded-md border object-cover"
                                                />
                                                <span className="font-medium text-gray-800 dark:text-white">
                                                    {course.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-3">
                                            {course.institute.name}
                                        </td>

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
