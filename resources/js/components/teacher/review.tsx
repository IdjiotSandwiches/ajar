import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReviewCardNew from './review-card';

export default function ReviewSection({ reviews }: any) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const total = reviews.length;
    const maxIndex = total - 1;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cardEl = container.querySelector('[data-card]') as HTMLElement;
        if (!cardEl) return;

        const offset = cardEl.offsetWidth * currentIndex;
        container.scrollTo({ left: offset, behavior: 'smooth' });
    }, [currentIndex]);

    const goLeft = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
    const goRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

    if (reviews.length == 0) {
        return <div className="flex min-h-20 items-center justify-center text-gray-500">No Reviews.</div>;
    }

    return (
        <section className="px-2 py-2 sm:px-0 md:py-8">
            <div className="relative mx-auto max-w-5xl">
                <button
                    onClick={goLeft}
                    disabled={currentIndex === 0}
                    className={`absolute top-1/2 -left-1 z-20 -translate-y-1/2 rounded-full border bg-white p-2 shadow-md  hover:bg-gray-100 disabled:opacity-40 dark:bg-[#222831] dark:shadow-[#ffffff]/20 dark:hover:bg-gray-700 transition-opacity ${currentIndex === 0 ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-100'}`}
                >
                    <ChevronLeft className="h-5 w-5 text-[#3ABEFF]" />
                </button>
                <button
                    onClick={goRight}
                    disabled={currentIndex === maxIndex}
                    className={`absolute top-1/2 -right-1 z-20 -translate-y-1/2 rounded-full border bg-white p-2 shadow-md hover:bg-gray-100 disabled:opacity-40 dark:bg-[#222831] dark:shadow-[#ffffff]/20 dark:hover:bg-gray-700 transition-opacity ${currentIndex === maxIndex ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-100'}`}
                >
                    <ChevronRight className="h-5 w-5 text-[#3ABEFF]" />
                </button>
                <div className="overflow-hidden">
                    <div ref={containerRef} className="flex gap-0 overflow-x-hidden scroll-smooth">
                        {reviews.map((review: any, index: number) => (
                            <div key={index} data-card className="w-full flex-shrink-0 px-4">
                                <ReviewCardNew review={review} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
