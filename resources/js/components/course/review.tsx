import { usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ReviewSection({ reviews }: { reviews: any[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const gapPx = 32;
    const perPage = 2;
    const total = reviews.length;
    const maxIndex = Math.max(0, Math.ceil(total / perPage) * perPage - perPage);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const cardEl = container.querySelector<HTMLElement>('[data-card]');
        if (!cardEl) return;

        const cardWidth = cardEl.offsetWidth;
        const offset = (cardWidth + gapPx) * currentIndex;
        container.scrollTo({ left: offset, behavior: 'smooth' });
    }, [currentIndex]);

    const goLeft = () => setCurrentIndex((prev) => Math.max(0, prev - perPage));
    const goRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + perPage));

    const leftDisabled = currentIndex <= 0;
    const rightDisabled = currentIndex >= maxIndex;

    const { props } = usePage();
    const roles = props.enums?.roles_enum;

    return (
        <section className="bg-[#F7FDFD] pb-16">
            <h2 className="mb-10 text-center text-xl font-semibold text-gray-800 md:text-left">Reviews from Students and Teachers</h2>
            <div className="mx-auto grid items-center gap-16 md:grid-cols-4">
                {/* === Right section === */}
                <div className="relative flex items-center md:col-span-4">
                    {reviews.length === 0
                    ?
                        <>
                            No Reviews
                        </>
                    : (
                        <>
                            {/* Left Arrow */}
                            <button
                                onClick={goLeft}
                                disabled={leftDisabled}
                                className={`z-10 mr-4 rounded-full border bg-white p-2 shadow-md transition-opacity ${
                                    leftDisabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-100'
                                }`}
                            >
                                <ChevronLeft className="h-5 w-5 text-[#3ABEFF]" />
                            </button>

                            {/* Scroll Container */}
                            <div ref={containerRef} className="flex flex-1 gap-8 overflow-hidden scroll-smooth">
                                {reviews.map((review: any, index: number) => {
                                    const user = review.reviewer;
                                    const role = Object.keys(roles).find(key => roles[key] === user.role_id);
                                    return (
                                        <div
                                            key={index}
                                            data-card
                                            className="flex w-[48%] flex-shrink-0 flex-col justify-between rounded-lg border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md"
                                        >
                                            <div>
                                                <div className="mb-3 flex items-center gap-3">
                                                    <img src={review.avatar} alt={review.reviewer_name} className="h-10 w-10 rounded-full object-cover" />
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {user.name} - <span className="text-gray-500">{role}</span>
                                                        </p>
                                                        <p className="text-sm text-yellow-400">
                                                            {'★'.repeat(review.rating)} <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* === Review Text === */}
                                                <p className="mb-6 text-sm text-gray-600">{review.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={goRight}
                                disabled={rightDisabled}
                                className={`z-10 ml-4 rounded-full border bg-white p-2 shadow-md transition-opacity ${
                                    rightDisabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-100'
                                }`}
                            >
                                <ChevronRight className="h-5 w-5 text-[#3ABEFF]" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
