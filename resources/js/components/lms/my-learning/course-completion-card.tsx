import { storageUrl } from '@/utils/storage';
import React from 'react';

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
    const formattedStartDate = new Date(startDate).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const formattedEndDate = new Date(endDate).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="mb-5 flex flex-col gap-4 rounded-xl border border-[#3ABEFF]/50 bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row">
            <img src={storageUrl(image)} alt={title} className="h-40 w-full rounded-lg border border-gray-200 object-cover md:h-32 md:w-32" />

            <div className="flex flex-grow flex-col">
                <div>
                    <h3 className="mb-3 text-base font-semibold text-gray-800">{title}</h3>

                    <div className="text-sm text-gray-700">
                        <div className="grid grid-cols-1 gap-y-1 md:grid-cols-8 md:gap-y-1">
                            <span className="font-medium text-gray-600 md:col-span-1">Teacher:</span>
                            <span className="font-medium md:col-span-7">{teacher}</span>

                            <span className="font-medium text-gray-600 md:col-span-1">Student:</span>
                            <span className="font-medium md:col-span-7">{student}</span>

                            <span className="font-medium text-gray-600 md:col-span-1">Duration:</span>
                            <span className="font-medium md:col-span-7">{duration}</span>

                            <span className="font-medium text-gray-600 md:col-span-1">Start at:</span>
                            <span className="font-medium md:col-span-7">
                                {formattedStartDate} {startTime}
                            </span>

                            <span className="font-medium text-gray-600 md:col-span-1">End at:</span>
                            <span className="font-medium md:col-span-7">
                                {formattedEndDate} {endTime}
                            </span>

                            {recordingLink && (
                                <>
                                    <span className="font-medium text-gray-600 md:col-span-1">Recording:</span>
                                    <a
                                        href={recordingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium break-all text-[#3ABEFF] hover:underline md:col-span-7"
                                    >
                                        {recordingLink}
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCompleteClick}
                        className="w-full rounded-lg bg-[#3ABEFF] px-5 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90 md:w-auto"
                    >
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCompletionCard;
