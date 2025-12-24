import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import DynamicModal from '../modal/modal';

export default function CourseHero({ course, teaching, canApply }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    const [showApplyModal, setShowApplyModal] = useState(false);

    const handleTeacherApply = () => {
        setShowApplyModal(true);
    };

    const handleConfirmApplyTeacher = () => {
        router.post(route('teacher.apply-to-course', course?.id));
        setShowApplyModal(false);
    };

    return (
        <>
            <section className="w-full border-b dark:border-white/20 border-gray-200 bg-white dark:bg-[#222831] py-10">
                <div className="mx-auto mt-8 grid grid-cols-1 items-start gap-10 px-4 sm:px-6 md:px-12 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="mb-3 flex items-center gap-2 text-sm">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <span className="font-semibold text-gray-800 dark:text-white">
                                {course.course_reviews_avg_rating ?? 0}
                            </span>
                            <span className="text-[#3ABEFF]">
                                ({course.course_reviews_count} reviews)
                            </span>
                        </div>

                        <h1 className="mb-3 text-3xl font-bold leading-snug text-gray-800 dark:text-white">
                            {course.name}
                        </h1>

                        <p className="mb-4 text-gray-700 dark:text-white/90">
                            <span className="font-semibold">Duration:</span>{' '}
                            {course.duration} Minutes
                        </p>

                        <p className="mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-white/80">
                            {course.description}
                        </p>

                        <div className="mb-8 grid gap-x-6 gap-y-3 text-gray-700 dark:text-white/90 md:grid-cols-3">
                            {course.benefits?.map((item: any) => (
                                <p
                                    key={item.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <FaCheck className="text-[#3ABEFF]" />
                                    {item.description}
                                </p>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-6">
                            {(user?.role_id === roles.Student || !user) && (
                                <button
                                    onClick={() => router.get(route('payment-register', course.id))}
                                    className="cursor-pointer rounded-lg bg-[#3ABEFF] px-7 py-3 font-medium text-white transition hover:bg-[#2fa5d8]"
                                >
                                    Register Now
                                </button>
                            )}
                            {(user?.role_id === roles.Teacher && canApply) &&
                                (!teaching?.is_verified ? (
                                    <button
                                        onClick={handleTeacherApply}
                                        disabled={teaching && teaching?.is_verified == null}
                                        className="cursor-pointer rounded-lg bg-[#3ABEFF] px-7 py-3 font-medium text-white transition hover:bg-[#2fa5d8]"
                                    >
                                        {teaching && teaching?.is_verified == null ? 'Please wait a moment' : 'Apply As Teacher'}
                                    </button>
                                ) : (
                                    <div className="rounded-lg bg-[#3ABEFF] px-7 py-3 font-medium text-white transition hover:bg-[#2fa5d8]">
                                        Verified
                                    </div>
                                ))}

                            <div className="flex items-center gap-2">
                                {(user && user.role_id === roles.Teacher) ? (
                                    <p className="text-xl font-bold text-[#3ABEFF]">
                                        Rp
                                        {Number(course.teacher_salary).toLocaleString('id-ID', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-xl font-bold text-[#3ABEFF]">
                                            Rp
                                            {Number(Number(course.price) - (Number(course.price) * Number(course.discount)) / 100).toLocaleString(
                                                'id-ID',
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                },
                                            )}
                                        </p>
                                        {Number(course.discount) > 0 && (
                                            <p className="text-sm text-gray-400 line-through">
                                                Rp
                                                {Number(course.price).toLocaleString('id-ID', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center lg:col-span-1">
                        <img
                            src={course?.image || 'https://placehold.co/400'}
                            alt={course.name}
                            className="max-h-[320px] w-full max-w-[480px] rounded-xl object-cover shadow-sm ring-1 ring-gray-200"
                        />
                    </div>
                </div>
            </section>

            <DynamicModal
                type="confirmation"
                isOpen={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                onConfirm={handleConfirmApplyTeacher}
                description={`Are you sure you want to apply as a teacher for "${course.name}"?`}
            />

        </>
    );
}
