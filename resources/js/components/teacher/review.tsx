import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dummyReview } from "@/dummy-data/dummy-review";
import ReviewCardNew from "./review-card";

export default function ReviewSection({ reviews }: { reviews: any[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = dummyReview.length;
  const maxIndex = total - 1;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardEl = container.querySelector("[data-card]") as HTMLElement;
    if (!cardEl) return;

    const offset = cardEl.offsetWidth * currentIndex;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [currentIndex]);

  const goLeft = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  if (reviews.length == 0) {
    return (
        <div className="min-h-20 flex items-center justify-center text-gray-500">
            No Reviews.
        </div>
    );
  }

  return (
    <section className="px-2 sm:px-0 py-2 md:py-8">
      <div className="max-w-5xl mx-auto relative">
        <button
          onClick={goLeft}
          disabled={currentIndex === 0}
          className={`absolute -left-1 top-1/2 -translate-y-1/2 z-20 bg-white border shadow-md p-2 rounded-full transition-opacity ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          <ChevronLeft className="w-5 h-5 text-[#42C2FF]" />
        </button>
        <button
          onClick={goRight}
          disabled={currentIndex === maxIndex}
          className={`absolute -right-1 top-1/2 -translate-y-1/2 z-20 bg-white border shadow-md p-2 rounded-full transition-opacity ${currentIndex === maxIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          <ChevronRight className="w-5 h-5 text-[#42C2FF]" />
        </button>
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex overflow-x-hidden scroll-smooth gap-0"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                data-card
                className="flex-shrink-0 w-full px-4"
              >
                <ReviewCardNew review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
