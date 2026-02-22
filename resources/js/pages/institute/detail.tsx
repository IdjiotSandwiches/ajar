import DynamicModal from '@/components/modal/modal';
import CourseCard from '@/components/ui/course-card';
import AppLayout from '@/layouts/app-layout';
import { storageUrl } from '@/utils/storage';
import { Head, InfiniteScroll, router, usePage } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaStar } from 'react-icons/fa';

export default function InstituteDetailPage({ institute, courses, teachers, application }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    const [showApplyModal, setShowApplyModal] = React.useState(false);

    const handleConfirmApply = () => {
        router.post(route('teacher.apply-as-teacher', institute?.user_id));
        setShowApplyModal(false);
    };

    const icons: any = {
        Github: FaGithub,
        Instagram: FaInstagram,
        LinkedIn: FaLinkedinIn,
    };

    if (!institute) {
        return <div className="flex min-h-screen items-center justify-center text-gray-500">Institution not found.</div>;
    }

    console.log(institute)

    return (
        <>
            <Head title={institute?.user?.name || 'Not Found'} />
            <div className="flex min-h-screen flex-col">
                <div className="mx-auto mt-8 w-full max-w-6xl p-6">
                    <div className="flex flex-col items-stretch overflow-hidden rounded-xl shadow-md md:flex-row">
                        <div className="flex items-center justify-center bg-[#3ABEFF] p-6 py-8 md:p-6 md:py-6 dark:bg-[#222831]">
                            <img
                                src={storageUrl(institute.user?.profile_picture)}
                                alt={institute.user.name}
                                className="h-28 w-28 rounded-lg object-cover outline-6 outline-white md:h-40 md:w-40"
                            />
                        </div>
                        <div className="relative flex flex-1 cursor-default flex-col items-center justify-between gap-4 bg-[#3ABEFF] p-4 text-white md:flex-row md:items-center md:gap-0 md:p-6 dark:bg-[#222831]">
                            <div className="pointer-events-none absolute top-0 right-0 h-full opacity-100">
                                <img src="/images/gear.png" alt="gear-bg" className="h-full object-contain" />
                            </div>

                            <div className="z-10 flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                                <h2 className="text-2xl font-semibold md:text-3xl">{institute.user.name}</h2>

                                {institute.website ? (
                                    <a
                                        href={institute.website}
                                        target="_blank"
                                        className="flex cursor-pointer items-center justify-center gap-1 text-sm text-white underline transition hover:opacity-90 md:justify-start"
                                    >
                                        {institute.website}
                                        <SquareArrowOutUpRight className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <span className="text-sm text-white opacity-80">No contact available</span>
                                )}

                                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed md:mx-0">{institute.description}</p>
                            </div>

                            <div className="z-10 flex w-full items-center justify-center gap-10 md:w-auto md:items-center md:justify-end md:gap-16">
                                <div className="text-center">
                                    <p className="text-lg font-semibold">{institute.courses_count || 0}</p>
                                    <p className="text-sm opacity-90">Courses</p>
                                </div>
                                <div className="text-center">
                                    <p className="flex items-center justify-center gap-1 text-lg font-semibold">
                                        {institute.reviews_avg_rating || 0} <FaStar className="text-yellow-300" />
                                    </p>
                                    <p className="text-sm opacity-90">Rating</p>
                                </div>
                                <div className="ml-4 flex flex-col gap-4">
                                    {(() => {
                                        const socials = institute?.user?.social_medias ?? [];
                                        return socials
                                            .filter((x: any) => icons[x.social_media_type?.name])
                                            .map((x: any) => {
                                                const Icon = icons[x.social_media_type.name];
                                                return (
                                                    <a
                                                        key={x.id}
                                                        href={x.url}
                                                        className="hover:text-blue-100"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Icon size={18} />
                                                    </a>
                                                );
                                            });
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {user?.role_id === roles.Teacher &&
                        (!application?.is_verified ? (
                            <button
                                onClick={() => setShowApplyModal(true)}
                                disabled={application && application?.is_verified == null}
                                className="mt-5 w-full cursor-pointer rounded-lg bg-[#3ABEFF] py-2 font-semibold text-white transition-all hover:bg-[#3ABEFF]/90 disabled:cursor-not-allowed disabled:bg-[#3ABEFF]/90"
                            >
                                {application && application?.is_verified == null ? 'Please wait a moment' : 'Apply As Teacher'}
                            </button>
                        ) : (
                            <div className="mt-5 w-full rounded-lg bg-[#3ABEFF] py-2 text-center font-semibold text-white">
                                You are verified teacher
                            </div>
                        ))}
                    <div className="mt-10">
                        <h3 className="mb-4 text-xl font-semibold">Teachers</h3>
                        {teachers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
                                {teachers.map((item: any, idx: number) => {
                                    const teacher = item?.teacher;
                                    return (
                                        <div key={idx} className="flex flex-col items-center text-center">
                                            <div
                                                className="mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200"
                                                onClick={() => router.get(route('detail-teacher', teacher.user_id))}
                                            >
                                                {teacher.user?.profile_picture ? (
                                                    <img
                                                        src={storageUrl(teacher.user?.profile_picture)}
                                                        alt={teacher.user.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-600">{teacher.user.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium">{teacher.user.name}</p>
                                            <p className="text-center text-xs text-gray-500 dark:text-white/70">{teacher.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-sm text-gray-500 dark:text-white/80">
                                <p className="font-medium text-gray-700 dark:text-white">No teachers yet</p>
                                <p className="mt-1">This institution hasn't added any teachers yet.</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-10">
                        <h3 className="mb-4 text-xl font-semibold">Courses</h3>
                        {courses.data.length == 0 ? (
                            <div className="py-8 text-center text-sm text-gray-500 dark:text-white/80">
                                <p className="font-medium text-gray-700 dark:text-white">No courses available</p>
                                <p className="mt-1">This institution hasn't added any courses yet.</p>
                            </div>
                        ) : (
                            <InfiniteScroll
                                buffer={1}
                                loading={() => 'Loading more courses...'}
                                data="courses"
                                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {courses.data.map((course: any, index: number) => (
                                    <CourseCard key={index} course={course} isTag={false} />
                                ))}
                            </InfiniteScroll>
                        )}
                    </div>
                </div>
            </div>

            <DynamicModal
                type="confirmation"
                isOpen={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                onConfirm={handleConfirmApply}
                description={`Are you sure you want to apply as a teacher at ${institute.user.name}?`}
            />
        </>
    );
}

InstituteDetailPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
