import { coursesTaughtFilter } from '@/components/lms/filter/dictionary/course-taught';
import Filter from '@/components/lms/filter/filter';
import TeacherCourseCardWrapper from '@/components/lms/teacher/TeacherCourseCardWrapper';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router, usePage } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import React from 'react';

export default function TeacherCourses({ teachings, categories, filters }: any) {
    const { props } = usePage();
    const days = Object.values(props.enums?.days_enum || {});

    const reload = (filters: any) => {
        router.reload({
            data: {
                search: filters.search,
                category_id: filters.category,
                day: filters.day,
                time: filters.time,
            },
        });
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <Filter schema={coursesTaughtFilter(categories, days, filters)} onChange={reload} />
            <button
                type="button"
                onClick={() => router.get(route('teacher.get-weekly-course'))}
                className="mt-4 w-full rounded-lg bg-[#42C2FF] py-2 font-semibold text-white transition-all hover:bg-[#42C2FF]/90"
            >
                Add Schedule
            </button>
            {teachings.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <BookOpen className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />

                    <p className="text-base font-semibold text-gray-700 dark:text-white">
                        No courses taught
                    </p>

                    <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-white/70">
                        You are not teaching any courses yet.
                        Try to apply teachings in the available courses.
                    </p>
                </div>
            ) : (
                <>
                    {teachings.data.map((teaching: any, index: number) => (
                        <TeacherCourseCardWrapper key={index} course={teaching} />
                    ))}
                    <Pagination links={teachings.links} />
                </>
            )}
        </div>
    );
}

TeacherCourses.layout = (page: React.ReactNode) => <LMSLayout title="Courses Taught">{page}</LMSLayout>;
