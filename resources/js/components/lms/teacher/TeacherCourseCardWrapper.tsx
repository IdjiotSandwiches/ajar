
import CourseCard from "@/components/ui/course-card";
import { router } from "@inertiajs/react";
import TeacherCourseScheduleSection from "./TeacherCourseScheduleSection";

export default function TeacherCourseCardWrapper({ course }: { course: any }) {
    return (
        <div className="md:flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden p-4">
            <div className="min-w-xs">
                <CourseCard course={course} isTag={false} />

                <button
                    type="button"
                    onClick={() => router.get(route("teacher.add-schedule", course.id))}
                    className="rounded-lg bg-[#3ABEFF] w-full py-2 mt-4 font-semibold text-white transition-all hover:bg-[#3ABEFF]/90"
                >
                    Add Schedule
                </button>
            </div>

            <TeacherCourseScheduleSection
                schedules={course.schedules}
                onAddSchedule={() =>
                    router.get(route("teacher.add-schedule", course.id))
                }
            />
        </div>
    );
}
