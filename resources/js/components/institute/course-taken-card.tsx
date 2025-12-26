import { storageUrl } from '@/utils/storage';
import React from 'react';

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
    status = 'Completed',
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
                <h3 className="mb-3 text-base font-semibold text-gray-800">{title}</h3>

                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600">Teacher:</span>
                        <span className="flex-1 font-medium">{teacher}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600">Student:</span>
                        <span className="flex-1 font-medium">{student}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600">Duration:</span>
                        <span className="flex-1 font-medium">{duration}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600">Start at:</span>
                        <span className="flex-1 font-medium">
                            {formattedStartDate} {startTime}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600">End at:</span>
                        <span className="flex-1 font-medium">
                            {formattedEndDate} {endTime}
                        </span>
                    </div>

                    {recordingLink && (
                        <div className="flex flex-col sm:flex-row sm:items-start">
                            <span className="w-28 font-medium text-gray-600">Recording:</span>
                            <a
                                href={recordingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 font-medium break-all text-[#3ABEFF] hover:underline"
                            >
                                {recordingLink}
                            </a>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600">Status:</span>
                        <span
                            className={`flex-1 font-semibold ${
                                status === 'Completed' ? 'text-green-600' : status === 'Canceled' ? 'text-red-600' : 'text-gray-600'
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
