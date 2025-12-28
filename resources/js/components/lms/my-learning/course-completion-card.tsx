import { storageUrl } from '@/utils/storage';
import React from 'react';

interface CourseCompletionCardProps {
    image: string;
    name: string;
    teacher_name: string;
    duration: string;
    start_time: string;
    end_time: string;
    recording_link?: string;
    onCompleteClick: () => void;
}

const CourseCompletionCard: React.FC<CourseCompletionCardProps> = ({
    image,
    name,
    teacher_name,
    duration,
    start_time,
    end_time,
    recording_link,
    onCompleteClick,
}) => {
    return (
        <div className="mb-5 flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition hover:border-[#3ABEFF]/50 hover:shadow-md lg:flex-row dark:border-white/20 dark:shadow-white/20">
            <img src={storageUrl(image)} alt={name} className="h-40 w-full rounded-lg object-cover md:h-32 md:w-32" />

            <div className="flex flex-grow flex-col">
                <div>
                    <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white">{name}</h3>
                    <div className="text-sm text-gray-700 dark:text-white/90">
                        <div className="grid grid-cols-1 gap-y-1 md:gap-y-1 xl:grid-cols-8">
                            <span className="font-medium text-gray-600 md:col-span-1 dark:text-white/70">Teacher:</span>
                            <span className="font-medium md:col-span-7">{teacher_name}</span>

                            <span className="font-medium text-gray-600 md:col-span-1 dark:text-white/70">Duration:</span>
                            <span className="font-medium md:col-span-7">{duration} Minutes</span>

                            <span className="font-medium text-gray-600 md:col-span-1 dark:text-white/70">Start at:</span>
                            <span className="font-medium md:col-span-7">{start_time}</span>

                            <span className="font-medium text-gray-600 md:col-span-1 dark:text-white/70">End at:</span>
                            <span className="font-medium md:col-span-7">{end_time}</span>

                            {recording_link && (
                                <>
                                    <span className="font-medium text-gray-600 md:col-span-1 dark:text-white/70">Recording:</span>
                                    <a
                                        href={recording_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium break-all text-[#3ABEFF] hover:underline md:col-span-7"
                                    >
                                        {recording_link}
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
