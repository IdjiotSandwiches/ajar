import CourseStatusCard from '@/components/institute/course-taken-card';
import { coursesTakenFilter } from '@/components/lms/filter/dictionary/courses-taken';
import Filter from '@/components/lms/filter/filter';
import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router, usePage } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import React from 'react';

export default function CoursesTakenPage({ courses, filters }: any) {
    const { props } = usePage();
    const status = Object.values(props.enums?.course_status_enum || {});

    const onFilterChange = (filters: any) => {
        router.reload({
            data: {
                search: filters.search,
                status: filters.status,
                time: filters.time,
                date: filters.date,
            },
        });
    };
    return (
        <div className="flex min-h-screen flex-col gap-6">
            <Filter schema={coursesTakenFilter(status, filters)} onChange={onFilterChange} />
            <div className="mx-auto w-full rounded-2xl border p-4 shadow-sm lg:p-8 dark:border-white/20 dark:shadow-white/20">
                <h3 className="mb-6 text-xl font-semibold">Course List</h3>
                <div>
                    {courses.data?.length === 0 ? (
                        <>
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                            <BookOpen className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />

                            <p className="text-base font-semibold text-gray-700 dark:text-white">
                                No courses found
                            </p>

                            <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-white/70">
                                There are no courses enrolled right now.
                            </p>
                        </div>
                        </>
                    ) : (
                        <>
                            {courses.data?.map((course: any, index: number) => <CourseStatusCard key={index} {...course} />)}
                            <Pagination links={courses.links} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

CoursesTakenPage.layout = (page: React.ReactNode) => <LMSLayout title="Courses Taken">{page}</LMSLayout>;
