/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { Head, router } from '@inertiajs/react';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function InstituteList() {
    const [showModal, setShowModal] = useState(false);
    const [deleteInstitute, setDeleteInstitute] = useState<number | null>(null);

    /* ================= DUMMY DATA ================= */
    const institutes = {
        data: [
            {
                id: 1,
                name: 'Ajar Academy',
                total_courses: 5,
                rating: 4.6,
                reviews_count: 120,
            },
            {
                id: 2,
                name: 'Tech Edu Indonesia',
                total_courses: 2,
                rating: 4.2,
                reviews_count: 45,
            },
            {
                id: 3,
                name: 'Digital Skill Hub',
                total_courses: 0,
                rating: null,
                reviews_count: 0,
            },
        ],
        links: [],
    };

    const handleDeleteClick = (id: number) => {
        setDeleteInstitute(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        console.log('DELETE INSTITUTE ID:', deleteInstitute);
        setShowModal(false);
    };

    return (
        <>
            <Head title="Institutes" />
            <div className="flex min-h-screen flex-col gap-6">
                <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Institutes
                </h1>

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Institute List</h3>
                        <button
                            onClick={() => router.get(route('admin.register-institute'))}
                            className="flex items-center gap-2 rounded-md bg-[#42C2FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#42C2FF]/90"
                        >
                            <Plus size={16} /> Add Institute
                        </button>
                    </div>

                    {/* ================= TABLE DESKTOP ================= */}
                    <div className="hidden overflow-x-auto md:block rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-[#42C2FF]/10 border-b">
                                <tr>
                                    <th className="p-2 text-center">No</th>
                                    <th className="p-3 text-left">Institute Name</th>
                                    <th className="p-3 text-center">Courses</th>
                                    <th className="p-3 text-center">Rating</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {institutes.data.map((inst: any, index: number) => (
                                    <tr
                                        key={inst.id}
                                        className={`border-b hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'
                                            }`}
                                    >
                                        <td className="p-2 text-center">{index + 1}</td>
                                        <td className="p-3 font-semibold">{inst.name}</td>
                                        <td className="p-3 text-center">
                                            {inst.total_courses}
                                        </td>
                                        <td className="p-3 text-center">
                                            {inst.rating ? (
                                                <>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Star
                                                            size={14}
                                                            className="text-yellow-400 fill-yellow-400"
                                                        />
                                                        <span className="font-semibold">
                                                            {inst.rating.toFixed(1)}
                                                        </span>
                                                        <span className="text-gray-500">
                                                            / 5 ({inst.reviews_count})
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="italic text-gray-400">
                                                    No review
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        router.get(
                                                            route('institute.edit', inst.id),
                                                        )
                                                    }
                                                    className="rounded-md bg-[#42C2FF] p-2 text-white"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(inst.id)
                                                    }
                                                    className="rounded-md bg-[#FF1818] p-2 text-white"
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

                    {/* ================= MOBILE ================= */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {institutes.data.map((inst: any) => (
                            <div
                                key={inst.id}
                                className="rounded-xl border bg-white p-4 shadow-sm"
                            >
                                <p className="font-semibold text-gray-800">
                                    {inst.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Courses: {inst.total_courses}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Rating:{' '}
                                    {inst.rating
                                        ? `⭐ ${inst.rating} (${inst.reviews_count})`
                                        : 'No review'}
                                </p>

                                <div className="mt-3 flex justify-end gap-2">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                route('institute.edit', inst.id),
                                            )
                                        }
                                        className="rounded-md bg-[#42C2FF] p-2 text-white"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(inst.id)
                                        }
                                        className="rounded-md bg-[#FF1818] p-2 text-white"
                                    >
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

InstituteList.layout = (page: React.ReactNode) => (
    <LMSLayout title="Institutes">{page}</LMSLayout>
);
