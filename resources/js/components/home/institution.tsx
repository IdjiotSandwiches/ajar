import { router } from '@inertiajs/react';

export default function InstitutionSection({ institutes }: any) {
    return (
        <section className="px-4 pt-6 pb-10 sm:px-6 md:px-12 md:pt-10 md:pb-16">
            <div className="mb-6 flex items-center justify-between md:mb-8">
                <h2 className="-gray-800 text-base font-semibold sm:text-lg md:text-xl">Institutions with the Best Teachers</h2>

                <button
                    className=":text-sm text-xs font-medium text-[#3ABEFF] hover:underline"
                    onClick={() => router.get(route('list-institute', { category_id: 1 }))}
                >
                    View All →
                </button>
            </div>
            <div className="scrollbar-thin scrollbar-thumb-[#3ABEFF]/30 -track-transparent flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 sm:gap-6 sm:pb-4 md:gap-8">
                {institutes.map((institute: any, index: number) => (
                    <div key={index} className="flex w-[90px] flex-shrink-0 snap-start flex-col items-center sm:w-[110px] md:w-[120px]">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#3ABEFF]/20 bg-gray-100 shadow-sm sm:h-24 sm:w-24 md:h-24 md:w-24">
                            <img
                                src={institute?.user?.profile_picture || 'https://placehold.co/400'}
                                alt={institute?.user?.name}
                                className="h-full w-full cursor-pointer object-cover"
                                onClick={() => router.get(route('detail-institute', institute?.user_id))}
                            />
                        </div>

                        <p className="mt-2 line-clamp-2 text-center text-xs font-medium text-gray-600 dark:text-white sm:mt-3 sm:text-sm">{institute?.user?.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
