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
    <div className="border border-[#42C2FF]/50 bg-white rounded-xl p-4 mb-5 flex gap-4 shadow-sm hover:shadow-md transition">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
      />

      <div className="flex flex-col flex-grow">
        <div>
          <h3 className="font-semibold text-gray-800 text-base mb-3">{title}</h3>

          <div className="text-sm text-gray-700">
            <div className="grid grid-cols-8 gap-y-1">
              <span className="font-medium text-gray-600 col-span-1">Teacher:</span>
              <span className="col-span-7 font-medium">{teacher}</span>

              <span className="font-medium text-gray-600 col-span-1">Student:</span>
              <span className="col-span-7 font-medium">{student}</span>

              <span className="font-medium text-gray-600 col-span-1">Duration:</span>
              <span className="col-span-7 font-medium">{duration}</span>

              <span className="font-medium text-gray-600 col-span-1">Start at:</span>
              <span className="col-span-7 font-medium">
                {formattedStartDate} {startTime}
              </span>

              <span className="font-medium text-gray-600 col-span-1">End at:</span>
              <span className="col-span-7 font-medium">
                {formattedEndDate} {endTime}
              </span>

              {recordingLink && (
                <>
                  <span className="font-medium text-gray-600 col-span-1">Recording:</span>
                  <a
                    href={recordingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#42C2FF] hover:underline break-all col-span-7 font-medium"
                  >
                    {recordingLink}
                  </a>
                </>
              )}

              <span className="font-medium text-gray-600 col-span-1">Status:</span>
              <span className={`col-span-7 font-semibold ${status === "Completed" ? "text-green-600" : status === "Canceled"? "text-red-600" : "text-gray-600"}`}              >
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStatusCard;
