import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReviewCard from '../ui/review-card';

export default function ReviewSection({ reviews }: { reviews: any[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [perPage, setPerPage] = useState(1);
    const [cardWidth, setCardWidth] = useState(0);

    const gapPx = 32;
    const total = reviews.length;
    const maxIndex = Math.max(0, total - perPage);

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            setPerPage(width >= 1024 ? 2 : 1);
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
        const offset = cardWidth * currentIndex;
        containerRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }, [currentIndex, cardWidth]);

    const goLeft = () => setCurrentIndex((i) => Math.max(0, i - perPage));
    const goRight = () => setCurrentIndex((i) => Math.min(maxIndex, i + perPage));

    const showArrows = total > 1;

    return (
        <section className="max-w-8xl mx-auto overflow-hidden px-4 py-8 sm:px-6 md:px-12 md:py-16">
            <h2 className="mb-4 text-base font-semibold sm:text-lg md:mb-8 md:text-xl">Reviews from Students and Teachers</h2>

            {total === 0 ? (
                <p className="py-10 text-sm text-gray-500 dark:text-white/80">No review available.</p>
            ) : (
                <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-7">
                    <div className="hidden justify-center md:col-span-2 md:flex">
                        <div className="w-full max-w-[320px] min-w-[260px] rounded-2xl bg-white p-6 shadow-md dark:bg-[#222831] dark:shadow-[#ffffff]/20">
                            <img src="/images/review.jpg" className="mb-4 h-52 w-full rounded-xl object-cover" />
                            <p className="text-center text-sm text-gray-600 dark:text-white/80">
                                “Your success story starts with learning and sharing knowledge.”
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full md:col-span-5">
                        {showArrows && (
                            <>
                                <button
                                    onClick={goLeft}
                                    disabled={currentIndex <= 0}
                                    className="absolute top-1/2 left-0 z-20 -translate-x-1/3 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 disabled:opacity-40 dark:bg-[#222831] dark:shadow-[#ffffff]/20 dark:hover:bg-gray-700"
                                >
                                    <ChevronLeft className="h-5 w-5 text-[#3ABEFF]" />
                                </button>

                                <button
                                    onClick={goRight}
                                    disabled={currentIndex >= maxIndex}
                                    className="absolute top-1/2 right-0 z-20 translate-x-1/3 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 disabled:opacity-40 dark:bg-[#222831] dark:shadow-[#ffffff]/20 dark:hover:bg-gray-700"
                                >
                                    <ChevronRight className="h-5 w-5 text-[#3ABEFF]" />
                                </button>
                            </>
                        )}

                        <div className="w-full overflow-hidden">
                            <div ref={containerRef} className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        data-card
                                        className={`w-full flex-shrink-0 snap-start sm:w-[90%] md:w-[80%] ${perPage === 2 ? 'lg:w-[50%]' : 'lg:w-full'}`}
                                    >
                                        <ReviewCard review={review} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full overflow-hidden">
                            <div ref={containerRef} className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth">
                                {reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        data-card
                                        className={`w-full flex-shrink-0 snap-start sm:w-[90%] md:w-[80%] ${perPage === 2 ? 'lg:w-[50%]' : 'lg:w-full'}`}
                                    >
                                        <ReviewCard review={review} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
