import React, { useEffect, useState } from "react";
import { CourseData } from "@/interfaces/shared";
import CourseCard from "@/components/ui/course-card";
import FilterStudent from "@/components/filter/student";
import FilterTeacher from "@/components/filter/teacher";
import AppLayout from "@/layouts/app-layout";
import { Search } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { dummyCourses } from "@/dummy-data/dummy-course";

const user = {
  role: "student",
};

export default function CourseListPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "Technology";

  const [courses, setCourses] = useState<CourseData[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"Technology" | "Design">(
    initialCategory as "Technology" | "Design"
  );

  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  useEffect(() => {
    setActiveCategory(initialCategory as "Technology" | "Design");
  }, [initialCategory]);

  const categoryMap = {
    Technology: [2, 3, 4, 6],
    Design: [5],
  };

  const filteredCourses = courses.filter(
    (course) => categoryMap[activeCategory].includes(course.category)
  );

  const coursesPerRow = 5;
  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, coursesPerRow * 2);

  return (
    <section className="bg-[#F7FDFD] min-h-screen pb-24 px-6 md:px-12">
      <div className="pt-12 flex flex-col items-center w-full">
        <div className="flex flex-col items-center mb-8 w-[240px] relative">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D8F4FF]" />
          <div className="flex justify-between w-full relative">
            {["Technology", "Design"].map((cat) => (
              <div key={cat} className="w-1/2 flex justify-center relative">
                <button
                  onClick={() =>
                    setActiveCategory(cat as "Technology" | "Design")
                  }
                  className={`relative text-lg md:text-xl font-semibold pb-2 transition-all ${
                    activeCategory === cat
                      ? "text-[#3ABEFF]"
                      : "text-gray-400 hover:text-[#3ABEFF]"
                  }`}
                >
                  {cat}
                </button>
              </div>
            ))}

            <span
              className={`absolute bottom-0 h-[2px] bg-[#3ABEFF] transition-all duration-500 ease-in-out ${
                activeCategory === "Technology"
                  ? "left-0 w-1/2"
                  : "left-1/2 w-1/2"
              }`}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full max-w-3xl justify-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={`Search for ${activeCategory.toLowerCase()} courses...`}
              className="w-full px-4 py-2 pr-10 rounded-full border border-[#D8F4FF] bg-white focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none shadow-sm text-sm text-gray-700 placeholder-gray-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3ABEFF] hover:bg-[#3ABEFF]/90 p-2 rounded-full text-white transition">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            {user.role === "student" ? <FilterStudent /> : <FilterTeacher />}
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
        {visibleCourses.length > 0 ? (
          visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} userRole={user.role} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No {activeCategory} courses available yet.
          </p>
        )}
      </div>
      {filteredCourses.length > coursesPerRow * 2 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-[#42C2FF] rounded-full font-medium hover:text-[#42C2FF]/90 transition"
          >
            {showAll ? (
              <div className="flex items-center gap-2">
                See Less <FaChevronUp className="text-sm" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                See More <FaChevronDown className="text-sm" />
              </div>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

CourseListPage.layout = (page: React.ReactNode) => (
  <AppLayout useContainer={false}>{page}</AppLayout>
);
