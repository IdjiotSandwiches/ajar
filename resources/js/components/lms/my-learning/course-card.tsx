import DynamicModal from '@/components/modal/modal';
import AddLinkModal from '@/components/modal/my-learning/add-link-modal';
import { AddReviewModal } from '@/components/modal/my-learning/add-review-modal';
import { storageUrl } from '@/utils/storage';
import { router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CourseCard({ enroll, state, review }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    const states = props.enums?.learning_status_enum;

    const [modalType, setModalType] = useState<string | null>(null);
    const [reviewModal, setReviewModal] = useState(false);

    const form = useForm({
        teacher_rating: 0,
        teacher_review: '',
        institute_rating: 0,
        institute_review: '',
        course_rating: 0,
        course_review: '',
    });

    const handleJoinButton = () => {
        if (!enroll.meetingLink && !enroll.can_join && user?.role_id === roles.Student) {
            setModalType('warning');
        } else {
            window.open(enroll.meetingLink, '_blank');
        }
    };

    const PrimaryButton = ({ onClick, children, disabled = false, destructive = false }: any) => (
        <button
            onClick={onClick}
            className={`rounded-lg ${destructive ? 'bg-red-600 hover:bg-red-600/90 disabled:cursor-not-allowed disabled:bg-red-400' : 'bg-[#3ABEFF] hover:bg-[#3ABEFF]/90 disabled:cursor-not-allowed disabled:bg-[#6ecefd]'} px-4 py-2 text-sm text-white transition`}
            disabled={disabled}
        >
            {children}
        </button>
    );

    const handleReviewButton = () => {
        setReviewModal(true);
        router.reload({
            only: ['review'],
            data: { enroll_id: enroll.id },
        });
    };

    const submitReviews = ({ teacher, institute, course }: any) => {
        form.setData({
            teacher_rating: teacher.rating,
            teacher_review: teacher.comment,
            institute_rating: institute.rating,
            institute_review: institute.comment,
            course_rating: course.rating,
            course_review: course.comment,
        });

        form.post(route('add-reviews', enroll.id), {
            onSuccess: () => {
                setModalType('success');
                setReviewModal(false);
            },
        });
    };

    const handleCancel = () => {
        router.post(route('teacher.cancel-schedule', { id: enroll.id }));
        setModalType(null);
    };

    const actions = {
        [roles.Student]: () => {
            if (state === states.Ongoing) return <PrimaryButton onClick={handleJoinButton}>Join Meeting</PrimaryButton>;
            if (state === states.Completed && !enroll.has_review) return <PrimaryButton onClick={handleReviewButton}>Add Review</PrimaryButton>;
        },
        [roles.Teacher]: () => (
            <>
                {enroll.can_cancel && (
                    <PrimaryButton destructive={true} onClick={() => setModalType('confirmation')}>
                        Cancel
                    </PrimaryButton>
                )}

                {state === states.Completed && (
                    <>
                        {enroll.is_verified == null && <PrimaryButton disabled>Verifying</PrimaryButton>}
                        {enroll.is_verified === true && <PrimaryButton disabled>Verified</PrimaryButton>}
                        {enroll.is_verified === false && <PrimaryButton disabled>Rejected</PrimaryButton>}
                    </>
                )}

                {state === states.Ongoing && (
                    <>
                        {enroll.has_finished && <PrimaryButton onClick={() => setModalType('recording')}>Finish Course</PrimaryButton>}

                        {!enroll.has_finished && !enroll.meeting_link && (
                            <PrimaryButton onClick={() => setModalType('meeting')}>Add Meeting</PrimaryButton>
                        )}

                        {!enroll.has_finished && enroll.meeting_link && <PrimaryButton onClick={handleJoinButton}>Join Meeting</PrimaryButton>}
                    </>
                )}
            </>
        ),
    };

    const actionButton = () => actions[user?.role_id!]?.() ?? null;

    return (
        <>
            <div className="flex flex-col gap-4 rounded-xl border p-3 shadow-sm hover:border-[#3ABEFF]/70 sm:flex-row dark:border-white/20 dark:shadow-[#ffffff]/20 dark:hover:border-[#3ABEFF]/70">
                <img src={storageUrl(enroll.image)} className="h-36 w-full rounded-md object-cover sm:h-32 sm:w-32" alt={enroll.name} />
                <div className="flex grow flex-col justify-between">
                    <div>
                        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white">{enroll.name}</h3>
                        <p className="mb-1 line-clamp-1 text-xs text-gray-600 dark:text-white/80">
                            {enroll.teacher} | {enroll.institute}
                        </p>
                        <p className="mb-1 text-xs text-gray-500 dark:text-white/70">{enroll.duration} Minutes</p>
                        <p className="mb-2 text-xs text-gray-600 dark:text-white/80">
                            {state === states.Completed ? 'Finish at ' : 'Start at '}
                            <span className="font-medium text-black dark:text-white">{enroll.schedule}</span>
                        </p>
                        {enroll.enrollment_count && (
                            <p className="mb-2 text-xs text-gray-600 dark:text-white/80">
                                {'Enrollment Count '}
                                <span className="font-medium text-black dark:text-white">{enroll.enrollment_count}</span>
                            </p>
                        )}
                    </div>
                    <div className="mt-2 flex justify-end gap-2">{actionButton()}</div>
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

            {modalType === 'confirmation' && (
                <DynamicModal
                    type="confirmation"
                    isOpen
                    onClose={() => setModalType(null)}
                    onConfirm={handleCancel}
                    description="Are you sure you want to cancel this schedule?"
                    confirmText="Confirm"
                />
            )}

            {modalType === 'meeting' && (
                <AddLinkModal
                    title="Meeting Link"
                    placeholder="Link Meeting"
                    action="course-meeting"
                    id={enroll.id}
                    onClose={() => setModalType(null)}
                    onSuccess={() => setModalType('success')}
                />
            )}

            {modalType === 'recording' && (
                <AddLinkModal
                    title="Recording Link"
                    placeholder="Link Recording"
                    action="course-recording"
                    id={enroll.id}
                    onClose={() => setModalType(null)}
                    onSuccess={() => setModalType('success')}
                />
            )}

            {modalType === 'success' && (
                <DynamicModal type="success" isOpen onClose={() => setModalType(null)} description="Your link has been added successfully!" />
            )}

            {reviewModal && (
                <AddReviewModal
                    onSubmit={submitReviews}
                    onClose={() => setReviewModal(false)}
                    teacher={{
                        ...review?.teacher,
                        role: 'Teacher',
                    }}
                    institute={{
                        ...review?.institute,
                        role: 'Institute',
                    }}
                    course={{
                        ...review?.course,
                    }}
                />
            )}
        </>
    );
}
