import React from "react";

interface CourseCompletionCardProps {
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
  onCompleteClick: () => void;
}

const CourseCompletionCard: React.FC<CourseCompletionCardProps> = ({
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
  onCompleteClick,
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
    <div className="
      border border-[#42C2FF]/50 bg-white rounded-xl p-4 mb-5
      flex flex-col md:flex-row
      gap-4 shadow-sm hover:shadow-md transition
    ">
      <img
        src={`/${image || null}`}
        alt={title}
        className="
          w-full md:w-32 h-40 md:h-32
          object-cover rounded-lg border border-gray-200
        "
      />

      <div className="flex flex-col flex-grow">
        <div>
          <h3 className="font-semibold text-gray-800 text-base mb-3">{title}</h3>

          <div className="text-sm text-gray-700">
            <div
              className="
                grid grid-cols-1 md:grid-cols-8
                gap-y-1 md:gap-y-1
              "
            >
              <span className="font-medium text-gray-600 md:col-span-1">Teacher:</span>
              <span className="md:col-span-7 font-medium">{teacher}</span>

              <span className="font-medium text-gray-600 md:col-span-1">Student:</span>
              <span className="md:col-span-7 font-medium">{student}</span>

              <span className="font-medium text-gray-600 md:col-span-1">Duration:</span>
              <span className="md:col-span-7 font-medium">{duration}</span>

              <span className="font-medium text-gray-600 md:col-span-1">Start at:</span>
              <span className="md:col-span-7 font-medium">
                {formattedStartDate} {startTime}
              </span>

              <span className="font-medium text-gray-600 md:col-span-1">End at:</span>
              <span className="md:col-span-7 font-medium">
                {formattedEndDate} {endTime}
              </span>

              {recordingLink && (
                <>
                  <span className="font-medium text-gray-600 md:col-span-1">Recording:</span>
                  <a
                    href={recordingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#42C2FF] hover:underline break-all md:col-span-7 font-medium"
                  >
                    {recordingLink}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onCompleteClick}
            className="
              px-5 py-2 text-sm bg-[#42C2FF] hover:bg-[#42C2FF]/90
              text-white rounded-lg transition w-full md:w-auto
            "
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};


export default CourseCompletionCard;
