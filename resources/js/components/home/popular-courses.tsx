import { router } from '@inertiajs/react';
import CourseCard from '../ui/course-card';

export default function PopularCourses({ courses }: any) {
    return (
        <section className="pt-8 pb-4 md:pt-16 md:pb-8 px-4 sm:px-6 md:px-12">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="sm:text-lg md:text-xl font-semibold text-base">Popular Courses</h2>
                <button
                    className="cursor-pointer text-xs :text-sm font-medium text-[#3ABEFF] hover:underline"
                    onClick={() => router.get(route('list-course', { category_id: 1 }))}
                >
                    View All Courses →
                </button>
            </div>

            {courses.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-500 dark:text-white/80">
                    <p className="font-medium text-gray-700 dark:text-white">
                        No popular courses yet
                    </p>
                    <p className="mt-1">
                        Popular courses will appear here as students start enrolling.
                    </p>
                </div>
            ) : (
                <div className="scrollbar-thin scrollbar-thumb-[#3ABEFF]/30 scrollbar-track-transparent flex gap-6 overflow-x-auto pb-4">
                    {courses.map((course: any, index: number) => (
                        <CourseCard key={index} course={course} isTag={true} />
                    ))}
                </div>
            )}
        </section>
    );
}
