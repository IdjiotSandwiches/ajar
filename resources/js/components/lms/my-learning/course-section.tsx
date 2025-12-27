import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { StatusTabs } from '../applications-teacher/status-switch';
import { storageUrl } from '@/utils/storage';

export default function CourseSection({ courses, state }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    const states = props.enums?.learning_status_enum;

    const [activeStatus, setActiveStatus] = useState<number>(state || states.Ongoing);

    const handleStatusChange = (status: any) => {
        setActiveStatus(status || activeStatus);
        router.reload({ data: { status: status || activeStatus } });
    };
    return (
        <>
            <StatusTabs
                active={activeStatus}
                onChange={handleStatusChange}
                counts={{
                    1: 10,
                    2: 10,
                }}
                states={states}
            />
            <div className="rounded-2xl border shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                <div className="rounded-2xl border p-6">
                    <h3 className="mb-4 text-lg font-semibold">{Object.keys(states).find((key) => states[key] === activeStatus)} Courses</h3>

                    {courses.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                            <p className="mb-1 font-medium text-gray-700 dark:text-white/80">
                                {activeStatus === states.Ongoing ? 'No ongoing courses.' : 'No completed courses yet.'}
                            </p>
                            <p className="mb-4 max-w-xs text-sm dark:text-white/70">
                                {activeStatus === states.Ongoing ? 'Start learning by enrolling in a course!' : 'Finish a course to see it here!'}
                            </p>

                            {user?.role_id === roles.Student && (
                                <button
                                    onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                    className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                >
                                    Browse Courses
                                </button>
                            )}
                        </div>
                    ) : (
                        <InfiniteScroll buffer={1} loading={() => 'Loading more courses...'} data="courses" className="flex flex-col gap-4">
                            {courses.data.map((course: any, index: number) => (
                                // <CourseCard
                                //     key={course.id}
                                //     {...course}
                                //     role={role}
                                //     status={course.status}
                                //     isCourseFinished={isCourseFinished(course)}
                                //     onActionClick={() => onActionClick(course)}
                                //     onAddReview={() => onAddReview(course)}
                                // />
                                // <div key={index}>{course.name}</div>
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
                                                {/* {isApproved ? 'Finish at ' : 'Start at '} */}
                                                <span className="font-medium text-black dark:text-white">
                                                    {/* {formattedDate} {time} */}
                                                    {course.schedule}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="mt-2 flex justify-end">
                                            {/* {status === 'completed' ? (
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
                                                    {role === 'student'
                                                        ? 'Join Meeting'
                                                        : isCourseFinished
                                                          ? 'Finish'
                                                          : meetingLink
                                                            ? 'Join Meeting'
                                                            : 'Add Meeting'}
                                                </button>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </>
    );
}
