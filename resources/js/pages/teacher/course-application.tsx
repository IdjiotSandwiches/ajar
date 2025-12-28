import { StatusTabs } from '@/components/lms/applications-teacher/status-switch';
import { courseApplicationFilter } from '@/components/lms/filter/dictionary/course-application';
import Filter from '@/components/lms/filter/filter';
import CourseCard from '@/components/ui/course-card';
import LMSLayout from '@/layouts/lms-layout';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function TeacherApplyCourses({ courses, categories, counts, filters }: any) {
    const { props } = usePage();
    const states = (({ Accepted, ...rest }: any) => ({ ...rest, 'My Courses': Accepted }))(props.enums?.state_enum ?? {});

    const [activeStatus, setActiveStatus] = useState<number>(filters.state || states.Available);
    const reload = (status: any, filters: any) => {
        router.reload({
            data: {
                search: filters.search,
                status: status || activeStatus,
                category_id: filters.category,
            },
        });
    };

    const handleStatusChange = (status: any) => {
        setActiveStatus(status || activeStatus);
        reload(status, {});
    };

    const handleFilterChange = (filters: any) => {
        reload(activeStatus, filters);
    };

    return (
        <>
            <section className="min-h-screen">
                <div className="space-y-6">
                    <StatusTabs active={activeStatus} onChange={handleStatusChange} counts={counts} states={states} />
                    <Filter schema={courseApplicationFilter(categories, filters)} onChange={handleFilterChange} />
                    {courses.data?.length === 0 ? (
                        <p className="py-10 text-center text-sm text-gray-500 italic">Tidak ada kursus pada kategori ini.</p>
                    ) : (
                        <InfiniteScroll
                            buffer={1}
                            loading={() => 'Loading more courses...'}
                            data="courses"
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                        >
                            {courses.data?.map((course: any, index: number) => (
                                <CourseCard key={index} course={course} isTag={false} showTeacher={false} />
                            ))}
                        </InfiniteScroll>
                    )}
                </div>
            </section>
        </>
    );
}

TeacherApplyCourses.layout = (page: React.ReactNode) => <LMSLayout title="Apply as Course's Teacher">{page}</LMSLayout>;
