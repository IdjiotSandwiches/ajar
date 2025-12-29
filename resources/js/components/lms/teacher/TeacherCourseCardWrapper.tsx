import CourseCard from '@/components/ui/course-card';
import TeacherCourseScheduleSection from './TeacherCourseScheduleSection';

export default function TeacherCourseCardWrapper({ course }: any) {
    return (
        <div className="overflow-hidden rounded-xl border dark:border-white/20 bg-white dark:bg-[#222831] p-4 shadow-sm dark:shadow-[#ffffff]/20 md:flex">
            <div className="min-w-xs">
                <CourseCard course={course} isTag={false} showTeacher={false} showReview={false} />
            </div>
            <TeacherCourseScheduleSection schedules={course.schedules} />
        </div>
    );
}
