import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import CourseCard from "@/components/ui/course-card";
import { dummyInstitution } from "@/dummy-data/dummy-institute";
import { dummyCourse } from "@/dummy-data/dummy-course";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";
import AppLayout from "@/layouts/app-layout";
import { SquareArrowOutUpRight } from "lucide-react";

export default function InstituteDetailPage() {
  const institute = dummyInstitution[0];

  const getRandomItems = (arr: any[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomTeachers = getRandomItems(dummyTeachers, 3);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const randomCourses = getRandomItems(dummyCourse, 8);
  const visibleCourses = showAllCourses ? randomCourses : randomCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FCFF] flex flex-col">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto w-full p-6">
        <div className="flex items-stretch rounded-xl shadow-md overflow-hidden">
          {/* Bagian kiri (image box putih) */}
          <div className="bg-[#42C2FF] flex items-center justify-center p-4">
            <img
              src={institute.logo}
              alt={institute.name}
              className="w-40 h-40 object-cover rounded-lg outline-6 outline-white"
            />
          </div>

          {/* Bagian kanan */}
          <div className="flex-1 bg-[#42C2FF] text-white p-6 flex items-center justify-between relative cursor-default">
            {/* Dekorasi gear seperti contoh */}
            <div className="absolute right-0 top-0 h-full pointer-events-none">
              <img
                src="/images/gear.png"
                alt="gear-bg"
                className="h-full object-contain"
              />

            </div>

            {/* Info institute */}
            <div className="flex-1 z-10">
              <h2 className="text-3xl font-semibold">{institute.name}</h2>
              {institute.website ? (
                <a
                  href={institute.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm underline flex items-center gap-1 hover:opacity-90 transition cursor-pointer"
                >
                  {institute.website}
                  <SquareArrowOutUpRight className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-white text-sm opacity-80">No website available</span>
              )}
              <p className="text-sm mt-2 leading-relaxed max-w-md">
                {institute.description}
              </p>
            </div>


            {/* Rating & social icons */}
            <div className="flex gap-24 items-center z-10">
              <div className="text-center">
                <p className="text-lg font-semibold">
                  {institute.reviews?.length || 0}
                </p>
                <p className="text-sm opacity-90">Reviews</p>
              </div>
              <div className="text-center">
                <p className="flex items-center justify-center gap-1 text-lg font-semibold">
                  {institute.rating} <FaStar className="text-yellow-300" />
                </p>
                <p className="text-sm opacity-90">Ratings</p>
              </div>
              <div className="flex flex-col gap-4 ml-4">
                <a href="#" className="hover:text-blue-100">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="hover:text-blue-100">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="#" className="hover:text-blue-100">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Teachers Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Teachers</h3>
          <div className="flex gap-8 flex-wrap cursor-pointer">
            {randomTeachers.map((teacher, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {teacher.image ? (
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-full object-cover mb-2"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-300 mb-2" />
                )}
                <p className="text-sm font-medium">{teacher.name}</p>
                <p className="text-xs text-gray-500">{teacher.role}</p>
              </div>
            ))}

          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCourses.map((course, idx) => (
              <CourseCard key={idx} course={course} userRole="student" />
            ))}
          </div>

          {/* Tombol See More */}
          {randomCourses.length > 3 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="px-6 py-2 text-[#42C2FF] rounded-full font-medium hover:text-[#42C2FF]/90 transition"
              >
                {showAllCourses ? (
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
        </div>
      </div>
    </div>
  );
}

InstituteDetailPage.layout = (page: React.ReactNode) => (
  <AppLayout useContainer={false}>{page}</AppLayout>
);
