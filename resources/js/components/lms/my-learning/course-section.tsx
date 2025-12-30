import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { BookOpen, CheckCircle2, CircleOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StatusTabs } from '../applications-teacher/status-switch';
import CourseCard from './course-card';

export default function CourseSection({ courses, counts, review, state }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    const states = props.enums?.learning_status_enum;

    const [activeStatus, setActiveStatus] = useState<number>(state || states.Ongoing);

    const isOngoing = state === states.Ongoing;

    const emptyConfig = {
        icon: isOngoing ? BookOpen : CheckCircle2,
        title: isOngoing ? 'No ongoing courses' : 'No completed courses',
        desc: isOngoing ? 'You are not enrolled in any active courses yet.' : 'You have not completed any courses yet.',
        cta: isOngoing ? 'Browse Courses' : null,
    };

    const handleStatusChange = (status: any) => {
        setActiveStatus(status || activeStatus);
        router.reload({ data: { status: status || activeStatus } });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload();
        }, 60_000);

        return () => clearInterval(interval);
    }, []);

    const EmptyCourse = ({ title, body, Icon }: any) => {
        return (
            <>
                <Icon className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
                <p className="text-base font-semibold text-gray-700 dark:text-white">{title}</p>

                <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-white/70">{body}</p>
                {user?.role_id === roles.Student && state === states.Ongoing && (
                    <button
                        onClick={() => router.get(route('list-course'))}
                        className="mt-4 rounded-lg bg-[#3ABEFF] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#3ABEFF]/90"
                    >
                        Browse Courses
                    </button>
                )}
            </>
        );
    };

    const statusDict: Record<number, any> = {
        1: <EmptyCourse title={'No ongoing courses.'} body={'Start learning by enrolling in a course!'} Icon={BookOpen} />,
        2: <EmptyCourse title={'No completed courses yet.'} body={'Finish a course to see it here!'} Icon={CheckCircle2} />,
        3: <EmptyCourse title={'No cancelled courses.'} body={'Cancelled courses will appear here!'} Icon={CircleOff} />,
    };

    return (
        <>
            <StatusTabs active={activeStatus} onChange={handleStatusChange} counts={counts} states={states} />
            <div className="rounded-2xl border shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
                <div className="rounded-2xl border p-6">
                    <h3 className="mb-4 text-lg font-semibold">{Object.keys(states).find((key) => states[key] === state)} Courses</h3>

                    {courses.data?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                            {statusDict[state]}
                        </div>
                    ) : (
                        <InfiniteScroll
                            manual
                            next={({ loading, fetch, hasMore }) => (
                                <div className="h-4 pt-2 text-center text-sm">
                                    {hasMore && (
                                        <button onClick={fetch} disabled={loading}>
                                            {loading ? 'Loading...' : 'Load more'}
                                        </button>
                                    )}
                                </div>
                            )}
                            buffer={1}
                            loading={() => 'Loading more courses...'}
                            data="courses"
                            className="flex max-h-168 flex-col gap-4 overflow-y-auto"
                        >
                            {courses.data?.map((course: any, index: number) => (
                                <CourseCard key={index} enroll={course} review={review} state={state} />
                            ))}
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </>
    );
}
