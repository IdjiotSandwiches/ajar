import CourseCard from "../ui/course-card";
import { router } from "@inertiajs/react";

export default function PopularCourses({ courses }: { courses: any[] }) {
  return (
    <section className="py-16 bg-[#F7FDFD] px-6 md:px-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Popular Courses
        </h2>
        <button className="text-[#3ABEFF] font-medium hover:underline text-sm" onClick={() => router.get(route('list-course'))}>
          View All Courses →
        </button>
      </div>

      {/* Scrollable horizontal */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#3ABEFF]/30 scrollbar-track-transparent">
        {courses.map((course: any, index: number) => {
            return <CourseCard key={index} course={course} />
        })}
      </div>
    </section>
  );
}
