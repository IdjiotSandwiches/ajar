import InstituteCard from '@/components/institute/card';
import AppLayout from '@/layouts/app-layout';
import { Head, InfiniteScroll, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function InstituteListPage({ parentCategories, institutes, activeCategory, search }: any) {
    const [localSearch, setLocalSearch] = useState<string>(search ?? '');
    const handleFilterChange = (options: { category_id?: number; search?: string; enter?: boolean }) => {
        const { category_id, search: s, enter } = options;
        if (s !== undefined) setLocalSearch(s);

        let newSearch: string;

        if (category_id !== undefined && category_id !== activeCategory) {
            setLocalSearch('');
            newSearch = s ?? '';
        } else {
            newSearch = localSearch ?? search;
        }

        if (enter || category_id !== undefined) {
            router.visit(route('list-institute'), {
                data: {
                    category_id: category_id ?? activeCategory,
                    search: newSearch,
                },
                only: ['institutes', 'activeCategory'],
                reset: ['institutes'],
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }
    };

    return (
        <>
            <Head title="Institute List" />
            <section className="min-h-screen bg-[#F7FDFD] px-6 pb-24 md:px-12">
                <div className="flex w-full flex-col items-center pt-12">
                    <div className="relative mb-8 flex w-[240px] flex-col items-center">
                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D8F4FF]" />
                        <div className="relative flex w-full justify-between">
                            {parentCategories.map((cat: any) => (
                                <div key={cat.id} className="relative flex w-1/2 justify-center">
                                    <button
                                        onClick={() => handleFilterChange({ category_id: cat.id })}
                                        className={`relative pb-2 text-lg font-semibold transition-all md:text-xl ${
                                            Number(activeCategory) === cat.id ? 'text-[#3ABEFF]' : 'text-gray-400 hover:text-[#3ABEFF]'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                </div>
                            ))}
                            <span
                                className={`absolute bottom-0 h-[2px] bg-[#3ABEFF] transition-all duration-300 ease-in-out ${
                                    activeCategory == null
                                        ? 'hidden'
                                        : Number(activeCategory) === parentCategories[0].id
                                        ? 'left-0 w-1/2'
                                        : 'left-1/2 w-1/2'
                                } `}
                            />
                        </div>
                    </div>
                    <div className="flex w-full max-w-3xl items-center justify-center gap-3">
                        <div className="relative max-w-md flex-1">
                            <input
                                type="text"
                                value={localSearch}
                                onChange={(e) => handleFilterChange({ search: e.target.value })}
                                onKeyDown={(e) => e.key === 'Enter' && handleFilterChange({ enter: true })}
                                placeholder={`Search institutes...`}
                                className="w-full rounded-full border border-[#D8F4FF] bg-white px-4 py-2 pr-10 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
                            />
                            <button
                                onClick={() => handleFilterChange({ enter: true })}
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-[#3ABEFF] p-2 text-white transition hover:bg-[#3ABEFF]/90"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <InfiniteScroll
                    buffer={1}
                    loading={() => 'Loading more institutes...'}
                    data="institutes"
                    className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                >
                    {institutes.data.length == 0 ? (
                        <p className="text-gray-500">Institute empty.</p>
                    ) : (
                        institutes.data.map((institute: any, index: number) => <InstituteCard key={index} institute={institute} />)
                    )}
                </InfiniteScroll>
            </section>
        </>
    );
}

InstituteListPage.layout = (page: any) => <AppLayout useContainer={false}>{page}</AppLayout>;
