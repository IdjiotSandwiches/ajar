import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dummyReview, ReviewData } from "@/dummy-data/dummy-review";
import { dummyInstitutions } from "@/dummy-data/dummy-institute";

export default function ReviewSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gapPx = 32;
  const perPage = 2;
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

  return (
    <section className="pb-16 px-6 md:px-12 bg-[#F7FDFD]">
      <h2 className="text-xl font-semibold text-gray-800 mb-10 text-center md:text-left">
        Reviews from Students and Teachers
      </h2>

      <div className="max-w-8xl mx-auto grid md:grid-cols-4 gap-16 items-center">
        {/* === Left illustration === */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-white shadow-md rounded-2xl p-6 w-72 md:w-full max-w-xl flex flex-col items-center">
            <img
              src="/images/review.jpg"
              alt="Review illustration"
              className="rounded-xl object-cover w-full h-56 mb-4"
            />
            <p className="text-gray-600 text-center text-sm">
              “Your success story starts with learning and sharing knowledge.”
            </p>
          </div>
        </div>

        {/* === Right section === */}
        <div className="md:col-span-3 relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={goLeft}
            disabled={leftDisabled}
            className={`z-10 bg-white border shadow-md p-2 rounded-full mr-4 transition-opacity ${
              leftDisabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-[#3ABEFF]" />
          </button>

          {/* Scroll Container */}
          <div
            ref={containerRef}
            className="flex overflow-hidden scroll-smooth gap-8 flex-1"
          >
            {dummyReview.map((review: ReviewData) => {
              // ✅ ambil data institusi berdasarkan ID
              const institution = dummyInstitutions.find(
                (inst) => inst.id === review.review_to.institutionId
              );

              return (
                <div
                  key={review.id}
                  data-card
                  className="bg-white border border-gray-100 rounded-lg shadow-sm p-8 flex flex-col justify-between flex-shrink-0 w-[48%] hover:shadow-md transition-all"
                >
                  {/* === Reviewer Info === */}
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
                          {"★".repeat(review.rating)}{" "}
                          <span className="text-gray-300">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* === Review Text === */}
                    <p className="text-gray-600 text-sm mb-6">
                      {review.review_text}
                    </p>
                  </div>

                  {/* === Review Target === */}
                  <div className="border-t pt-3 mt-auto">
                    <p className="text-xs text-gray-500 mb-2">Review to:</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={institution?.logo || "/images/default-logo.png"}
                        alt={institution?.name || "Unknown Institution"}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-[#3ABEFF] font-medium text-sm">
                          {review.review_to.teacher.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {institution?.name || "Unknown Institution"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goRight}
            disabled={rightDisabled}
            className={`z-10 bg-white border shadow-md p-2 rounded-full ml-4 transition-opacity ${
              rightDisabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5 text-[#3ABEFF]" />
          </button>
        </div>
      </div>
    </section>
  );
}
