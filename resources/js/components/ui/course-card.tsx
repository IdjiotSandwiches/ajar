import React from "react";
import { CourseData } from "@/interfaces/shared";
import { Star } from "lucide-react";

interface CourseCardProps {
  course: CourseData;
}

export default function CourseCard({ course }: CourseCardProps) {
  const image =
    typeof course.course_images[0] === "string"
      ? course.course_images[0]
      : URL.createObjectURL(course.course_images[0]);

  const avgRating =
    course.ratings && course.ratings.length > 0
      ? (
          course.ratings.reduce((a, b) => a + b, 0) / course.ratings.length
        ).toFixed(1)
      : "0";

  const firstLang = course.programming_language?.[0]?.programming_language || "";

  const langKey = firstLang
    ? firstLang.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
    : "";

  const langIconPath = langKey ? `/images/${langKey}.png` : "";

  return (
    <div className="bg-white border-2 border-[#3ABEFF]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 min-w-[280px] max-w-[300px] flex-shrink-0 flex flex-col">
      {/* Gambar */}
      <div className="relative">
        <img
          src={image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />

        <div className="absolute top-3 left-3 bg-[#E8FBF2] text-[#00B087] text-xs font-semibold px-2 py-1 rounded cursor-default">
          Terlaris
        </div>

        {/* Logo Programming Language */}
        {langIconPath && (
          <div className="absolute top-3 right-3 p-1">
            <img
              src={langIconPath}
              alt={firstLang}
              className="w-8 h-8 object-contain"
              onError={(e) => {

                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Konten utama */}
      <div className="p-4 flex flex-col justify-between flex-grow cursor-default">
        <div>
          <h3 className="text-gray-800 font-semibold text-base leading-tight mb-1">
            {course.title}
          </h3>
          <p className="text-gray-500 text-xs mb-2">by <span className="font-medium">{course.institution}</span></p>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {course.description}
          </p>

          {/* Rating */}
          <div className="flex items-center text-sm text-yellow-500 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            <span className="text-gray-700 font-medium">{avgRating}</span>
            <span className="text-gray-400 ml-1 text-xs">
              • {course.reviews.length} review
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-gray-800 font-semibold text-sm">
              Rp{course.price_for_student.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-500 text-xs">
              {course.duration * 10} Minutes
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
