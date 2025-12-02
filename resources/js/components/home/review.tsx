import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dummyReview } from "@/dummy-data/dummy-review";
import ReviewCard from "../ui/review-card";

export default function ReviewSection({ reviews }: { reviews: any[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);

  const gapPx = 32;
  const total = dummyReview.length;
  const maxIndex = Math.max(0, total - perPage);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setPerPage(width >= 1024 ? 2 : 1);
    };
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
    const offset = cardWidth * currentIndex;
    containerRef.current.scrollTo({ left: offset, behavior: "smooth" });
  }, [currentIndex, cardWidth]);

  const goLeft = () => setCurrentIndex((i) => Math.max(0, i - perPage));
  const goRight = () => setCurrentIndex((i) => Math.min(maxIndex, i + perPage));

  return (
    <section className="py-16 bg-[#F7FDFD] overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-12">
          Reviews from Students and Teachers
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-7 gap-10 items-center">
          <div className="hidden md:flex md:col-span-2 justify-center">
            <div className="bg-white shadow-md rounded-2xl p-6 w-full min-w-[260px] max-w-[320px]">
              <img
                src="/images/review.jpg"
                className="rounded-xl object-cover w-full h-52 mb-4"
              />
              <p className="text-gray-600 text-center text-sm">
                “Your success story starts with learning and sharing knowledge.”
              </p>
            </div>
          </div>
          <div className="relative md:col-span-5 w-full">
            <button
              onClick={goLeft}
              disabled={currentIndex <= 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-blue-50 transition disabled:opacity-40 z-20 -translate-x-1/2"
            >
              <ChevronLeft className="w-5 h-5 text-[#42C2FF]" />
            </button>
            <button
              onClick={goRight}
              disabled={currentIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-blue-50 transition disabled:opacity-40 z-20 translate-x-1/2
              "
            >
              <ChevronRight className="w-5 h-5 text-[#42C2FF]" />
            </button>
            <div className="w-full overflow-hidden">
              <div
                ref={containerRef}
                className="flex overflow-x-auto scroll-smooth gap-8 snap-x snap-mandatory no-scrollbar"
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    data-card
                    className={`flex-shrink-0 snap-start w-full sm:w-[90%] md:w-[80%] ${perPage === 2 ? "lg:w-[50%]" : "lg:w-full"}`}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
