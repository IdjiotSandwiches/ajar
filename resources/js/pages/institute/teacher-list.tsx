/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { manageTeachersFilter } from "@/components/lms/filter/dictionary/manage-teachers";
import Filter from "@/components/lms/filter/filter";
import MobileTeacherCard from "@/components/lms/filter/institute/teacher-card-list";
import DynamicModal from "@/components/modal/modal";
import Pagination from "@/components/pagination";
import LMSLayout from "@/layouts/lms-layout";
import { Head } from "@inertiajs/react";
import { Trash2, Star } from "lucide-react";
import React, { useState } from "react";

export default function TeacherList() {
    const [showModal, setShowModal] = useState(false);
    const [deleteTeacher, setDeleteTeacher] = useState<number | null>(null);

    const teachers = {
        data: [
            {
                id: 1,
                full_name: "Budi Santoso",
                avatar: "https://placehold.co/100",
                category: { name: "Web Development" },
                courses_count: 5,
                rating_avg: 4.6,
                review_count: 42,
                registered_at: "2024-01-12",
            },
            {
                id: 2,
                full_name: "Siti Rahmawati",
                avatar: "https://placehold.co/100",
                category: { name: "UI/UX Design" },
                courses_count: 3,
                rating_avg: 4.8,
                review_count: 30,
                registered_at: "2024-02-03",
            },
            {
                id: 3,
                full_name: "Andi Pratama",
                avatar: "https://placehold.co/100",
                category: { name: "Data Science" },
                courses_count: 4,
                rating_avg: 4.4,
                review_count: 21,
                registered_at: "2024-03-18",
            },
        ],
        links: [],
    };


    const handleDeleteClick = (id: number) => {
        setDeleteTeacher(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        console.log("Delete teacher with ID:", deleteTeacher);
        setShowModal(false);
    };

    return (
        <>
            <Head title="Teacher List" />

            <div className="flex min-h-screen flex-col gap-6">
                {/* <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">
                    Manage Teacher
                </h1> */}

                <Filter
                    schema={manageTeachersFilter}
                    onChange={(filters: any) => {
                        console.log(filters);
                    }}
                />

                <div className="mx-auto w-full rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Teachers</h3>
                    </div>

                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10">
                                <tr>
                                    <th className="p-3 text-center font-semibold">No</th>
                                    <th className="p-3 text-left font-semibold">Full Name</th>
                                    <th className="p-3 text-center font-semibold">
                                        Courses Taught
                                    </th>
                                    <th className="p-3 text-center font-semibold">Rating</th>
                                    <th className="p-3 text-left font-semibold">Register Date</th>
                                    <th className="p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teachers.data.map((teacher, index) => (
                                    <tr
                                        key={teacher.id}
                                        className={`border-b transition hover:bg-[#3ABEFF]/10
                                            ${index % 2 === 0
                                                ? "bg-[#f9fcff]"
                                                : "bg-white"
                                            }
                                        `}
                                    >
                                        <td className="p-3 text-center">
                                            {index + 1}
                                        </td>

                                        <td className="p-3 font-semibold">
                                            {teacher.full_name}
                                        </td>


                                        <td className="p-3 text-center font-semibold">
                                            {teacher.courses_count}
                                        </td>

                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Star
                                                    size={14}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                                <span className="font-semibold">
                                                    {teacher.rating_avg.toFixed(1)}
                                                </span>
                                                <span className="text-gray-500">
                                                    / 5 ({teacher.review_count})
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600">
                                            {new Date(teacher.registered_at).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>


                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(teacher.id)
                                                }
                                                className="rounded-md bg-[#FF1818] p-2 text-white hover:bg-[#FF1818]/90"
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
                        {teachers.data.map((teacher) => (
                            <MobileTeacherCard
                                key={teacher.id}
                                avatar={teacher.avatar}
                                fullName={teacher.full_name}
                                category={teacher.category.name}
                                coursesCount={teacher.courses_count}
                                rating={teacher.rating_avg}
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

TeacherList.layout = (page: React.ReactNode) => (
    <LMSLayout title="Manage Teachers">{page}</LMSLayout>
);
