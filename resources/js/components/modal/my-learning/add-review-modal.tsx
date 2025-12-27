import { storageUrl } from '@/utils/storage';
import { X } from 'lucide-react';
import { useState } from 'react';

export function AddReviewModal({
    onSubmit,
    onClose,
    teacher,
    institute,
    course,
}: {
    onSubmit: (review: {
        teacher: { rating: number; comment: string };
        institute: { rating: number; comment: string };
        course: { rating: number; comment: string };
    }) => void;
    onClose: () => void;

    teacher: { image: string; name: string; role: string };
    institute: { image: string; name: string; role: string };
    course: { image: string; name: string };
}) {
    const [step, setStep] = useState(1);

    const [teacherRating, setTeacherRating] = useState(0);
    const [teacherComment, setTeacherComment] = useState('');
    const [instituteRating, setInstituteRating] = useState(0);
    const [instituteComment, setInstituteComment] = useState('');
    const [courseRating, setCourseRating] = useState(0);
    const [courseComment, setCourseComment] = useState('');

    const handleSubmit = () => {
        onSubmit({
            teacher: { rating: teacherRating, comment: teacherComment },
            institute: { rating: instituteRating, comment: instituteComment },
            course: { rating: courseRating, comment: courseComment },
        });
    };

    const renderSection = (data: {
        title: string;
        subtitle: string;
        image: string;
        name: string;
        role?: string;
        rating: number;
        setRating: (v: number) => void;
        comment: string;
        setComment: (v: string) => void;
    }) => (
        <>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
                <X size={20} />
            </button>

            <h2 className="mb-1 text-xl font-semibold text-gray-800">Give Review</h2>
            <p className="mb-6 text-sm text-gray-500">{data.subtitle}</p>

            <div className="mb-3 flex items-center justify-center gap-3">
                <img src={storageUrl(data.image)} className="h-12 w-12 rounded-md object-cover" />
                <div className="text-left">
                    <p className="font-medium text-gray-800">{data.name}</p>
                    {data.role && <p className="text-xs text-gray-500">{data.role}</p>}
                </div>
            </div>

            <div className="mb-4 flex justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        onClick={() => data.setRating(num)}
                        className={`text-2xl ${num <= data.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                ))}
            </div>

            <textarea
                value={data.comment}
                onChange={(e) => data.setComment(e.target.value)}
                placeholder="Type your review..."
                className="mb-4 h-24 w-full rounded-lg border px-4 py-2 text-sm"
            />
        </>
    );

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#3ABEFF]/40 backdrop-blur-sm">
            <div className="animate-fadeIn relative max-h-[85vh] w-[90%] max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-center shadow-2xl">
                {step === 1 &&
                    renderSection({
                        title: 'Teacher Review',
                        subtitle: 'Give your personal review of the teacher who taught you',
                        image: teacher.image,
                        name: teacher.name,
                        role: teacher.role,
                        rating: teacherRating,
                        setRating: setTeacherRating,
                        comment: teacherComment,
                        setComment: setTeacherComment,
                    })}

                {step === 2 &&
                    renderSection({
                        title: 'Institute Review',
                        subtitle: 'Give your personal review of the institute you joined',
                        image: institute.image,
                        name: institute.name,
                        role: institute.role,
                        rating: instituteRating,
                        setRating: setInstituteRating,
                        comment: instituteComment,
                        setComment: setInstituteComment,
                    })}

                {step === 3 &&
                    renderSection({
                        title: 'Course Review',
                        subtitle: 'Give your personal review of the course you have taken',
                        image: course.image,
                        name: course.name,
                        rating: courseRating,
                        setRating: setCourseRating,
                        comment: courseComment,
                        setComment: setCourseComment,
                    })}

                <div className="mb-4 flex justify-center">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`mx-1 h-2 w-2 rounded-full ${step === num ? 'bg-[#3ABEFF]' : 'bg-gray-300'}`}></div>
                    ))}
                </div>

                <div className="mt-6 flex gap-3">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="flex-1 rounded-lg border border-gray-300 py-2">
                            Back
                        </button>
                    ) : (
                        <button onClick={onClose} className="flex-1 rounded-lg border border-gray-300 py-2">
                            Cancel
                        </button>
                    )}

                    {step < 3 ? (
                        <button onClick={() => setStep(step + 1)} className="flex-1 rounded-lg bg-[#3ABEFF] py-2 text-white">
                            Next
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="flex-1 rounded-lg bg-[#3ABEFF] py-2 text-white">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
