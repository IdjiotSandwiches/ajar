import CourseCard from '@/components/ui/course-card';
import TeacherCourseScheduleSection from './TeacherCourseScheduleSection';

export default function TeacherCourseCardWrapper({ course }: any) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex">
            <div className="min-w-xs">
                <CourseCard course={course} isTag={false} showTeacher={false} showReview={false} />
                {/* <button
                    type="button"
                    onClick={() => router.get(route('teacher.get-weekly-course', course.id))}
                    className="mt-4 w-full rounded-lg bg-[#42C2FF] py-2 font-semibold text-white transition-all hover:bg-[#42C2FF]/90"
                >
                    Add Schedule
                </button> */}
            </div>
            <TeacherCourseScheduleSection schedules={course.schedules} />
        </div>
    );
}
