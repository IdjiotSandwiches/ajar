import { myCoursesFilter } from '@/components/lms/filter/dictionary/mycourses';
import Filter from '@/components/lms/filter/filter';
import MobileCourseCard from '@/components/lms/mycourses/mobile-card-list';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
import { router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseList({ categories, courses, filters }: any) {
    const [showModal, setShowModal] = useState(false);
    const [deleteCourse, setDeleteCourse] = useState<Number>();

    const handleDeleteClick = (id: number) => {
        setDeleteCourse(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        router.delete(route('institute.delete-course', { id: deleteCourse }));
        setShowModal(false);
    };

    const handleEditClick = (courseId: number) => {
        router.get(route('institute.course-detail', courseId));
    };

    const onFilterChange = (filters: any) => {
        router.reload({
            only: ['courses'],
            data: {
                search: filters.search,
                category_id: filters.category,
                duration: filters.duration,
                sort_by: filters.sort_by,
            },
        });
    };

    return (
        <section>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter schema={myCoursesFilter(categories, filters)} onChange={onFilterChange} />
                <div className="mx-auto w-full rounded-xl border dark:border-white/20 shadow-sm dark:shadow-white/20 backdrop-blur-sm p-4 lg:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Course List</h3>
                        <button
                            onClick={() => router.get(route('institute.post-course'))}
                            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#3ABEFF] px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-[#3ABEFF]/90"
                        >
                            <Plus size={16} strokeWidth={3} /> Tambah Kursus
                        </button>
                    </div>
                    <div className="hidden overflow-x-auto rounded-lg border-b dark:border-white/20 shadow-sm dark:shadow-white/20 lg:block">
                        <table className="min-w-full rounded-lg text-sm text-gray-700">
                            <thead className="bg-[#3ABEFF]/10 border-b dark:border-white/20">
                                <tr className="cursor-default dark:text-white">
                                    <th className="p-1 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Course</th>
                                    <th className="p-3 text-left font-semibold">Duration</th>
                                    <th className="p-3 text-left font-semibold">Price</th>
                                    <th className="p-3 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>
                            {courses.length === 0 ? (
                                <div className="py-10 text-center text-gray-500">Belum ada kursus.</div>
                            ) : (
                                <>
                                    <tbody>
                                        {courses.data.map((course: any, index: number) => (
                                            <tr
                                                key={course.id}
                                                className={`border-b transition hover:bg-[#3ABEFF]/10 ${index % 2 === 0
                                                    ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                                    : 'bg-white dark:bg-[#222831]'}`}
                                            >
                                                <td className="p-1 text-center">
                                                    <p className="dark:text-white">{courses.from + index}</p>
                                                </td>
                                                <td className="flex items-center gap-3 p-3">
                                                    <img
                                                        src={storageUrl(course?.image)}
                                                        alt={course.name}
                                                        className="h-12 w-12 rounded-md object-cover"
                                                    />
                                                    <p className="cursor-default font-bold dark:text-white">{course.name}</p>
                                                </td>

                                                <td className="cursor-default p-3">
                                                    <div className="flex items-center gap-1">
                                                        <p className="font-bold dark:text-white">{course.duration}</p>
                                                        <p className="text-sm text-gray-600 dark:text-white/80">mins</p>
                                                    </div>
                                                </td>

                                                <td className="cursor-default p-3 font-bold dark:text-white">
                                                    Rp
                                                    {Number(course.price).toLocaleString('id-ID', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>

                                                <td className="p-3 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEditClick(course.id)}
                                                            className="rounded-md bg-[#3ABEFF] p-2 text-white hover:bg-[#3ABEFF]/90"
                                                        >
                                                            <Pencil size={16} strokeWidth={2} />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDeleteClick(course.id)}
                                                            className="rounded-md bg-[#FF1818] p-2 text-white hover:bg-[#FF1818]/90"
                                                        >
                                                            <Trash2 size={16} strokeWidth={2} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            )}
                        </table>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {courses.data.length === 0 ? (
                            <p className="py-10 text-center text-gray-500 dark:text-white/70">Belum ada kursus.</p>
                        ) : (
                            courses.data.map((course: any) => (
                                <MobileCourseCard
                                    key={course.id}
                                    image={course.image}
                                    title={course.name}
                                    duration={course.duration}
                                    price={course.price}
                                    onEdit={() => handleEditClick(course.id)}
                                    onDelete={() => handleDeleteClick(course.id)}
                                />
                            ))
                        )}
                    </div>

                    <Pagination links={courses.links} />
                </div>
                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmDelete}
                    description="Once you confirm delete course, the course will be gone."
                />
            </div>
        </section>
    );
}

CourseList.layout = (page: React.ReactNode) => <LMSLayout title="My Courses">{page}</LMSLayout>;
