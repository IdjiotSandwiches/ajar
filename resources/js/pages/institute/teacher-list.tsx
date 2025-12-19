import { manageTeachersFilter } from '@/components/lms/filter/dictionary/manage-teachers';
import Filter from '@/components/lms/filter/filter';
import MobileTeacherCard from '@/components/lms/filter/institute/teacher-card-list';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherList({ teachers }: any) {
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
                category_id: filters.category,
                price_min: filters.minPrice,
                price_max: filters.maxPrice,
            },
            preserveState: true,
            replace: true,
        });
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter schema={manageTeachersFilter} onChange={onFilterChange} />

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Teachers</h3>
                    </div>
                    <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10">
                                <tr>
                                    <th className="p-3 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Full Name</th>
                                    <th className="p-3 text-left font-semibold">Category</th>
                                    <th className="p-3 text-center font-semibold">Courses Taught</th>
                                    <th className="p-3 text-center font-semibold">Rating</th>
                                    <th className="p-3 text-left font-semibold">Register Date</th>
                                    <th className="p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.data.map((teacher: any, index: number) => (
                                    <tr
                                        key={index}
                                        className={`border-b transition hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'} `}
                                    >
                                        <td className="p-3 text-center">{teachers.from + index}</td>
                                        <td className="p-3 font-semibold">{teacher.name}</td>
                                        <td className="p-3">{teacher?.category?.name}</td>
                                        <td className="p-3 text-center font-semibold">{teacher.course_taught}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold">{teacher.review_rating.toFixed(1)}</span>
                                                <span className="text-gray-500">/ 5 ({teacher.review_count})</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600">
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

                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {teachers.data.map((teacher: any, index: number) => (
                            <MobileTeacherCard
                                key={index}
                                avatar={teacher.profile_picture}
                                fullName={teacher.name}
                                category={teacher?.category?.name}
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
