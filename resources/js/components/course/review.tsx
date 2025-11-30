import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dummyReview, ReviewData } from "@/dummy-data/dummy-review";
import { dummyInstitutions } from "@/dummy-data/dummy-institute";

export default function ReviewSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);

  const gapPx = 32;
  const total = dummyReview.length;
  const maxIndex = Math.max(0, total - perPage);

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth >= 1024 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current?.querySelector("[data-card]") as HTMLElement;
    if (el) setCardWidth(el.offsetWidth + gapPx);
  }, [perPage]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: cardWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex, cardWidth]);

  const goLeft = () => setCurrentIndex((i) => Math.max(0, i - perPage));
  const goRight = () => setCurrentIndex((i) => Math.min(maxIndex, i + perPage));

  return (
    <section className="bg-[#F7FDFD] overflow-hidden">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-left">
        Reviews from Students and Teachers
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative w-full">
          <button
            onClick={goLeft}
            disabled={currentIndex <= 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-md p-2 rounded-full hover:bg-blue-50 transition :opacity-40 z-20"
          >
            <ChevronLeft className="w-5 h-5 text-[#42C2FF]" />
          </button>
          <button
            onClick={goRight}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white shadow-md p-2 rounded-full hover:bg-blue-50 transition :opacity-40 z-20"
          >
            <ChevronRight className="w-5 h-5 text-[#42C2FF]" />
          </button>

          <div className="overflow-hidden w-full">
            <div
              ref={containerRef}
              className="flex overflow-x-auto no-scrollbar gap-8 scroll-smooth snap-x snap-mandatory"
            >
              {dummyReview.map((review: ReviewData) => {
                const institution = dummyInstitutions.find(
                  (inst) => inst.id === review.review_to.institutionId
                );
                return (
                  <div
                    key={review.id}
                    data-card
                    className={`flex-shrink-0 snap-start w-full sm:w-[90%] md:w-[80%] ${perPage === 2 ? "lg:w-[50%]" : "lg:w-full"} `}
                  >
                    <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-8 flex flex-col h-full hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={review.avatar}
                            alt={review.reviewer_name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {review.reviewer_name} –{" "}
                              <span className="text-gray-500">{review.role}</span>
                            </p>
                            <p className="text-yellow-400 text-sm">
                              {"★".repeat(review.rating)}
                              <span className="text-gray-300">
                                {"★".repeat(5 - review.rating)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-6">
                          {review.review_text}
                        </p>
                      </div>

                      <div className="border-t pt-3 mt-auto">
                        <p className="text-xs text-gray-500 mb-2">Review to:</p>
                        <div className="flex items-center gap-3">
                          <img
                            src={institution?.logo || "/images/default-logo.png"}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-[#42C2FF] font-medium text-sm">
                              {review.review_to.teacher.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {institution?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
