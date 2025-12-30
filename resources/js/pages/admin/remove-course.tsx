import { removeCourseFilter } from '@/components/lms/filter/dictionary/remove-course';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
import { router } from '@inertiajs/react';
import { LibraryBig, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function RemoveCoursePage({ courses, categories, filters }: any) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<{
        id: number;
        name: string;
    } | null>(null);

    const openDeleteModal = (id: any, name: any) => {
        setSelectedCourse({ id, name });
        setShowModal(true);
    };

    const confirmDelete = () => {
        router.delete(route('admin.remove-course', { id: selectedCourse?.id }));
        setShowModal(false);
    };

    const onFilterChange = (filters: any) => {
        router.reload({
            only: ['courses'],
            data: {
                search: filters.search,
                category_id: filters.category,
                search_secondary: filters.search_secondary,
            },
        });
    };

    const hasCourses = courses?.data && courses.data.length > 0;

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter
                    schema={removeCourseFilter(categories, filters)}
                    onChange={onFilterChange}
                />

                <div className="rounded-2xl border p-4 shadow-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                    <h3 className="mb-6 text-xl font-semibold">Course Management</h3>
                    <div className="flex flex-col gap-4 lg:hidden">
                        {!hasCourses && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <LibraryBig className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
                                <p className="text-base font-semibold text-gray-700 dark:text-white">
                                    No courses available
                                </p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-white/70">
                                    There are currently no courses found.
                                </p>
                            </div>
                        )}
                        {hasCourses &&
                            courses.data?.map((course: any, index: number) => (
                                <div key={index} className="rounded-xl border p-4 shadow-sm dark:border-white/20 dark:shadow-white/20">
                                    <div className="mb-3 flex items-center gap-3">
                                        <img src={storageUrl(course.image)} alt={course.name} className="h-14 w-14 rounded-lg object-cover" />

                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800 dark:text-white">{course.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-white/70">{course.institute_name}</p>
                                        </div>

                                        <span className="text-xs text-gray-400 dark:text-white/60">#{courses.from + index}</span>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => openDeleteModal(course.id, course.name)}
                                            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
                                        >
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="hidden overflow-x-auto rounded-lg border shadow-sm lg:block dark:border-white/20 dark:shadow-white/20">
                        <table className="min-w-full text-sm text-gray-700 dark:text-white">
                            <thead className="border-b bg-[#3ABEFF]/10 dark:border-white/20">
                                <tr>
                                    <th className="w-12 p-3 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Course</th>
                                    <th className="p-3 text-center font-semibold">Institute</th>
                                    <th className="w-24 p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!hasCourses && (
                                    <tr>
                                        <td colSpan={4} className="p-6 text-center text-sm text-gray-500 dark:text-white/70">
                                            No courses available.
                                        </td>
                                    </tr>
                                )}
                                {hasCourses &&
                                    courses.data?.map((course: any, index: number) => (
                                        <tr
                                            key={course.id}
                                            className={`border-b transition hover:bg-[#3ABEFF]/10 dark:border-white/20 ${index % 2 === 0 ? 'bg-[#F9FCFF] dark:bg-[#31363F]' : 'bg-white dark:bg-[#222831]'
                                                }`}
                                        >
                                            <td className="p-3 text-center">{courses.from + index}</td>

                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={storageUrl(course.image)}
                                                        alt={course.name}
                                                        className="h-12 w-12 rounded-md border object-cover"
                                                    />
                                                    <span className="font-medium text-gray-800 dark:text-white">{course.name}</span>
                                                </div>
                                            </td>

                                            <td className="p-3 text-center">{course.institute_name}</td>

                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => openDeleteModal(course.id, course.name)}
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
                    <Pagination links={courses.links} />
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

RemoveCoursePage.layout = (page: React.ReactNode) => <LMSLayout title="Remove Course">{page}</LMSLayout>;
