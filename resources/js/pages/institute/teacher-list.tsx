import { manageTeachersFilter } from '@/components/lms/filter/dictionary/manage-teachers';
import Filter from '@/components/lms/filter/filter';
import MobileTeacherCard from '@/components/lms/filter/institute/teacher-card-list';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherList({ teachers, filters }: any) {
    const [showModal, setShowModal] = useState(false);
    const [deleteTeacher, setDeleteTeacher] = useState<number>();

    const handleDeleteClick = (id: number) => {
        setDeleteTeacher(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        router.delete(route('institute.deactivate-teacher', { id: deleteTeacher }));
        setShowModal(false);
    };

    const onFilterChange = (filters: any) => {
        router.visit(route('institute.list-teacher'), {
            data: {
                search: filters.search,
                rating: filters.rating,
                date: filters.register_date,
                count: filters.courses_taught,
            },
            preserveState: true,
            replace: true,
        });
    };

    const hasTeachers = teachers?.data && teachers.data.length > 0;

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter schema={manageTeachersFilter(filters)} onChange={onFilterChange} />

                <div className="mx-auto w-full rounded-2xl border dark:border-white/20 p-4 lg:p-8 shadow-sm dark:shadow-white/20 backdrop-blur-sm">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Teachers</h3>
                    </div>
                    <div className="hidden overflow-x-auto rounded-lg border dark:border-white/20 shadow-sm dark:shadow-white/20 lg:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10 dark:text-white">
                                <tr>
                                    <th className="p-3 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Full Name</th>
                                    <th className="p-3 text-center font-semibold">Courses Taught</th>
                                    <th className="p-3 text-center font-semibold">Rating</th>
                                    <th className="p-3 text-center font-semibold">Register Date</th>
                                    <th className="p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!hasTeachers && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-6 text-center justify-center text-sm text-gray-500 dark:text-white/70"
                                        >
                                            No teachers available.
                                        </td>
                                    </tr>
                                )}
                                {hasTeachers && teachers.data.map((teacher: any, index: number) => (
                                    <tr
                                        key={index}
                                        className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0
                                            ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                            : 'bg-white dark:bg-[#222831]'}`}
                                    >
                                        <td className="p-3 text-center dark:text-white">{teachers.from + index}</td>
                                        <td className="p-3 font-semibold dark:text-white">{teacher.name}</td>
                                        <td className="p-3 text-center font-semibold dark:text-white">{teacher.course_taught}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold dark:text-white">{teacher.review_rating.toFixed(1)}</span>
                                                <span className="text-gray-500 dark:text-white/70">/ 5 ({teacher.review_count})</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600 text-center dark:text-white/80">
                                            {new Date(teacher.registered_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleDeleteClick(teacher.id)}
                                                className="cursor-pointer rounded-md bg-[#FF1818] p-2 text-white hover:bg-[#FF1818]/90"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {!hasTeachers && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="flex p-6 text-center justify-center text-sm text-gray-500 dark:text-white/70"
                                >
                                    No teachers available.
                                </td>
                            </tr>
                        )}
                        {hasTeachers && teachers.data.map((teacher: any, index: number) => (
                            <MobileTeacherCard
                                key={index}
                                avatar={teacher.profile_picture}
                                fullName={teacher.name}
                                coursesCount={teacher.course_taught}
                                rating={teacher.review_rating}
                                totalReviews={teacher.review_count}
                                registerDate={teacher.registered_at}
                                onDelete={() => handleDeleteClick(teacher.id)}
                            />
                        ))}
                    </div>

                    <Pagination links={teachers.links} />
                </div>

                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmDelete}
                    description="Once you confirm delete teacher, the teacher will be removed."
                />
            </div>
        </>
    );
}

TeacherList.layout = (page: React.ReactNode) => <LMSLayout title="Manage Teachers">{page}</LMSLayout>;
