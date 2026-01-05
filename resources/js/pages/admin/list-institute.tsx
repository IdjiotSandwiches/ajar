import { manageInstituteFilter } from '@/components/lms/filter/dictionary/manage-institute';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Plus, Star, Trash2, University } from 'lucide-react';
import React, { useState } from 'react';

export default function InstituteList({ institutes, categories, filters }: any) {
    const [showModal, setShowModal] = useState(false);
    const [deleteInstitute, setDeleteInstitute] = useState<number>();

    const handleDeleteClick = (id: number) => {
        setDeleteInstitute(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        router.delete(route('admin.delete-institute', { id: deleteInstitute }));
        setShowModal(false);
    };

    const onFilterChange = (filters: any) => {
        router.reload({
            only: ['institutes'],
            data: {
                search: filters.search,
                category_id: filters.category,
                count: filters.total_course,
                rating: filters.rating,
            },
        });
    };

    const hasInstitute = institutes?.data && institutes.data.length > 0;

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter schema={manageInstituteFilter(categories, filters)} onChange={onFilterChange} />
                <div className="mx-auto w-full rounded-2xl border p-4 shadow-sm backdrop-blur-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Institute List</h3>
                        <button
                            onClick={() => router.get(route('admin.register-institute'))}
                            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#3ABEFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#3ABEFF]/90"
                        >
                            <Plus size={16} /> Add Institute
                        </button>
                    </div>

                    <div className="hidden overflow-x-auto rounded-lg border shadow-sm lg:block dark:border-white/20 dark:shadow-white/20">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10 dark:border-white/20 dark:text-white">
                                <tr>
                                    <th className="p-2 text-center">No</th>
                                    <th className="p-3 text-left">Institute Name</th>
                                    <th className="p-3 text-center">Category</th>
                                    <th className="p-3 text-center">Courses</th>
                                    <th className="p-3 text-center">Rating</th>
                                    <th className="p-3 text-center">Register Date</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!hasInstitute && (
                                    <tr>
                                        <td colSpan={7} className="p-6 text-center text-sm text-gray-500 dark:text-white/70">
                                            No institute found
                                        </td>
                                    </tr>
                                )}
                                {hasInstitute &&
                                    institutes.data?.map((inst: any, index: number) => (
                                        <tr
                                            key={inst.id}
                                            className={`border-b hover:bg-[#42C2FF]/10 dark:border-white/20 dark:text-white ${
                                                index % 2 === 0 ? 'bg-[#F9FCFF] dark:bg-[#31363F]' : 'bg-white dark:bg-[#222831]'
                                            }`}
                                        >
                                            <td className="p-2 text-center">{institutes.from + index}</td>
                                            <td
                                                className="cursor-pointer p-3 font-semibold"
                                                onClick={() => router.get(route('detail-institute', inst.id))}
                                            >
                                                {inst.name}
                                            </td>
                                            <td className="p-3 text-center">{inst.category}</td>
                                            <td className="p-3 text-center">{inst.courses_count}</td>
                                            <td className="p-3 text-center">
                                                {inst.reviews_avg_rating ? (
                                                    <>
                                                        <div className="flex items-center justify-center gap-1">
                                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                            <span className="font-semibold">{inst.reviews_avg_rating}</span>
                                                            <span className="text-gray-500">/ 5 ({inst.reviews_count})</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400 italic">No review</span>
                                                )}
                                            </td>
                                            <td className="p-2 text-center">
                                                {new Date(inst.register_date).toLocaleString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleDeleteClick(inst.id)}
                                                        className="cursor-pointer rounded-md bg-[#FF1818] p-2 text-white"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:hidden">
                        {!hasInstitute && (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <University className="mb-4 h-12 w-12 text-gray-400" />

                                <p className="text-base font-semibold text-gray-700 dark:text-white">No institute found</p>

                                <p className="mt-1 max-w-md text-sm text-gray-500 dark:text-white/70">
                                    The institute with the status or category you selected is not yet available. Try changing the filter or selecting
                                    a different category.
                                </p>
                            </div>
                        )}
                        {hasInstitute &&
                            institutes.data?.map((inst: any) => (
                                <div key={inst.id} className="dark:border-whie/20 rounded-xl border p-4 shadow-sm dark:shadow-white/20">
                                    <p
                                        className="cursor-pointer font-semibold text-gray-800 dark:text-white"
                                        onClick={() => router.get(route('detail-institute', inst.id))}
                                    >
                                        {inst.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-white/80">Category: {inst.category}</p>
                                    <p className="text-sm text-gray-600 dark:text-white/80">Courses: {inst.courses_count}</p>
                                    <p className="text-sm text-gray-600 dark:text-white/80">
                                        Rating: {inst.reviews_avg_rating ? `⭐ ${inst.reviews_avg_rating} (${inst.reviews_count})` : 'No review'}
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-white/70">
                                        Registered on{' '}
                                        {new Date(inst.register_date).toLocaleString('id-ID', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>

                                    <div className="mt-3 flex justify-end gap-2">
                                        <button onClick={() => handleDeleteClick(inst.id)} className="rounded-md bg-[#FF1818] p-2 text-white">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <Pagination links={institutes.links} />
                </div>

                <DynamicModal
                    type="confirmation"
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={confirmDelete}
                    description="Are you sure you want to delete this institute?"
                />
            </div>
        </>
    );
}

InstituteList.layout = (page: React.ReactNode) => <LMSLayout title="Manage Institutes">{page}</LMSLayout>;
