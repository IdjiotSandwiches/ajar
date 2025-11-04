import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { CourseData, TeacherRegisterProps, InstitutionData } from "@/interfaces/shared";

interface CourseCardProps {
  course: CourseData;
  userRole?: "teacher" | "institute" | "student";
}

export default function CourseCard({ course, userRole }: CourseCardProps) {
  const image =
    typeof course.course_images?.[0] === "string"
      ? course.course_images[0]
      : course.course_images?.[0]
      ? URL.createObjectURL(course.course_images[0])
      : "/images/image-1.jpg";

  const avgRating =
    course.ratings && course.ratings.length > 0
      ? (course.ratings.reduce((a, b) => a + b, 0) / course.ratings.length).toFixed(1)
      : "0";

  const teachers: TeacherRegisterProps[] = course.teacher || [];
  const institution: InstitutionData | null | string = course.institution || null;

  const [currentTeacherIndex, setCurrentTeacherIndex] = useState(0);

  useEffect(() => {
    if (teachers.length > 1) {
      const interval = setInterval(() => {
        setCurrentTeacherIndex((prev) => (prev + 1) % teachers.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [teachers.length]);

  const teacher = teachers[currentTeacherIndex] || null;

  const teacherImage =
    teacher?.image && teacher.image.length > 0
      ? typeof teacher.image[0] === "string"
        ? teacher.image[0]
        : URL.createObjectURL(teacher.image[0])
      : "/images/default-teacher.png";

  return (
    <div className="bg-white border-2 border-[#3ABEFF]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 min-w-[280px] max-w-[340px] flex-shrink-0 flex flex-col">
      {/* === Gambar Course === */}
      <div className="relative">
        <img src={image} alt={course.title} className="w-full h-40 object-cover" />

        {/* Label status */}
        {course.is_best_seller && (
          <div className="absolute top-3 left-3 bg-[#E8FBF2] text-[#00B087] text-xs font-semibold px-2 py-1 rounded cursor-default">
            Terlaris
          </div>
        )}
      </div>

      {/* === Info Guru === */}
      {userRole !== "student" && (
        <div className="relative h-[56px] overflow-hidden border-b border-gray-100 bg-[#F9FCFF]">
          {teachers.length > 0 ? (
            <div
              className="absolute inset-0 transition-all duration-700 ease-in-out flex items-center gap-2 px-4 py-2"
              key={currentTeacherIndex}
            >
              <img
                src={teacherImage}
                alt={teacher?.name}
                className="w-8 h-8 rounded-full object-cover border"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  {teacher?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {teacher?.works?.[0]?.position || "Teacher"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-left w-full h-full px-4">
              <p className="text-sm text-gray-500 italic">No teacher yet</p>
            </div>
          )}
        </div>
      )}

      {/* === Konten Utama === */}
      <div className="p-4 flex flex-col justify-between flex-grow cursor-default">
        <div>
          <h3 className="text-gray-800 font-semibold text-base leading-tight mb-1">
            {course.title}
          </h3>

          <p className="text-gray-500 text-xs mb-2">
            by{" "}
            <span className="font-medium">
              {institution?.name || "Independent Teacher"}
            </span>
          </p>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {course.description}
          </p>

          {/* Rating */}
          <div className="flex items-center text-sm text-yellow-500 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            <span className="text-gray-700 font-medium">{avgRating}</span>
            <span className="text-gray-400 ml-1 text-xs">
              • {course.reviews?.length || 0} review
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-gray-800 font-semibold text-sm">
              Rp{course.price_for_student?.toLocaleString("id-ID") || 0}
            </p>
            <p className="text-gray-500 text-xs">
              {course.duration ? `${course.duration * 10} Minutes` : "Unknown duration"}
            </p>
          </div>
          <button className="bg-[#3ABEFF] text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-[#3ABEFF]/90 transition cursor-pointer">
            See info →
          </button>
        </div>
      </div>
    </div>
  );
}
