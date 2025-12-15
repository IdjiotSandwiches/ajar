import TeacherProfileCard from '@/components/teacher/card';
import ReviewSection from '@/components/teacher/review';
import CourseCard from '@/components/ui/course-card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Album, BriefcaseBusiness, FileBadge, GraduationCap, Star, X } from 'lucide-react';
import React, { useState } from 'react';

export default function TeacherDetailPage({ teacher, application }: any) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    if (!teacher) {
        return <div className="flex min-h-screen items-center justify-center text-gray-500">Teacher not found.</div>;
    }

    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    return (
        <>
            <Head title={teacher?.user?.name || "Not Found"} />
            <div className="min-h-screen w-full bg-[#F9FCFF] pb-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pt-6 sm:px-6 md:grid-cols-3 md:gap-8">
                    <div>
                        <TeacherProfileCard teacher={teacher} />
                        {application && application?.is_verified === null && user?.role_id === roles.Institute && (
                            <div className="mt-6 flex w-full flex-col">
                                <button
                                    onClick={() => router.post(route('institute.accept-teacher', teacher?.user_id))}
                                    className="mb-3 w-full cursor-pointer rounded-lg bg-[#42C2FF] py-2 font-medium text-white transition hover:bg-[#34a9dd]"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => router.post(route('institute.reject-teacher', teacher?.user_id))}
                                    className="w-full cursor-pointer rounded-lg border border-[#42C2FF] py-2 font-medium text-[#42C2FF] transition hover:bg-[#42C2FF]/10"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="space-y-8 md:col-span-2">
                        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow md:p-6">
                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <GraduationCap size={24} className="text-[#42C2FF]" />
                                    <h3 className="font-semibold text-gray-700">Graduate</h3>
                                </div>
                                <div className="space-y-2 pl-1 text-gray-600 md:col-span-2 md:pl-0">
                                    {teacher.graduates?.map((item: any, index: number) => (
                                        <div key={index}>
                                            <p className="text-sm opacity-70">{item.degree_title}</p>
                                            <p>{item.university_name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-6 border-[#42C2FF]/30" />

                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <BriefcaseBusiness size={24} className="text-[#42C2FF]" />
                                    <h3 className="font-semibold text-gray-700">Work Experience</h3>
                                </div>
                                <div className="space-y-3 pl-1 text-gray-600 md:col-span-2 md:pl-0">
                                    {teacher.work_experiences?.map((item: any, index: number) => (
                                        <div key={index}>
                                            <p className="text-sm opacity-70">{item.duration} month</p>
                                            <p>{item.institution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-6 border-[#42C2FF]/30" />

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <FileBadge size={24} className="text-[#42C2FF]" />
                                    <h3 className="font-semibold text-gray-700">Certificate</h3>
                                </div>
                                <div className="flex flex-col gap-3 pl-1 md:col-span-2 md:pl-0">
                                    {teacher.certificates?.map((item: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => setPreviewImage(item?.image || 'https://placehold.co/400')}
                                            className="flex items-center gap-3 rounded-lg border border-[#42C2FF]/40 bg-[#42C2FF]/20 px-3 py-2 text-left transition hover:bg-[#42C2FF]/30 cursor-pointer"
                                        >
                                            <img src={item?.image || 'https://placehold.co/400'} className="h-10 w-14 rounded object-cover" />
                                            <span className="text-sm font-medium text-gray-700">Certificate {index + 1}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow md:p-6">
                            <div className="mb-4 flex gap-2">
                                <Album size={24} className="text-[#42C2FF]" />
                                <h3 className="font-semibold text-gray-700">Courses taught</h3>
                            </div>
                            <div className="scrollbar-thin scrollbar-thumb-[#42C2FF]/30 scrollbar-track-transparent flex gap-6 overflow-x-auto pb-4">
                                {teacher.teacher_schedules.map((course: any, index: number) => {
                                    return <CourseCard key={index} course={course.course} isTag={false} />;
                                })}
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow md:p-6">
                            <div className="mb-4 flex gap-2">
                                <Star size={24} className="text-[#42C2FF]" />
                                <h3 className="font-semibold text-gray-700">Reviews</h3>
                            </div>
                            <ReviewSection reviews={teacher.reviews} />
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
                            className="absolute -top-4 -right-4 rounded-full bg-white p-2 text-gray-600 shadow hover:bg-gray-100 hover:text-[#42C2FF]"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

TeacherDetailPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
