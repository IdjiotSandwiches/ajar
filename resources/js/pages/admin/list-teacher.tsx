import { manageTeacherAdminFilter } from '@/components/lms/filter/dictionary/manage-teacher-admin';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
import { router } from '@inertiajs/react';
import { Star, Trash2, UsersRound } from 'lucide-react';
import React, { useState } from 'react';

export default function ManageTeachersPage({ teachers, filters }: any) {
    const [showModal, setShowModal] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number>();

    const handleRemoveClick = (id: number) => {
        setSelectedTeacherId(id);
        setShowModal(true);
    };

    const confirmRemove = () => {
        router.delete(route('admin.delete-teacher', { id: selectedTeacherId }));
        setShowModal(false);
    };

    const onFilterChange = (filters: any) => {
        router.reload({
            only: ['teachers'],
            data: {
                search: filters.search,
                search_secondary: filters.search_institute,
                count: filters.total_course,
                rating: filters.rating,
            },
        });
    };

    const hasTeachers = teachers?.data && teachers.data.length > 0;

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter schema={manageTeacherAdminFilter(filters)} onChange={onFilterChange} />

                <div className="mx-auto w-full rounded-2xl border p-4 shadow-sm backdrop-blur-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                    <h3 className="mb-6 text-xl font-semibold">Teacher List</h3>

                    <div className="hidden overflow-x-auto rounded-lg border border-white/20 shadow-sm lg:block dark:shadow-white/20">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10 dark:border-white/20 dark:text-white">
                                <tr>
                                    <th className="p-2 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Teacher</th>
                                    <th className="p-3 text-center font-semibold">Course Count</th>
                                    <th className="p-3 text-center font-semibold">Rating</th>
                                    <th className="p-3 text-center font-semibold">Register Date</th>
                                    <th className="w-24 p-3 text-center font-semibold">Action</th>
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
                                {hasTeachers &&
                                    teachers.data?.map((teacher: any, index: number) => (
                                        <tr
                                            key={teacher.id}
                                            className={`border-b transition hover:bg-[#42C2FF]/10 dark:border-white/20 dark:text-white ${index % 2 === 0 ? 'bg-[#F9FCFF] dark:bg-[#31363F]' : 'bg-white dark:bg-[#222831]'
                                                }`}
                                        >
                                            <td className="p-2 text-center">{index + 1}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={storageUrl(teacher.avatar)}
                                                        alt={teacher.name}
                                                        className="h-10 w-10 rounded-full border object-cover"
                                                    />
                                                    <span className="font-semibold">{teacher.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">{teacher.courses_count}</td>
                                            <td className="p-3 text-center">
                                                {teacher.rating ? (
                                                    <>
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                            <span className="font-semibold">{teacher.reviews_avg_rating}</span>
                                                            <span className="text-gray-500">/ 5 ({teacher.reviews_count})</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400 italic">No review</span>
                                                )}
                                            </td>
                                            <td className="p-3 text-center">
                                                {new Date(teacher.register_date).toLocaleString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => handleRemoveClick(teacher.id)}
                                                    className="rounded-md bg-[#FF5C5C] p-2 text-white hover:bg-[#E04343]"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {!hasTeachers && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <UsersRound className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
                                <p className="text-base font-semibold text-gray-700 dark:text-white">
                                    No teachers available
                                </p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-white/70">
                                    There are currently no teacher found.
                                </p>
                            </div>
                        )}
                        {hasTeachers &&
                            teachers.data?.map((teacher: any) => (
                                <div key={teacher.id} className="rounded-xl border p-4 shadow-sm dark:border-white/20 dark:shadow-white/20">
                                    <div className="mb-3 flex items-center gap-3">
                                        <img src={storageUrl(teacher.avatar)} alt={teacher.name} className="h-12 w-12 rounded-full object-cover" />
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-white">{teacher.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-white/70">Course count: {teacher.courses_count}</p>
                                            <p className="text-xs text-gray-500 dark:text-white/70">
                                                Rating: {teacher.rating ? `⭐ ${teacher.reviews_avg_rating} (${teacher.reviews_count})` : 'No review'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-white/70">
                                        Registered on{' '}
                                        {new Date(teacher.register_date).toLocaleString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>

                                    <div className="flex justify-end">
                                        <button onClick={() => handleRemoveClick(teacher.id)} className="rounded-md bg-[#FF5C5C] p-2 text-white">
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
                    description={`Are you sure you want to remove ${teachers.data?.find((x: any) => x.id == selectedTeacherId)?.name} from the system?`}
                />
            </div>
        </>
    );
}

ManageTeachersPage.layout = (page: React.ReactNode) => <LMSLayout title="Manage Teachers">{page}</LMSLayout>;
