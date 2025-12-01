import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";

export default function InstituteCard({ institute }: any) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "");

  const next = () => {
    setIndex((prev) =>
      prev === institute.teachers.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? institute.teachers.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 7000);
    return () => clearInterval(interval);
  }, [institute.teachers.length]);

  return (
    <div className="bg-[#42C2FF] rounded-2xl shadow-lg p-1">
      <div className="bg-white p-0.5 rounded-2xl">
        <div className="bg-[#42C2FF] rounded-2xl p-6 text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto mb-4">
            <img
              src={institute.image}
              alt={institute.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-white">{institute.name}</h2>
        </div>
        <div className="bg-white rounded-2xl p-4 mt-2 relative group">

          <h3 className="text-gray-700 font-semibold text-sm mb-3">
            Teachers in this Institute
          </h3>
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                ref={sliderRef}
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${index * 100}%)`,
                  width: `${institute.teachers.length * 100}%`,
                }}
              >
                {institute.teachers.map((t: any) => (
                  <div
                    key={t.id}
                    className="w-full flex-shrink-0 flex items-center gap-3 bg-[#F1FBFF] px-4 py-3 rounded-xl shadow-sm cursor-pointer active:scale-[0.98] transition"
                    onClick={() => router.get(route("detail-teacher", { teacherName: slugify(t.name) }))}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <p className="text-gray-700 text-base font-semibold whitespace-nowrap">
                      {t.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prev}
              className="absolute top-1/2 -translate-y-1/2 -left-4 bg-[#42C2FF] text-white w-7 h-7 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 -translate-y-1/2 -right-4 bg-[#42C2FF] text-white w-7 h-7 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
