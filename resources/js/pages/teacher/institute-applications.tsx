import InstituteCard from '@/components/institute/card';
import { StatusTabs } from '@/components/lms/applications-teacher/status-switch';
import Filter from '@/components/lms/filter/institute/filter-mycourses';
import LMSLayout from '@/layouts/lms-layout';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ApplyTeacherInstitutePage({ institutes, counts, state, categories }: any) {
    const { props } = usePage();
    const states = props.enums?.state_enum;

    const [activeStatus, setActiveStatus] = useState<number>(state || states.Available);
    const onFilterChange = (filters: any, value: any) => {
        setActiveStatus(value ?? activeStatus);
        router.reload({
            data: {
                search: filters.search,
                status: value || activeStatus,
                category_id: filters.category
            },
        });
    };

    return (
        <>
            <section className="min-h-screen bg-[#F7FDFD]">
                <div className="space-y-6">
                    <header>
                        <h1 className="text-2xl font-semibold text-gray-800">Apply to Become Institute's Teachers</h1>
                        <p className="text-gray-500">Ajukan diri Anda sebagai guru di institute pilihan.</p>
                    </header>
                    <StatusTabs active={activeStatus} onChange={onFilterChange} counts={counts} states={states} accepted={'My Institutes'} />
                    <Filter key={activeStatus} categories={categories} onFilterChange={onFilterChange} />
                    {institutes.data?.length === 0 ? (
                        <p className="py-20 text-center text-gray-500 italic">Tidak ada institute pada kategori ini.</p>
                    ) : (
                        <InfiniteScroll
                            buffer={1}
                            loading={() => 'Loading more institutes...'}
                            data="institutes"
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                        >
                            {institutes.data?.map((institute: any, index: number) => <InstituteCard key={index} institute={institute} showTeacher={false} />)}
                        </InfiniteScroll>
                    )}
                </div>
            </section>
        </>
    );
}

ApplyTeacherInstitutePage.layout = (page: React.ReactNode) => <LMSLayout title="Apply as Institute's Teachers">{page}</LMSLayout>;
