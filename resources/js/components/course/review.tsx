import { storageUrl } from '@/utils/storage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ReviewSection({ reviews }: any) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [perPage, setPerPage] = useState(1);
    const [cardWidth, setCardWidth] = useState(0);

    const gapPx = 32;
    const total = reviews.length;
    const maxIndex = Math.max(0, total - perPage);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1024) setPerPage(2);
            else setPerPage(1);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        const el = containerRef.current?.querySelector('[data-card]') as HTMLElement;
        if (el) setCardWidth(el.offsetWidth + gapPx);
    }, [perPage, reviews]);

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.scrollTo({
            left: cardWidth * currentIndex,
            behavior: 'smooth',
        });
    }, [currentIndex, cardWidth]);

    const goLeft = () => setCurrentIndex((i) => Math.max(0, i - perPage));
    const goRight = () => setCurrentIndex((i) => Math.min(maxIndex, i + perPage));

    if (total === 0) {
        return (
            <section className="py-12 text-center text-sm text-gray-500 dark:text-white/80">
                <p className="font-medium text-gray-700 dark:text-white">No reviews yet</p>
                <p className="mt-1">Be the first to share your learning experience with us.</p>
            </section>
        );
    }

    return (
        <section>
            <div className="relative">
                {total > perPage && (
                    <>
                        <button
                            onClick={goLeft}
                            disabled={currentIndex <= 0}
                            className="absolute left-0 top-1/2 z-20 -translate-x-1/3 -translate-y-1/2 rounded-full bg-white p-2 shadow-md disabled:opacity-40 dark:bg-[#222831] dark:shadow-white/20"
                        >
                            <ChevronLeft className="h-5 w-5 text-[#3ABEFF]" />
                        </button>

                        <button
                            onClick={goRight}
                            disabled={currentIndex >= maxIndex}
                            className="absolute right-0 top-1/2 z-20 translate-x-1/3 -translate-y-1/2 rounded-full bg-white p-2 shadow-md disabled:opacity-40 dark:bg-[#222831] dark:shadow-white/20"
                        >
                            <ChevronRight className="h-5 w-5 text-[#3ABEFF]" />
                        </button>
                    </>
                )}

                <div className="overflow-x-hidden">
                    <div
                    ref={containerRef}
                    className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth"
                >
                    {reviews.map((review: any, index: number) => (
                        <div
                            key={index}
                            data-card
                            className={`flex-shrink-0 w-full lg:w-1/2`}
                        >
                            <div className="h-full rounded-xl border bg-white p-8 shadow-sm dark:border-white/20 dark:bg-[#222831]">
                                <div className="mb-4 flex items-center gap-3">
                                    <img
                                        src={storageUrl(review.profile_picture)}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">
                                            {review.name}
                                        </p>
                                        <p className="text-sm text-yellow-400">
                                            {'★'.repeat(review.rating)}
                                            <span className="text-gray-300">
                                                {'★'.repeat(5 - review.rating)}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-white/80">
                                    {review.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </section>
    );
}
