import InstituteCard from '@/components/institute/card';
import { StatusTabs } from '@/components/lms/applications-teacher/status-switch';
import { instituteApplicationFilter } from '@/components/lms/filter/dictionary/institute-application';
import Filter from '@/components/lms/filter/filter';
import LMSLayout from '@/layouts/lms-layout';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ApplyTeacherInstitutePage({ institutes, counts, state, categories }: any) {
    const { props } = usePage();
    const states = (({ Accepted, ...rest }: any) => ({ ...rest, 'My Institute': Accepted }))(props.enums?.state_enum ?? {});

    const [activeStatus, setActiveStatus] = useState<number>(state || states.Available);
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
        <section>
            <div className="space-y-6">
                <StatusTabs active={activeStatus} onChange={handleStatusChange} counts={counts} states={states} />
                <Filter key={activeStatus} schema={instituteApplicationFilter(categories)} onChange={handleFilterChange} />
                {institutes.data?.length === 0 ? (
                    <p className="py-20 text-center text-gray-500 italic">Tidak ada institute pada kategori ini.</p>
                ) : (
                    <InfiniteScroll
                        buffer={1}
                        loading={() => 'Loading more institutes...'}
                        data="institutes"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                    >
                        {institutes.data?.map((institute: any, index: number) => (
                            <InstituteCard key={index} institute={institute} showTeacher={false} />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </section>
    );
}

ApplyTeacherInstitutePage.layout = (page: React.ReactNode) => <LMSLayout title="Apply as Institute's Teachers">{page}</LMSLayout>;
