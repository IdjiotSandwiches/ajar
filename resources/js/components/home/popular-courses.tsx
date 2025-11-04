import { router } from '@inertiajs/react';
import CourseCard from '../ui/course-card';

export default function PopularCourses({ courses }: { courses: any[] }) {
    return (
        <section className="bg-[#F7FDFD] px-6 py-16 md:px-12">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">Popular Courses</h2>
                <button className="text-sm font-medium text-[#3ABEFF] hover:underline" onClick={() => router.get(route('list-course'))}>
                    View All Courses →
                </button>
            </div>

            {/* Scrollable horizontal */}
            <div className="scrollbar-thin scrollbar-thumb-[#3ABEFF]/30 scrollbar-track-transparent flex gap-6 overflow-x-auto pb-4">
                {courses.map((course: any, index: number) => {
                    return <CourseCard key={index} course={course} />;
                })}
            </div>
        </section>
    );
}
