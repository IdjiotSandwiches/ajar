import Filter from '@/components/lms/filter/institute/filter-mycourses';
import MobileCourseCard from '@/components/lms/mycourses/mobile-card-list';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseList({ categories, courses }: any) {
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
                price_min: filters.minPrice,
                price_max: filters.maxPrice,
            },
        });
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden text-2xl font-semibold text-gray-800 md:flex">My Courses</h1>
                <Filter categories={categories} onFilterChange={onFilterChange} />
                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Course List</h3>
                        <button
                            onClick={() => router.get(route('institute.post-course'))}
                            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#42C2FF] px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-[#42C2FF]/90"
                        >
                            <Plus size={16} strokeWidth={3} /> Tambah Kursus
                        </button>
                    </div>
                    <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
                        <table className="min-w-full rounded-lg text-sm text-gray-700">
                            <thead className="border-b border-gray-200 bg-[#42C2FF]/10">
                                <tr className="cursor-default">
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
                                                className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'}`}
                                            >
                                                <td className="p-1 text-center">
                                                    <p>{index + 1}</p>
                                                </td>
                                                <td className="flex items-center gap-3 p-3">
                                                    <img
                                                        src={course?.image || 'https://placehold.co/400'}
                                                        alt={course.name}
                                                        className="h-12 w-12 rounded-md object-cover"
                                                    />
                                                    <p className="cursor-default font-bold">{course.name}</p>
                                                </td>

                                                <td className="cursor-default p-3">
                                                    <div className="flex items-center gap-1">
                                                        <p className="font-bold">{course.duration}</p>
                                                        <p className="text-sm text-gray-600">mins</p>
                                                    </div>
                                                </td>

                                                <td className="cursor-default p-3 font-bold">
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
                                                            className="rounded-md bg-[#42C2FF] p-2 text-white hover:bg-[#42C2FF]/90"
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
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {courses.data.length === 0 ? (
                            <p className="py-10 text-center text-gray-500">Belum ada kursus.</p>
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
        </>
    );
}

CourseList.layout = (page: React.ReactNode) => <LMSLayout title="My Courses">{page}</LMSLayout>;
