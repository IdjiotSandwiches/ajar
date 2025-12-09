import CourseCard from '@/components/ui/course-card';
import AppLayout from '@/layouts/app-layout';
import { Head, InfiniteScroll, router, usePage } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaStar } from 'react-icons/fa';

export default function InstituteDetailPage({ institute, courses, teachers, application, canApply }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    const icons: any = {
        Github: FaGithub,
        Instagram: FaInstagram,
        LinkedIn: FaLinkedinIn,
    };

    if (!institute) {
        return <div className="flex min-h-screen items-center justify-center text-gray-500">Institution not found.</div>;
    }

    return (
        <>
            <Head title={institute?.user?.name || 'Not Found'} />
            <div className="flex min-h-screen flex-col bg-[#F8FCFF]">
                <div className="mx-auto w-full max-w-6xl p-6">
                    <div className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-xl shadow-md">
                        <div className="flex items-center justify-center bg-[#42C2FF] p-6 md:p-6 py-8 md:py-6">
                            <img
                                src={institute.user?.profile_picture || 'https://placehold.co/400'}
                                alt={institute.user.name}
                                className="h-28 w-28 md:h-40 md:w-40 rounded-lg object-cover outline-6 outline-white"
                            />
                        </div>
                        <div className="relative flex flex-col md:flex-row flex-1 cursor-default items-center md:items-center justify-between bg-[#42C2FF] p-4 md:p-6 text-white gap-4 md:gap-0">
                            <div className="pointer-events-none absolute top-0 right-0 h-full opacity-100">
                                <img src="/images/gear.png" alt="gear-bg" className="h-full object-contain" />
                            </div>

                            <div className="z-10 flex flex-col items-center md:items-start flex-1 text-center md:text-left">

                                <h2 className="text-2xl md:text-3xl font-semibold">{institute.user.name}</h2>

                                {institute.user.email ? (
                                    <a
                                        href={`mailto:${institute.user.email}`}
                                        className="flex justify-center md:justify-start cursor-pointer items-center gap-1 text-sm text-white underline transition hover:opacity-90"
                                    >
                                        {institute.user.email}
                                        <SquareArrowOutUpRight className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <span className="text-sm text-white opacity-80">No contact available</span>
                                )}

                                <p className="mt-2 max-w-md mx-auto md:mx-0 text-sm leading-relaxed">
                                    {institute.description}
                                </p>
                            </div>

                            <div className="z-10 flex gap-10 md:gap-16 items-center md:items-center justify-center md:justify-end w-full md:w-auto">
                                <div className="text-center">
                                    <p className="text-lg font-semibold">{courses.length || 0}</p>
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
                        canApply &&
                        (!application?.is_verified ? (
                            <button
                                onClick={() => router.post(route('teacher.apply-as-teacher', institute?.user_id))}
                                disabled={application && application?.is_verified == null}
                                className="mt-5 w-full cursor-pointer rounded-lg bg-[#42C2FF] py-2 font-semibold text-white transition-all hover:bg-[#42C2FF]/90 disabled:cursor-not-allowed disabled:bg-[#42C2FF]/90"
                            >
                                {application && application?.is_verified == null ? 'Please wait a moment' : 'Apply As Teacher'}
                            </button>
                        ) : (
                            <div className="mt-5 w-full rounded-lg bg-[#42C2FF] py-2 text-center font-semibold text-white">
                                You are verified teacher
                            </div>
                        ))}
                    <div className="mt-10">
                        <h3 className="mb-4 text-xl font-semibold">Teachers</h3>
                        {teachers.length > 0 ? (
                            <div className="flex justify-center md:justify-start cursor-pointer flex-wrap gap-8">
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
                                                        src={teacher.user?.profile_picture || 'https://placehold.co/400'}
                                                        alt={teacher.user.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-600">{teacher.user.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium">{teacher.user.name}</p>
                                            <p className="text-center text-xs text-gray-500">{teacher.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500">No teachers found for this institution.</p>
                        )}
                    </div>
                    <div className="mt-10">
                        <h3 className="mb-4 text-xl font-semibold">Courses</h3>
                        <InfiniteScroll
                            buffer={1}
                            loading={() => 'Loading more courses...'}
                            data="courses"
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {courses.data.length == 0 ? (
                                <p className="text-gray-500">Course empty.</p>
                            ) : (
                                courses.data.map((course: any, index: number) => <CourseCard key={index} course={course} isTag={false} />)
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    );
}

InstituteDetailPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
