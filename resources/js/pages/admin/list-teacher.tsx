import { manageTeacherAdminFilter } from '@/components/lms/filter/dictionary/manage-teacher-admin';
import Filter from '@/components/lms/filter/filter';
import DynamicModal from '@/components/modal/modal';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function ManageTeachersPage({ teachers }: any) {
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

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Filter
                    schema={manageTeacherAdminFilter}
                    onChange={(filters: any) => {
                        console.log(filters);
                    }}
                />

                <div className="mx-auto w-full rounded-2xl border dark:border-white/20 p-4 shadow-sm dark:shadow-white/20 backdrop-blur-sm sm:p-6 md:p-8">
                    <h3 className="mb-6 text-xl font-semibold">Teacher List</h3>

                    <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b dark:border-white/20 bg-[#3ABEFF]/10 dark:text-white">
                                <tr>
                                    <th className="p-2 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Teacher</th>
                                    {/* <th className="p-3 text-left font-semibold">Institute</th>
                                    <th className="p-3 text-left font-semibold">Courses Taught</th> */}
                                    <th className="p-3 text-left font-semibold">Register Date</th>
                                    <th className="w-24 p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teachers.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-10 text-center text-gray-500">
                                            No teachers found.
                                        </td>
                                    </tr>
                                ) : (
                                    teachers.data?.map((teacher: any, index: number) => (
                                        <tr
                                            key={teacher.id}
                                            className={`border-b dark:border-white/20 dark:text-white transition hover:bg-[#42C2FF]/10 ${index % 2 === 0
                                                ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                                : 'bg-white dark:bg-[#222831]'}`}
                                        >
                                            <td className="p-2 text-center">{index + 1}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={teacher.avatar || 'https://placehold.co/400'}
                                                        alt={teacher.name}
                                                        className="h-10 w-10 rounded-full border object-cover"
                                                    />
                                                    <span className="font-semibold">{teacher.name}</span>
                                                </div>
                                            </td>
                                            {/* <td className="p-3">
                                                {teacher.institute?.name ?? <span className="text-gray-400 italic dark:text-white/60">Not assigned</span>}
                                            </td>

                                            <td className="p-3">
                                                {teacher.courses.length === 0 ? (
                                                    <span className="text-gray-400 italic dark:text-white/60">No course</span>
                                                ) : (
                                                    <ul className="list-inside list-disc space-y-1">
                                                        {teacher.courses.map((c: any) => (
                                                            <li key={c.id}>{c.name}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </td> */}
                                            <td className="p-3 text-left">{teacher.register_date}</td>
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
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {teachers.data?.map((teacher: any) => (
                            <div key={teacher.id} className="rounded-xl border dark:border-white/20 p-4 shadow-sm dark:shadow-white/20">
                                <div className="mb-3 flex items-center gap-3">
                                    <img
                                        src={teacher.avatar || 'https://placehold.co/400'}
                                        alt={teacher.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{teacher.name}</p>
                                        {/* <p className="text-xs text-gray-500 dark:text-white/70">{teacher.institute?.name ?? 'Not assigned to institute'}</p> */}
                                    </div>
                                </div>

                                {/* <div className="mb-3 text-sm">
                                    <p className="mb-1 font-medium text-gray-700 dark:text-white/90">Courses Taught:</p>
                                    {teacher.courses.length === 0 ? (
                                        <p className="text-gray-400 italic dark:text-white/60">No course</p>
                                    ) : (
                                        <ul className="list-inside list-disc text-gray-600 dark:text-white/80">
                                            {teacher.courses.map((c: any) => (
                                                <li key={c.id}>{c.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div> */}

                                <p className="text-xs text-gray-500 dark:text-white/70">Registered on {new Date(teacher.register_date).toLocaleDateString('id-ID')}</p>

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
