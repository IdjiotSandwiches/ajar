/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface CourseCardProps {
  title: string;
  mentor: string;
  institute: string;
  duration: string;
  date: string;
  time: string;
  image: string;
  role: "student" | "teacher";
  status: "progress" | "completed";
  isCourseFinished: boolean;
  meetingLink?: string;
  recordingLink?: string;
  isApproved?: boolean;
  onActionClick: () => void;
  onAddReview: () => void;
}

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
}: CourseCardProps) {
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
    <div className="flex border border-[#3ABEFF]/40 bg-white rounded-xl p-3 gap-4 shadow-sm">
      <img
        src={image}
        className="w-32 h-32 object-cover rounded-md"
        alt={title}
      />
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-2">{title}</h3>
          <p className="text-xs text-gray-600 mb-2">
            {mentor} | {institute}
          </p>
          <p className="text-xs text-gray-500 mb-2">{duration}</p>
          <p className="text-xs text-gray-600 mb-2">
            {isApproved ? "Finish at " : "Start at "}
            <span className="text-black font-medium">
              {formattedDate} {time}
            </span>
          </p>
        </div>

        {status === "completed" ? (
          role === "student" ? (
            <button
              onClick={onAddReview}
              className="self-end bg-[#3ABEFF] hover:bg-[#2fa5d8] text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Add Review
            </button>
          ) : null
        ) : (
          <button
            onClick={handleButtonClick}
            className="self-end text-white text-sm px-4 py-2 rounded-lg transition bg-[#3ABEFF] hover:bg-[#2fa5d8]"
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
  );
}
