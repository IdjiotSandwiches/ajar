import { storageUrl } from '@/utils/storage';
import React from 'react';

interface CourseStatusCardProps {
    image: string;
    name: string;
    teacher_name: string;
    duration: string;
    start_time: string;
    end_time: string;
    recording_link?: string;
    status: string;
}

const CourseStatusCard: React.FC<CourseStatusCardProps> = ({ image, name, teacher_name, duration, start_time, end_time, recording_link, status }) => {
    const statusStyle: Record<string, string> = {
        completed: 'text-green-600',
        scheduled: 'text-gray-600',
        cancelled: 'text-red-600',
        rejected: 'text-red-600',
        ongoing: 'text-yellow-500',
    };
    return (
        <div className="mb-5 flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition hover:border-[#3ABEFF]/50 hover:shadow-md lg:flex-row dark:border-white/20 dark:shadow-white/20">
            <img src={storageUrl(image)} alt={name} className="h-40 w-full rounded-lg border object-cover md:h-32 md:w-32 dark:border-white/20" />
            <div className="flex grow flex-col">
                <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white">{name}</h3>

                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600 dark:text-white/80">Teacher:</span>
                        <span className="flex-1 font-medium dark:text-white">{teacher_name}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600 dark:text-white/80">Duration:</span>
                        <span className="flex-1 font-medium dark:text-white">{duration}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600 dark:text-white/80">Start at:</span>
                        <span className="flex-1 font-medium dark:text-white">{start_time}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600 dark:text-white/80">End at:</span>
                        <span className="flex-1 font-medium dark:text-white">{end_time}</span>
                    </div>

                    {recording_link && (
                        <div className="flex flex-col sm:flex-row sm:items-start">
                            <span className="w-28 font-medium text-gray-600 dark:text-white/80">Recording:</span>
                            <a
                                href={recording_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 font-medium break-all text-[#3ABEFF] hover:underline"
                            >
                                {recording_link}
                            </a>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <span className="w-28 font-medium text-gray-600 dark:text-white/80">Status:</span>
                        <span className={`flex-1 font-semibold ${statusStyle[status]}`}>{status.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseStatusCard;
