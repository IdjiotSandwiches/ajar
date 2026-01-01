import DynamicModal from '@/components/modal/modal';
import TeacherProfileCard from '@/components/teacher/card';
import ReviewSection from '@/components/teacher/review';
import CourseCard from '@/components/ui/course-card';
import AppLayout from '@/layouts/app-layout';
import { storageUrl } from '@/utils/storage';
import { Head, router, usePage } from '@inertiajs/react';
import { Album, BriefcaseBusiness, FileBadge, GraduationCap, Star, X } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherDetailPage({ teacher, application }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState<'accept' | 'reject' | null>(null);

    const openConfirmModal = (action: 'accept' | 'reject') => {
        setConfirmAction(action);
        setShowConfirmModal(true);
    };

    const handleConfirmAction = () => {
        if (!confirmAction) return;

        if (confirmAction === 'accept') {
            router.post(route('institute.accept-teacher', teacher?.user_id));
        }

        if (confirmAction === 'reject') {
            router.post(route('institute.reject-teacher', teacher?.user_id));
        }

        setShowConfirmModal(false);
        setConfirmAction(null);
    };

    if (!teacher) {
        return <div className="flex min-h-screen items-center justify-center text-gray-500">Teacher not found.</div>;
    }

    return (
        <>
            <Head title={teacher?.user?.name || "Not Found"} />
            <div className="min-h-screen w-full py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-6 sm:px-6 md:grid-cols-3 md:gap-8">
                    <div>
                        <TeacherProfileCard teacher={teacher} />
                        {application && application?.is_verified === null && user?.role_id === roles.Institute && (
                            <div className="mt-6 flex w-full flex-col">
                                <button
                                    // onClick={() => router.post(route('institute.accept-teacher', teacher?.user_id))}
                                    onClick={() => openConfirmModal('accept')}
                                    className="mb-3 w-full cursor-pointer rounded-lg bg-[#3ABEFF] py-2 font-medium text-white transition hover:bg-[#34a9dd]"
                                >
                                    Accept
                                </button>
                                <button
                                    // onClick={() => router.post(route('institute.reject-teacher', teacher?.user_id))}
                                    onClick={() => openConfirmModal('reject')}
                                    className="w-full cursor-pointer rounded-lg border border-[#3ABEFF] py-2 font-mum text-[#3ABEFF] transition hover:bg-[#3ABEFF]/10"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="space-y-8 md:col-span-2">
                        <div className="w-full rounded-xl border dark:border-white/20 p-4 shadow dark:shadow-white/20 md:p-6">
                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <GraduationCap size={24} className="text-[#3ABEFF]" />
                                    <h3 className="font-semibold text-gray-700 dark:text-white/90">Graduate</h3>
                                </div>
                                <div className="space-y-2 pl-1 text-gray-600 dark:text-white/80 md:col-span-2 md:pl-0">
                                    {teacher.graduates && teacher.graduates.length > 0 ? (
                                        teacher.graduates.map((item: any, index: number) => (
                                            <div key={index}>
                                                <p className="text-sm opacity-70">{item.degree_title}</p>
                                                <p>{item.university_name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-white/70">
                                            No education history available.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="my-6 border-[#3ABEFF]/30" />

                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <BriefcaseBusiness size={24} className="text-[#3ABEFF]" />
                                    <h3 className="font-semibold text-gray-700 dark:text-white/90">Work Experience</h3>
                                </div>
                                <div className="space-y-3 pl-1 text-gray-600 dark:text-white/80 md:col-span-2 md:pl-0">
                                    {teacher.work_experiences && teacher.work_experiences.length > 0 ? (
                                        teacher.work_experiences.map((item: any, index: number) => (
                                            <div key={index}>
                                                <p className="text-sm opacity-70">{item.duration} month</p>
                                                <p>{item.institution}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-white/70">
                                            No work experience available.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="my-6 border-[#3ABEFF]/30" />

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <FileBadge size={24} className="text-[#3ABEFF]" />
                                    <h3 className="font-semibold text-gray-700 dark:text-white/90">Certificate</h3>
                                </div>
                                <div className="flex flex-col gap-3 pl-1 md:col-span-2 md:pl-0">
                                    {teacher.certificates && teacher.certificates.length > 0 ? (
                                        teacher.certificates.map((item: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setPreviewImage(storageUrl(item?.image))}
                                                className="flex items-center gap-3 rounded-lg border border-[#3ABEFF]/40 bg-[#3ABEFF]/20 px-3 py-2 text-left transition hover:bg-[#3ABEFF]/30 cursor-pointer"
                                            >
                                                <img
                                                    src={storageUrl(item?.image) || 'https://placehold.co/400'}
                                                    className="h-10 w-14 rounded object-cover"
                                                />
                                                <span className="text-sm font-medium text-gray-700 dark:text-white/90">
                                                    Certificate {index + 1}
                                                </span>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-white/70">
                                            No certificates available.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border dark:border-white/20 p-4 shadow dark:shadow-white/20 md:p-6">
                            <div className="mb-4 flex gap-2">
                                <Album size={24} className="text-[#3ABEFF]" />
                                <h3 className="font-semibold text-gray-700 dark:text-white/90">Courses taught</h3>
                            </div>
                            <div className="scrollbar-thin scrollbar-thumb-[#42C2FF]/30 scrollbar-track-transparent flex gap-6 overflow-x-auto pb-4">
                                {teacher.teaching_courses && teacher.teaching_courses.length > 0 ? (
                                    teacher.teaching_courses.map((course: any, index: number) => (
                                        <CourseCard key={index} course={course.course} isTag={false} />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-white/70">
                                        No courses taught yet.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="rounded-xl border dark:border-white/20 p-4 shadow md:p-6">
                            <div className="mb-4 flex gap-2">
                                <Star size={24} className="text-[#3ABEFF]" />
                                <h3 className="font-semibold text-gray-700 dark:text-white/90">Reviews</h3>
                            </div>

                            {teacher.reviews && teacher.reviews.length > 0 ? (
                                // <ReviewSection reviews={teacher.reviews} />
                                <></>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-white/70">
                                    No reviews available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative">
                        <img src={previewImage} className="max-h-[80vh] max-w-[90vw] rounded-xl border-4 border-white object-contain shadow-lg" />
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-4 -right-4 rounded-full bg-white p-2 text-gray-600 shadow hover:bg-gray-100 hover:text-[#3ABEFF]"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

            <DynamicModal
                type="confirmation"
                isOpen={showConfirmModal}
                onClose={() => {
                    setShowConfirmModal(false);
                    setConfirmAction(null);
                }}
                onConfirm={handleConfirmAction}
                description={
                    confirmAction === 'accept'
                        ? `Are you sure you want to accept ${teacher.user.name} as a teacher?`
                        : `Are you sure you want to reject ${teacher.user.name}'s application?`
                }
            />
        </>
    );
}

TeacherDetailPage.layout = (page: React.ReactNode) => <AppLayout >{page}</AppLayout>;
