import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dummyReview } from "@/dummy-data/dummy-review";

export default function ReviewSection({ reviews }: { reviews: any[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gapPx = 32;
  const perPage = 1;
  const total = dummyReview.length;
  const maxIndex = Math.max(0, Math.ceil(total / perPage) * perPage - perPage);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardEl = container.querySelector<HTMLElement>("[data-card]");
    if (!cardEl) return;

    const cardWidth = cardEl.offsetWidth;
    const offset = (cardWidth + gapPx) * currentIndex;
    container.scrollTo({ left: offset, behavior: "smooth" });
  }, [currentIndex]);

  const goLeft = () => setCurrentIndex((prev) => Math.max(0, prev - perPage));
  const goRight = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + perPage));

  const leftDisabled = currentIndex <= 0;
  const rightDisabled = currentIndex >= maxIndex;

  if (reviews.length == 0) {
    return (
        <div className="min-h-20 flex items-center justify-center text-gray-500">
            No Reviews.
        </div>
    );
  }

  return (
    <section className="">
      <div className="max-w-8xl mx-auto grid md:grid-cols-4 gap-16 items-center">
        <div className="md:col-span-8 relative flex items-center">
          <button
            onClick={goLeft}
            disabled={leftDisabled}
            className={`z-10 bg-white border shadow-md p-2 rounded-full mr-4 transition-opacity ${
              leftDisabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-[#42C2FF]" />
          </button>
          <div
            ref={containerRef}
            className="flex overflow-hidden scroll-smooth gap-8 flex-1"
          >
            {reviews.map((review) => {
              return (
                <div
                  key={review.id}
                  data-card
                  className="bg-white border rounded-lg shadow-sm p-8 flex flex-col justify-between flex-shrink-0 w-full hover:shadow-md transition-all border-[#42C2FF]"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={review.reviewer.profile_picture}
                        alt={review.reviewer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {review.reviewer.name} - {" "}
                          <span className="text-gray-500">{review.reviewer.role.name}</span>
                        </p>
                        <p className="text-yellow-400 text-sm">
                          {"★".repeat(review.rating)}{" "}
                          <span className="text-gray-300">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-6">
                      {review.description}
                    </p>
                  </div>
                  {/* <div className="border-t pt-3 mt-auto">
                    <p className="text-xs text-gray-500 mb-2">Review to:</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={institution?.logo || "/images/default-logo.png"}
                        alt={institution?.name || "Unknown Institution"}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-[#42C2FF] font-medium text-sm">
                          {review.review_to.teacher.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {institution?.name || "Unknown Institution"}
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
          <button
            onClick={goRight}
            disabled={rightDisabled}
            className={`z-10 bg-white border shadow-md p-2 rounded-full ml-4 transition-opacity ${
              rightDisabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-[#42C2FF]" />
          </button>
        </div>
      </div>
    </section>
  );
}
