import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SquareArrowOutUpRight } from "lucide-react";

import AppLayout from "@/layouts/app-layout";
import CourseCard from "@/components/ui/course-card";

import { dummyInstitutions } from "@/dummy-data/dummy-institute";
import { dummyCourses } from "@/dummy-data/dummy-course";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";

export default function InstituteDetailPage() {
  const { props } = usePage();
  const instituteId = Number(props.instituteId);
  const institute = dummyInstitutions.find((i) => i.id === instituteId);

  const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, "");


  if (!institute) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Institution not found.
      </div>
    );
  }

  const relatedCourses = dummyCourses.filter(
    (course) => course.institution?.id === institute.id
  );

  const relatedTeachers = dummyTeachers.filter((teacher) => {
    return relatedCourses.some((course) =>
      course.teacher?.some((t) => t.email === teacher.email)
    );
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showAllCourses, setShowAllCourses] = useState(false);
  const visibleCourses = showAllCourses
    ? relatedCourses
    : relatedCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FCFF] flex flex-col">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto w-full p-6">
        <div className="flex items-stretch rounded-xl shadow-md overflow-hidden">
          {/* Left (Logo Box) */}
          <div className="bg-[#42C2FF] flex items-center justify-center p-6">
            <img
              src={institute.logo}
              alt={institute.name}
              className="w-40 h-40 object-cover rounded-lg outline-6 outline-white"
            />
          </div>

          {/* Right (Institute Info) */}
          <div className="flex-1 bg-[#42C2FF] text-white p-6 flex items-center justify-between relative cursor-default">
            <div className="absolute right-0 top-0 h-full pointer-events-none">
              <img
                src="/images/gear.png"
                alt="gear-bg"
                className="h-full object-contain"
              />
            </div>

            <div className="flex-1 z-10">
              <h2 className="text-3xl font-semibold">{institute.name}</h2>

              {institute.contactEmail ? (
                <a
                  href={`mailto:${institute.contactEmail}`}
                  className="text-white text-sm underline flex items-center gap-1 hover:opacity-90 transition cursor-pointer"
                >
                  {institute.contactEmail}
                  <SquareArrowOutUpRight className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-white text-sm opacity-80">
                  No contact available
                </span>
              )}

              <p className="text-sm mt-2 leading-relaxed max-w-md">
                {institute.description}
              </p>
            </div>

            {/* Rating & social icons */}
            <div className="flex gap-16 items-center z-10">
              <div className="text-center">
                <p className="text-lg font-semibold">
                  {relatedCourses.length || 0}
                </p>
                <p className="text-sm opacity-90">Courses</p>
              </div>
              <div className="text-center">
                <p className="flex items-center justify-center gap-1 text-lg font-semibold">
                  {institute.rating} <FaStar className="text-yellow-300" />
                </p>
                <p className="text-sm opacity-90">Rating</p>
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

          {relatedTeachers.length > 0 ? (
            <div className="flex gap-8 flex-wrap cursor-pointer">
              {relatedTeachers.map((teacher, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2 overflow-hidden"
                    onClick={() => router.get(route("detail-teacher", { teacherName: slugify(teacher.name) }))}
                  >
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-600">
                        {teacher.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium">{teacher.name}</p>
                  <p className="text-xs text-gray-500 text-center">
                    {teacher.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No teachers found for this institution.</p>
          )}
        </div>

        {/* Courses Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Courses</h3>
          {relatedCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCourses.map((course, idx) => (
                  <CourseCard key={idx} course={course} userRole="student" />
                ))}
              </div>

              {relatedCourses.length > 3 && (
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
            </>
          ) : (
            <p className="text-gray-500">No courses available for this institution.</p>
          )}
        </div>
      </div>
    </div>
  );
}

InstituteDetailPage.layout = (page: React.ReactNode) => (
  <AppLayout useContainer={false}>{page}</AppLayout>
);
