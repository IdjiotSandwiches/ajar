import { router } from '@inertiajs/react';
import CourseCard from './course-card';

export default function CourseSection({
    title,
    courses,
    role,
    emptyTitle,
    emptyDesc,
    showCTA = false,
    isCourseFinished,
    onActionClick,
    onAddReview,
}: any) {
    return (
        <div className="rounded-2xl shadow-sm border dark:border-white/20 dark:shadow-[#ffffff]/20">
            <div className="rounded-2xl p-6 border">
                <h3 className="font-semibold text-lg mb-4">{title}</h3>

                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                        <p className="font-medium text-gray-700 mb-1 dark:text-white/80">{emptyTitle}</p>
                        <p className="text-sm mb-4 max-w-xs dark:text-white/70">{emptyDesc}</p>

                        {showCTA && role === 'student' && (
                            <button
                                onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                className="bg-[#3ABEFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3ABEFF]/90 transition"
                            >
                                Browse Courses
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {courses.map((course: { id: any; status: any; }) => (
                            <CourseCard
                                key={course.id}
                                {...course}
                                role={role}
                                status={course.status}
                                isCourseFinished={isCourseFinished(course)}
                                onActionClick={() => onActionClick(course)}
                                onAddReview={() => onAddReview(course)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
