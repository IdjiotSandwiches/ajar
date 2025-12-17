import { StatusTabs } from '@/components/lms/applications-teacher/status-switch';
import Filter from '@/components/lms/filter/institute/filter-mycourses';
import CourseCard from '@/components/ui/course-card';
import LMSLayout from '@/layouts/lms-layout';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function TeacherApplyCourses({ courses, categories, counts, state }: any) {
    const { props } = usePage();
    const states = props.enums?.state_enum;

    const [activeStatus, setActiveStatus] = useState<number>(state || states.Available);
    const onFilterChange = (filters: any, value: any) => {
        setActiveStatus(value ?? activeStatus);
        router.reload({
            data: {
                search: filters.search,
                status: value || activeStatus,
                category_id: filters.category,
            },
        });
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold text-gray-800">Apply to Teach Courses</h1>
                <p className="text-gray-500">Pilih kursus yang ingin Anda ajar atau kelola pengajuan Anda.</p>
            </header>
            <StatusTabs active={activeStatus} onChange={onFilterChange} counts={counts} states={states} accepted={'My Courses'} />
            <Filter key={activeStatus} categories={categories} onFilterChange={onFilterChange} />

            {courses.data?.length === 0 ? (
                <p className="py-10 text-sm text-gray-500 italic">Tidak ada kursus pada kategori ini.</p>
            ) : (
                <InfiniteScroll
                    buffer={1}
                    loading={() => 'Loading more courses...'}
                    data="courses"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                >
                    {courses.data?.map((course: any, index: number) => <CourseCard key={index} course={course} isTag={false} />)}
                </InfiniteScroll>
            )}
        </div>
    );
}

TeacherApplyCourses.layout = (page: React.ReactNode) => <LMSLayout title="Apply Courses">{page}</LMSLayout>;
