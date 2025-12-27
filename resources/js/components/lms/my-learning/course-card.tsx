import DynamicModal from '@/components/modal/modal';
import AddLinkModal from '@/components/modal/my-learning/add-link-modal';
import { storageUrl } from '@/utils/storage';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CourseCard({ course, state }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    const states = props.enums?.learning_status_enum;

    const [modalType, setModalType] = useState<string | null>(null);

    const handleJoinButton = () => {
        if (!course.meetingLink && !course.can_join && user?.role_id === roles.Student) {
            setModalType('warning');
        } else {
            window.open(course.meetingLink, '_blank');
        }
    };

    const PrimaryButton = ({ onClick, children }: any) => (
        <button onClick={onClick} className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90">
            {children}
        </button>
    );

    const actions = {
        [roles.Student]: () => {
            if (state === state.Ongoing) return <PrimaryButton onClick={handleJoinButton}>Join Meeting</PrimaryButton>;
            else return <PrimaryButton>Add Review</PrimaryButton>;
        },
        [roles.Teacher]: () => {
            if (state !== states.Ongoing) return null;
            if (course.has_finished) return <PrimaryButton onClick={() => setModalType('recording')}>Finish Course</PrimaryButton>;
            if (!course.meeting_link) return <PrimaryButton onClick={() => setModalType('meeting')}>Add Meeting</PrimaryButton>;
            return <PrimaryButton onClick={handleJoinButton}>Join Meeting</PrimaryButton>;
        },
    };

    const actionButton = () => actions[user?.role_id!]?.() ?? null;

    return (
        <>
            <div className="flex flex-col gap-4 rounded-xl border p-3 shadow-sm hover:border-[#3ABEFF]/70 sm:flex-row dark:border-white/20 dark:shadow-[#ffffff]/20 dark:hover:border-[#3ABEFF]/70">
                <img src={storageUrl(course.image)} className="h-36 w-full rounded-md object-cover sm:h-32 sm:w-32" alt={course.name} />
                <div className="flex flex-grow flex-col justify-between">
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white">{course.name}</h3>
                        <p className="mb-1 line-clamp-1 text-xs text-gray-600 dark:text-white/80">
                            {course.teacher} | {course.institute}
                        </p>
                        <p className="mb-1 text-xs text-gray-500 dark:text-white/70">{course.duration} Minutes</p>
                        <p className="mb-2 text-xs text-gray-600 dark:text-white/80">
                            {state === states.Completed ? 'Finish at ' : 'Start at '}
                            <span className="font-medium text-black dark:text-white">{course.schedule}</span>
                        </p>
                    </div>
                    <div className="mt-2 flex justify-end">{actionButton()}</div>
                </div>
            </div>

            {modalType === 'warning' && (
                <DynamicModal
                    type="warning"
                    isOpen
                    onClose={() => setModalType(null)}
                    description="Your course has not started yet. You can join 10 minutes before schedule."
                />
            )}

            {modalType === 'meeting' && (
                <AddLinkModal
                    title="Meeting Link"
                    placeholder="Link Meeting"
                    action="course-meeting"
                    id={course.id}
                    onClose={() => setModalType(null)}
                />
            )}

            {modalType === 'recording' && (
                <AddLinkModal
                    title="Recording Link"
                    placeholder="Link Recording"
                    action="course-recording"
                    id={course.id}
                    onClose={() => setModalType(null)}
                />
            )}
            {/*

            {modalType === 'addRecording' && (
                <AddLinkModal
                    title="Recording Link"
                    placeholder="Link Recording"
                    onSubmit={(v) => handleSubmitLink('recording', v)}
                    onClose={() => setModalType(null)}
                />
            )}

            {modalType === 'success' && (
                <DynamicModal type="success" isOpen onClose={() => setModalType(null)} description="Your link has been added successfully!" />
            )}

            {showReviewModal && reviewCourse && (
                <AddReviewModal
                    onSubmit={handleSubmitReview}
                    onClose={() => setShowReviewModal(false)}
                    teacher={{
                        image: reviewCourse.image,
                        name: reviewCourse.mentor,
                        role: 'Teacher',
                    }}
                    institute={{
                        image: reviewCourse.image,
                        name: reviewCourse.institute,
                        role: 'Institute',
                    }}
                    course={{
                        image: reviewCourse.image,
                        name: reviewCourse.title,
                    }}
                />
            )} */}
        </>
    );
}
