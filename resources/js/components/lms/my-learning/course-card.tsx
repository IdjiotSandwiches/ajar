/* eslint-disable @typescript-eslint/no-unused-vars */

import { storageUrl } from "@/utils/storage";

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
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const handleButtonClick = () => {
        if (role === 'teacher' && meetingLink) {
            window.open(meetingLink, '_blank');
        } else {
            onActionClick();
        }
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-white p-3 shadow-sm hover:border-[#3ABEFF]/70 sm:flex-row">
            <img src={storageUrl(image)} className="h-36 w-full rounded-md object-cover sm:h-32 sm:w-32" alt={title} />
            <div className="flex flex-grow flex-col justify-between">
                <div>
                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800">{title}</h3>

                    <p className="mb-1 line-clamp-1 text-xs text-gray-600">
                        {mentor} | {institute}
                    </p>

                    <p className="mb-1 text-xs text-gray-500">{duration}</p>

                    <p className="mb-2 text-xs text-gray-600">
                        {isApproved ? 'Finish at ' : 'Start at '}
                        <span className="font-medium text-black">
                            {formattedDate} {time}
                        </span>
                    </p>
                </div>
                <div className="mt-2 flex justify-end">
                    {status === 'completed' ? (
                        role === 'student' ? (
                            <button
                                onClick={onAddReview}
                                className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                            >
                                Add Review
                            </button>
                        ) : null
                    ) : (
                        <button
                            onClick={handleButtonClick}
                            className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                        >
                            {role === 'student' ? 'Join Meeting' : isCourseFinished ? 'Finish' : meetingLink ? 'Join Meeting' : 'Add Meeting'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
