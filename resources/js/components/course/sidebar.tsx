import { useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import TeacherProfileCard from "../teacher/card";

export default function CourseSidebar({ teacher, institute }: { teacher: any[], institute: any }) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const teachers = Array.isArray(teacher) ? teacher : [teacher].filter(Boolean);

  useEffect(() => {
    if (!sliderRef.current || teachers.length <= 1) return;

    const slider = sliderRef.current;
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % teachers.length;
      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: "smooth",
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, [teachers.length]);

  return (
    <aside className="space-y-6">
      {/* Institution */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Institution</h3>
        <div
          className="bg-[#3ABEFF] rounded-2xl shadow-lg p-1 cursor-pointer"
          onClick={() => router.get(route("detail-institute", { id: institute.id }))}
        >
          <div className="bg-white p-0.5 rounded-2xl">
            <div className="bg-[#3ABEFF] rounded-2xl p-2 flex items-center text-center relative overflow-hidden gap-4">
              <img src={institute.profile_picture || null} alt="ins" className="w-12 h-12 rounded-full border-2" />
              <span className="font-medium text-white">{institute.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Teachers</h3>

        {teachers.length === 0 ? (
          <p className="font-medium">No teacher yet</p>
        ) : (
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {teachers.map((t: any, index: number) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-full"
              >
                <TeacherProfileCard teacher={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
