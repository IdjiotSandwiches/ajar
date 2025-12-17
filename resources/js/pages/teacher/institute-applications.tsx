import InstituteCard from '@/components/institute/card';
import Filter from '@/components/lms/filter/institute/filter-mycourses';
import LMSLayout from '@/layouts/lms-layout';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function StatusTabs({ active, onChange, counts, states }: any) {
    return (
        <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
            {Object.entries(states).map(([label, value]: any) => (
                <button
                    key={label}
                    onClick={() => onChange({}, value)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                        active === value ? 'bg-white text-gray-800 shadow' : 'text-gray-500 hover:text-gray-700'
                    } `}
                >
                    {value === states.Available && 'Available'}
                    {value === states.Pending && 'Pending'}
                    {value === states.Accepted && 'My Institutes'}
                    <span className="ml-1 text-xs text-gray-400">({counts[value]})</span>
                </button>
            ))}
        </div>
    );
}

export default function ApplyTeacherInstitutePage({ institutes, counts, state }: any) {
    const { props } = usePage();
    const states = props.enums?.state_enum;

    const [activeStatus, setActiveStatus] = useState<number>(state || states.Available);
    const onFilterChange = (filters: any, value: any) => {
        setActiveStatus(value ?? activeStatus);
        router.reload({
            data: {
                search: filters.search,
                status: value || activeStatus,
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
                    <StatusTabs active={activeStatus} onChange={onFilterChange} counts={counts} states={states} />
                    <Filter onFilterChange={onFilterChange} />
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
