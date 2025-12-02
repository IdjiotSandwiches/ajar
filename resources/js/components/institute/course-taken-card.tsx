import React from "react";

interface CourseStatusCardProps {
  image: string;
  title: string;
  teacher: string;
  student: string;
  duration: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recordingLink?: string;
  status?: string;
}

const CourseStatusCard: React.FC<CourseStatusCardProps> = ({
  image,
  title,
  teacher,
  student,
  duration,
  startDate,
  startTime,
  endDate,
  endTime,
  recordingLink,
  status = "Completed",
}) => {
  const formattedStartDate = new Date(startDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedEndDate = new Date(endDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border border-[#42C2FF]/50 bg-white rounded-xl p-4 mb-5 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md transition">
      <img
        src={image}
        alt={title}
        className="w-full h-40 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-base mb-3">
          {title}
        </h3>

        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-medium text-gray-600 w-28">Teacher:</span>
            <span className="flex-1 font-medium">{teacher}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-medium text-gray-600 w-28">Student:</span>
            <span className="flex-1 font-medium">{student}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-medium text-gray-600 w-28">Duration:</span>
            <span className="flex-1 font-medium">{duration}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-medium text-gray-600 w-28">Start at:</span>
            <span className="flex-1 font-medium">
              {formattedStartDate} {startTime}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-medium text-gray-600 w-28">End at:</span>
            <span className="flex-1 font-medium">
              {formattedEndDate} {endTime}
            </span>
          </div>

          {recordingLink && (
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-medium text-gray-600 w-28">Recording:</span>
              <a
                href={recordingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-[#42C2FF] hover:underline break-all font-medium"
              >
                {recordingLink}
              </a>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start">
            <span className="font-medium text-gray-600 w-28">Status:</span>
            <span
              className={`flex-1 font-semibold ${
                status === "Completed"
                  ? "text-green-600"
                  : status === "Canceled"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStatusCard;
