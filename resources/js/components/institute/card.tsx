import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function InstituteCard({ institute }: any) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const hasTeachers = institute.teacherList && institute.teacherList.length > 0;

  const next = () => {
    setIndex((prev) =>
      prev === institute.teacherList.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? institute.teacherList.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!hasTeachers) return;
    const interval = setInterval(() => {
      next();
    }, 7000);
    return () => clearInterval(interval);
  }, [hasTeachers, institute.teacherList.length]);

  return (
    <div className="bg-[#42C2FF] rounded-2xl shadow-lg p-1 mb-4">
      <div className="bg-white p-0.5 rounded-2xl">
        <div
          className="bg-[#42C2FF] rounded-2xl p-6 text-center cursor-pointer"
          onClick={() => router.get(route("detail-institute", institute.user_id))}
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto mb-4">
            <img
              src={institute?.user?.profile_picture || "https://placehold.co/400"}
              alt={institute.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-white">{institute.user.name}</h2>
        </div>

        <div className="bg-white rounded-2xl p-4 mt-2 relative group">

          {!hasTeachers && (
            <p className="text-gray-500 text-center text-sm py-3">
              No teacher in this institute
            </p>
          )}

          {hasTeachers && (
            <>
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
                      width: `${institute.teacherList.length * 100}%`,
                    }}
                  >
                    {institute.teacherList.map((t: any) => (
                      <div
                        key={t.user_id}
                        className="w-full flex-shrink-0 flex items-center gap-3 bg-[#F1FBFF] px-4 py-3 rounded-xl shadow-sm cursor-pointer active:scale-[0.98] transition"
                        onClick={() => router.get(route("detail-teacher", t.user_id))}
                      >
                        <img
                          src={t?.user?.profile_picture || "https://placehold.co/400"}
                          alt={t.user.name}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        <p className="text-gray-700 text-base font-semibold whitespace-nowrap">
                          {t.user.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {institute.teacherList.length > 1 && (
                  <>
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
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
