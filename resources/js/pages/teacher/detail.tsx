
import TeacherProfileCard from "@/components/teacher/card";
import ReviewSection from "@/components/teacher/review";
import CourseCard from "@/components/ui/course-card";
import { dummyCourses } from "@/dummy-data/dummy-course";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";
import { CourseData } from "@/interfaces/shared";
import AppLayout from "@/layouts/app-layout";
import { usePage } from "@inertiajs/react";
import { Album, BriefcaseBusiness, FileBadge, GraduationCap, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TeacherDetailPage() {
    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "");

    const { props } = usePage();
    const teacherName = props.teacherName;
    const teacher = dummyTeachers.find((i) => slugify(i.name) === teacherName);

    const [courses, setCourses] = useState<CourseData[]>([]);

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        setCourses(dummyCourses);
    }, []);

    if (!teacher) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Teacher not found.
            </div>
        );
    }

    return (
        <>
            <div className="w-full min-h-screen bg-[#F9FCFF] pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                    <div>
                        <TeacherProfileCard teacher={teacher} />
                        <div className="w-full flex flex-col mt-6">
                            <button className="w-full bg-[#42C2FF] text-white py-2 rounded-lg font-medium mb-3 hover:bg-[#34a9dd] transition">
                                Accept
                            </button>
                            <button className="w-full border border-[#42C2FF] text-[#42C2FF] py-2 rounded-lg font-medium hover:bg-[#42C2FF]/10 transition">
                                Reject
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-8">
                        <div className="border border-gray-200 bg-white shadow rounded-xl p-4 md:p-6 w-full">
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="flex items-start gap-2">
                                    <GraduationCap size={24} className="text-[#42C2FF]" />
                                    <h3 className="text-gray-700 font-semibold">Graduate</h3>
                                </div>
                                <div className="pl-1 md:pl-0 md:col-span-2 space-y-2 text-gray-600">
                                    {teacher.graduates?.map((item, index) => (
                                        <div key={index}>
                                            <p className="text-sm opacity-70">{item.degree_title}</p>
                                            <p>{item.university_name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-[#42C2FF]/30 my-6" />

                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="flex items-start gap-2">
                                    <BriefcaseBusiness size={24} className="text-[#42C2FF]" />
                                    <h3 className="text-gray-700 font-semibold">Work Experience</h3>
                                </div>
                                <div className="pl-1 md:pl-0 md:col-span-2 space-y-3 text-gray-600">
                                    {teacher.works?.map((item, index) => (
                                        <div key={index}>
                                            <p className="text-sm opacity-70">{item.duration} tahun</p>
                                            <p>{item.institution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-[#42C2FF]/30 my-6" />

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="flex items-start gap-2">
                                    <FileBadge size={24} className="text-[#42C2FF]" />
                                    <h3 className="text-gray-700 font-semibold">Certificate</h3>
                                </div>
                                <div className="pl-1 md:pl-0 md:col-span-2 flex flex-col gap-3">
                                    {teacher.certificates?.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                const imageUrl = typeof item === "string"
                                                    ? item
                                                    : URL.createObjectURL(item);
                                                setPreviewImage(imageUrl);
                                            }}
                                            className="flex items-center gap-3 bg-[#42C2FF]/20 border border-[#42C2FF]/40 rounded-lg px-3 py-2 text-left hover:bg-[#42C2FF]/30 transition"
                                        >
                                            <img
                                                src={item || "/images/certificate-placeholder.png"}
                                                className="w-14 h-10 object-cover rounded"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Certificate {index + 1}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 md:p-6">
                            <div className="flex gap-2 mb-4">
                                <Album size={24} className="text-[#42C2FF]" />
                                <h3 className="text-gray-700 font-semibold">Courses taught</h3>
                            </div>
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#42C2FF]/30 scrollbar-track-transparent">
                                {courses.map((course: any, index: number) => {
                                    return <CourseCard key={index} course={course} isTag={false} />
                                })}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 md:p-6">
                            <div className="flex gap-2 mb-4">
                                <Star size={24} className="text-[#42C2FF]" />
                                <h3 className="text-gray-700 font-semibold">Reviews</h3>
                            </div>
                            <ReviewSection />
                        </div>
                    </div>
                </div>
            </div>
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative">
                        <img
                            src={previewImage}
                            className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-lg border-4 border-white object-contain"
                        />
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow text-gray-600 hover:bg-gray-100 hover:text-[#42C2FF]"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}


TeacherDetailPage.layout = (page: React.ReactNode) => (
    <AppLayout useContainer={false}>{page}</AppLayout>
);
