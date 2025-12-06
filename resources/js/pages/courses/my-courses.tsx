import DynamicModal from '@/components/modal/modal';
import AppLayout from '@/layouts/app-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CourseList({ courses }: { courses: any }) {
    const { props } = usePage();
    const { flash }: any = props;
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

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash.success, flash.error]);

    return (
        <>
            <div className="flex min-h-screen flex-col bg-[#f9fdfd] px-3 py-6 sm:px-6">
                <div className="mx-auto mt-4 w-full max-w-6xl rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:mt-10 sm:p-6 md:p-10">
                    <h1 className="mb-6 cursor-default text-center text-xl font-semibold text-[#42C2FF] sm:mb-10 sm:text-2xl md:text-3xl">
                        My Courses
                    </h1>
                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={() => router.get(route('institute.course-detail'))}
                            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#42C2FF] px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-[#42C2FF]/90"
                        >
                            <Plus size={16} strokeWidth={3} /> Tambah Kursus
                        </button>
                    </div>
                    {courses.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">Belum ada kursus.</div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="min-w-full rounded-lg border border-gray-200 text-sm text-gray-700">
                                    <thead className="border-b border-gray-200 bg-[#42C2FF]/10">
                                        <tr className="cursor-default">
                                            <th className="px-4 py-3 text-left font-medium">Course</th>
                                            <th className="px-4 py-3 text-left font-medium">Duration</th>
                                            <th className="px-4 py-3 text-left font-medium">Price</th>
                                            <th className="px-4 py-3 text-center font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.data.map((course: any, index: number) => (
                                            <tr
                                                key={course.id}
                                                className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'}`}
                                            >
                                                <td className="flex items-center gap-3 px-4 py-3">
                                                    <img
                                                        src={course?.image || 'https://placehold.co/400'}
                                                        alt={course.name}
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                    <p className="cursor-default font-bold">{course.name}</p>
                                                </td>

                                                <td className="cursor-default px-4 py-3">
                                                    <div className="flex items-center gap-1">
                                                        <p className="font-bold">{course.duration}</p>
                                                        <p className="text-sm text-gray-600">mins</p>
                                                    </div>
                                                </td>

                                                <td className="cursor-default px-4 py-3 font-bold">
                                                    Rp{' '}
                                                    {Number(course.price).toLocaleString('id-ID', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </td>

                                                <td className="px-4 py-3 text-center">
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
                                </table>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:hidden">
                                {courses.data.map((course: any, index: number) => (
                                    <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                        <div className="flex gap-4">
                                            <img
                                                src={course?.image ?? 'https://placehold.co/400'}
                                                alt={course.name}
                                                className="h-20 w-20 rounded-md object-cover"
                                            />

                                            <div className="flex flex-grow flex-col justify-between">
                                                <p className="font-bold text-gray-800">{course.name}</p>

                                                <p className="mt-1 text-sm text-gray-600">
                                                    Duration: <span className="font-bold">{course.duration} mins</span>
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-gray-700">
                                                    {course.price.toLocaleString('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        maximumFractionDigits: 0,
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEditClick(course.id)}
                                                className="rounded-md bg-[#42C2FF] p-2 text-white hover:bg-[#42C2FF]/90"
                                            >
                                                <Pencil size={16} strokeWidth={2} />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteClick(course)}
                                                className="rounded-md bg-[#FF1818] p-2 text-white hover:bg-[#FF1818]/90"
                                            >
                                                <Trash2 size={16} strokeWidth={2} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-1 select-none">
                                {courses.links.map((link: any, index: number) => {
                                    const isActive = link.active;
                                    const isDisabled = !link.url;

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            preserveState
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`rounded-md border px-3 py-1 text-sm transition ${isActive ? 'border-[#42C2FF] bg-[#42C2FF] text-white' : 'bg-white'} ${isDisabled ? 'cursor-default opacity-40' : 'hover:bg-gray-100'} `}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    )}
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

CourseList.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
