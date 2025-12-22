/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

export default function CourseCard({
  title,
  mentor,
  institute,
  duration,
  date,
  time,
  image,
  role,
  status,
  isCourseFinished,
  meetingLink,
  recordingLink,
  isApproved,
  onActionClick,
  onAddReview,
}: any) {
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleButtonClick = () => {
    if (role === "teacher" && meetingLink) {
      window.open(meetingLink, "_blank");
    } else {
      onActionClick();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border dark:border-white/20 hover:border-[#3ABEFF]/70 dark:hover:border-[#3ABEFF]/70 rounded-xl p-3 gap-4 shadow-sm dark:shadow-[#ffffff]/20">
      <img
        src={`/${image || null}`}
        className="w-full h-36 object-cover rounded-md sm:w-32 sm:h-32"
        alt={title}
      />
      <div className="flex flex-col justify-between flex-grow">

        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 dark:text-white">
            {title}
          </h3>

          <p className="text-xs text-gray-600 mb-1 line-clamp-1 dark:text-white/80">
            {mentor} | {institute}
          </p>

          <p className="text-xs text-gray-500 mb-1 dark:text-white/70">{duration}</p>

          <p className="text-xs text-gray-600 dark:text-white/80 mb-2">
            {isApproved ? "Finish at " : "Start at "}
            <span className="text-black font-medium dark:text-white">
              {formattedDate} {time}
            </span>
          </p>
        </div>
        <div className="flex justify-end mt-2">
          {status === "completed" ? (
            role === "student" ? (
              <button
                onClick={onAddReview}
                className="bg-[#3ABEFF] hover:bg-[#3ABEFF]/90 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Add Review
              </button>
            ) : null
          ) : (
            <button
              onClick={handleButtonClick}
              className="text-white text-sm px-4 py-2 rounded-lg transition bg-[#3ABEFF] hover:bg-[#3ABEFF]/90"
            >
              {role === "student" 
                ? "Join Meeting"
                : isCourseFinished
                  ? "Finish"
                  : meetingLink
                    ? "Join Meeting"
                    : "Add Meeting"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
