import { useState } from "react";
import LMSLayout from "@/layouts/lms-layout";
import {
    availableCourses,
    pendingCourses,
    joinedCourses,
} from "@/dummy-data/dummy-courses";
import CourseCard from "@/components/ui/course-card";
import { CourseStatusSwitch } from "@/components/lms/applications-teacher/CourseStatusSwitch";
import { courseApplicationFilter } from "@/components/lms/filter/dictionary/course-application";
import Filter from "@/components/lms/filter/filter";

type CourseStatus = "available" | "pending" | "joined";

export default function TeacherApplyCourses() {
    const [activeStatus, setActiveStatus] =
        useState<CourseStatus>("available");

    const courseMap: Record<CourseStatus, any[]> = {
        available: availableCourses,
        pending: pendingCourses,
        joined: joinedCourses,
    };

    return (
        <div className="space-y-4">
            <CourseStatusSwitch
                active={activeStatus}
                onChange={setActiveStatus}
                labels={{
                    available: "Available",
                    pending: "Pending",
                    joined: "My Courses",
                }}
                counts={{
                    available: availableCourses.length,
                    pending: pendingCourses.length,
                    joined: joinedCourses.length,
                }}
            />

            <Filter
                schema={courseApplicationFilter}
                onChange={(filters: any) => {
                    console.log(filters);
                }}
            />

            {courseMap[activeStatus].length === 0 ? (
                <p className="py-20 text-center text-gray-500 italic">
                    Tidak ada kursus pada kategori ini.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {courseMap[activeStatus].map((course: any) => (
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
    <LMSLayout title="Apply as Course's Teacher">{page}</LMSLayout>
);
