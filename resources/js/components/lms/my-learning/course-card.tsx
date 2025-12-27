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

    const PrimaryButton = ({ onClick, children, disabled = false }: any) => (
        <button
            onClick={onClick}
            className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90 disabled:bg-[#6ecefd]"
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
            }
        });
    };

    console.log(enroll)

    const actions = {
        [roles.Student]: () => {
            if (state === states.Ongoing) return <PrimaryButton onClick={handleJoinButton}>Join Meeting</PrimaryButton>;
            if (!enroll.has_review) return <PrimaryButton onClick={handleReviewButton}>Add Review</PrimaryButton>;
        },
        [roles.Teacher]: () => {
            if (state === states.Completed) {
                if (enroll.is_verified == null) return <PrimaryButton disabled={true}>Verifying</PrimaryButton>;
                else if (enroll.is_verified) return <PrimaryButton disabled={true}>Verified</PrimaryButton>;
                else return <PrimaryButton disabled={true}>Rejected</PrimaryButton>;
            }
            if (enroll.has_finished) return <PrimaryButton onClick={() => setModalType('recording')}>Finish Course</PrimaryButton>;
            if (!enroll.meeting_link) return <PrimaryButton onClick={() => setModalType('meeting')}>Add Meeting</PrimaryButton>;
            return <PrimaryButton onClick={handleJoinButton}>Join Meeting</PrimaryButton>;
        },
    };

    const actionButton = () => actions[user?.role_id!]?.() ?? null;

    return (
        <>
            <div className="flex flex-col gap-4 rounded-xl border p-3 shadow-sm hover:border-[#3ABEFF]/70 sm:flex-row dark:border-white/20 dark:shadow-[#ffffff]/20 dark:hover:border-[#3ABEFF]/70">
                <img src={storageUrl(enroll.image)} className="h-36 w-full rounded-md object-cover sm:h-32 sm:w-32" alt={enroll.name} />
                <div className="flex flex-grow flex-col justify-between">
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
