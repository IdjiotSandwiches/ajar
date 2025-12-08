import FilterStudent from '@/components/filter/student';
import FilterTeacher from '@/components/filter/teacher';
import CourseCard from '@/components/ui/course-card';
import { CategoryProps } from '@/interfaces/shared';
import AppLayout from '@/layouts/app-layout';
import { Head, InfiniteScroll, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function CourseListPage({
    activeCategory,
    parentCategories,
    courses,
    subCategories,
    activeSub,
    search,
    studentFilter,
    price,
}: {
    activeCategory: number;
    parentCategories: CategoryProps[];
    courses: any;
    subCategories: CategoryProps[];
    activeSub: number[];
    search: string;
    studentFilter: any;
    price: any;
}) {
    const [localSearch, setLocalSearch] = useState<string>(search ?? '');
    const handleFilterChange = (options: {
        category_id?: number;
        search?: string;
        enter?: boolean;
        sub?: number[];
        rating?: number[];
        priceMin?: number;
        priceMax?: number;
    }) => {
        const { category_id, search: s, enter, sub, rating, priceMin, priceMax } = options;
        const isCategoryChanged = category_id !== undefined && Number(category_id) !== Number(activeCategory);
        const newSearch = isCategoryChanged ? '' : (s ?? localSearch ?? search);
        const newSub = isCategoryChanged ? [] : (sub ?? activeSub);
        const newRating = isCategoryChanged ? [] : (rating ?? studentFilter.rating);
        const newPriceMin = isCategoryChanged ? undefined : Number(priceMin ?? studentFilter.price_min ?? price.min);
        const newPriceMax = isCategoryChanged ? undefined : Number(priceMax ?? studentFilter.price_max ?? price.max);

        setLocalSearch(newSearch);
        if (enter || category_id !== undefined) {
            router.visit(route('list-course'), {
                data: {
                    category_id: category_id ?? activeCategory,
                    search: newSearch,
                    sub: newSub,
                    rating: newRating,
                    price_min: newPriceMin,
                    price_max: newPriceMax,
                },
                only: ['courses', 'activeCategory', 'subCategories', 'activeSub', 'studentFilter'],
                reset: ['courses', 'price'],
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }
    };

    useEffect(() => {
    if (!activeCategory) {
        const techCategory = parentCategories.find(
            (cat) => cat.name.toLowerCase() === "technology"
        );

        if (techCategory) {
            router.visit(route("list-course"), {
                data: {
                    category_id: techCategory.id,
                },
                only: ["courses", "activeCategory", "subCategories", "activeSub", "studentFilter"],
                replace: true,
            });
        }
    }
}, []);


    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    return (
        <>
            <Head title="Course List" />
            <section className="min-h-screen bg-[#F7FDFD] px-6 pb-24 md:px-12">
                <div className="flex w-full flex-col items-center pt-12">
                    <div className="relative mb-8 flex w-[240px] flex-col items-center">
                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#D8F4FF]" />
                        <div className="relative flex w-full justify-between">
                            {parentCategories.map((cat) => (
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
                                placeholder={`Search courses...`}
                                className="w-full rounded-full border border-[#D8F4FF] bg-white px-4 py-2 pr-10 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
                            />
                            <button
                                onClick={() => handleFilterChange({ enter: true })}
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-[#3ABEFF] p-2 text-white transition hover:bg-[#3ABEFF]/90"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative">
                            {user?.role_id === roles.Teacher || user?.role_id === roles.Institute ? (
                                <FilterTeacher categories={subCategories} activeSub={activeSub} handleFilterChange={handleFilterChange} />
                            ) : (
                                <FilterStudent studentFilter={studentFilter} price={price} handleFilterChange={handleFilterChange} />
                            )}
                        </div>
                    </div>
                </div>

                <InfiniteScroll
                    buffer={1}
                    loading={() => 'Loading more courses...'}
                    data="courses"
                    className="mt-10 grid grid-cols-1 justify-items-center gap-6 transition-all duration-500 ease-in-out sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                >
                    {courses.data.length == 0 ? (
                        <p className="text-gray-500">Course empty.</p>
                    ) : (
                        courses.data.map((course: any, index: number) => <CourseCard key={index} course={course} isTag={false} />)
                    )}
                </InfiniteScroll>
            </section>
        </>
    );
}

CourseListPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
