/* eslint-disable react-hooks/rules-of-hooks */
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

  const [showAllCourses, setShowAllCourses] = useState(false);
  const visibleCourses = showAllCourses
    ? relatedCourses
    : relatedCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FCFF] flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-stretch rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#42C2FF] flex items-center justify-center p-6">
            <img
              src={institute.logo}
              alt={institute.name}
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg outline-6 outline-white"
            />
          </div>

          <div className="flex-1 bg-[#42C2FF] text-white p-6 flex flex-col md:flex-row md:justify-between relative cursor-default">

            <div className="absolute right-0 top-0 h-full pointer-events-none">
              <img src="/images/gear.png" alt="gear-bg" className="h-full object-contain" />
            </div>

            <div className="flex-1 z-10 mb-6 md:mb-0 flex flex-col items-center md:items-start gap-2 text-center md: text-start">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                {institute.name}
              </h2>
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

              <p className="text-sm leading-relaxed max-w-md">
                {institute.description}
              </p>
            </div>

            <div className="flex justify-between md:justify-normal gap-10 md:gap-16 items-center z-10 md:self-center">

              <div className="text-center">
                <p className="text-lg font-semibold">0</p>
                <p className="text-sm opacity-90">Reviews</p>
              </div>

              <div className="text-center">
                <p className="flex items-center justify-center gap-1 text-lg font-semibold">
                  {institute.rating} <FaStar className="text-yellow-300" />
                </p>
                <p className="text-sm opacity-90">Rating</p>
              </div>

              <div className="flex md:flex-col gap-4 ml-2 md:ml-4">
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

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Teachers</h3>

          <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 md:grid-cols-4 scrollbar-thin scrollbar-thumb-gray-300">
            {relatedTeachers.map((teacher, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center cursor-pointer min-w-[120px]"
                onClick={() =>
                  router.get(route("detail-teacher", { teacherName: slugify(teacher.name) }))
                }
              >
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {teacher.image ? (
                    <img src={teacher.image} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-600 text-sm font-medium">
                      {teacher.name.charAt(0)}
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium mt-2">{teacher.name}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{teacher.description}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Courses</h3>

          {relatedCourses.length > 0 ? (
            <>
              <div className="flex overflow-x-auto gap-4 pb-3 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-3">
                {visibleCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="min-w-[85%] snap-start sm:min-w-0"
                  >
                    <CourseCard course={course} isTag={false} />
                  </div>
                ))}
              </div>



              {relatedCourses.length > 3 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    className="px-6 py-2 text-[#42C2FF] rounded-full font-medium hover:text-[#42C2FF]/90 transition flex items-center gap-2"
                  >
                    {showAllCourses ? "See Less" : "See More"}
                    {showAllCourses ? (
                      <FaChevronUp className="text-sm" />
                    ) : (
                      <FaChevronDown className="text-sm" />
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

InstituteDetailPage.layout = (page) => (
  <AppLayout useContainer={false}>{page}</AppLayout>
);
