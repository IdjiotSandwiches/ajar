import { useState } from "react";
import LMSLayout from "@/layouts/lms-layout";
import {
    availableCourses,
    pendingCourses,
    joinedCourses,
} from "@/dummy-data/dummy-courses";
import CourseCard from "@/components/ui/course-card";
import { CourseStatusSwitch } from "@/components/lms/applications-teacher/CourseStatusSwitch";
import Filter from "@/components/lms/filter/institute/filter-mycourses";

type CourseStatus = "available" | "pending" | "joined";

export default function TeacherApplyCourses() {
    const [activeStatus, setActiveStatus] =
        useState<CourseStatus>("available");

    const dataMap = {
        available: availableCourses,
        pending: pendingCourses,
        joined: joinedCourses,
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Apply to Teach Courses
                </h1>
                <p className="text-gray-500">
                    Pilih kursus yang ingin Anda ajar atau kelola pengajuan Anda.
                </p>
            </header>

            <CourseStatusSwitch
                active={activeStatus}
                onChange={setActiveStatus}
                counts={{
                    available: availableCourses.length,
                    pending: pendingCourses.length,
                    joined: joinedCourses.length,
                }}
            />

            <Filter />

            {dataMap[activeStatus].length === 0 ? (
                <p className="text-sm text-gray-500 italic py-10">
                    Tidak ada kursus pada kategori ini.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {dataMap[activeStatus].map((course: any) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isTag={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

TeacherApplyCourses.layout = (page: React.ReactNode) => (
    <LMSLayout title="Apply Courses">{page}</LMSLayout>
);
