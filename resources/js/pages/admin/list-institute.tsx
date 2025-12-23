import { manageInstituteFilter } from '@/components/lms/filter/dictionary/manage-institute';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Plus, Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function InstituteList({ institutes }: any) {
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

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter
                    schema={manageInstituteFilter}
                    onChange={(filters: any) => {
                        console.log(filters);
                    }}
                />

                <div className="mx-auto w-full rounded-2xl border dark:border-white/20 p-4 shadow-sm dark:shadow-white/20 backdrop-blur-sm sm:p-6 md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Institute List</h3>
                        <button
                            onClick={() => router.get(route('admin.register-institute'))}
                            className="flex cursor-pointer items-center gap-2 rounded-md bg-[#3ABEFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#3ABEFF]/90"
                        >
                            <Plus size={16} /> Add Institute
                        </button>
                    </div>

                    <div className="hidden overflow-x-auto rounded-lg border dark:border-white/20 shadow-sm dark:shadow-white/20 md:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b dark:border-white/20 bg-[#3ABEFF]/10 dark:text-white">
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
                                {institutes.data?.map((inst: any, index: number) => (
                                    <tr key={inst.id} className={`border-b dark:border-white/20 dark:text-white hover:bg-[#42C2FF]/10 ${index % 2 === 0
                                        ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                        : 'bg-white dark:bg-[#222831]'}`}>
                                        <td className="p-2 text-center">{institutes.from + index}</td>
                                        <td className="p-3 font-semibold">{inst.name}</td>
                                        <td className="p-3 text-center">{inst.category}</td>
                                        <td className="p-3 text-center">{inst.courses_count}</td>
                                        <td className="p-3 text-center">
                                            {inst.rating ? (
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
                                        <td className="p-2 text-center">12 Dec 2025 12:00</td>
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

                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {institutes.data?.map((inst: any) => (
                            <div key={inst.id} className="rounded-xl border dark:border-whie/20 p-4 shadow-sm dark:shadow-white/20">
                                <p className="font-semibold text-gray-800 dark:text-white">{inst.name}</p>
                                <p className="text-sm text-gray-600 dark:text-white/80">Category: {inst.category}</p>
                                <p className="text-sm text-gray-600 dark:text-white/80">Courses: {inst.courses_count}</p>
                                <p className="text-sm text-gray-600 dark:text-white/80">
                                    Rating: {inst.rating ? `⭐ ${inst.reviews_avg_rating} (${inst.reviews_count})` : 'No review'}
                                </p>

                                <p className="text-xs text-gray-500 dark:text-white/70">Registered on 12 Dec 2025 12:00</p>

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
