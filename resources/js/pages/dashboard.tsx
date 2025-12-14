import MobileReminder from '@/components/lms/mobile-reminder';
import { Card, CardContent } from '@/components/ui/card';
import LMSLayout from '@/layouts/lms-layout';
import { InfiniteScroll, router } from '@inertiajs/react';
import { Calendar, Clock, PlayCircle } from 'lucide-react';
import React from 'react';

export default function StudentDashboard({ today, upcoming }: any) {
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 11) return 'Good Morning';
        if (hour >= 11 && hour < 15) return 'Good Afternoon';
        if (hour >= 15 && hour < 19) return 'Good Evening';
        return 'Good Night';
    };

    const greeting = getGreeting();

    const todayClasses: any[] = [
        {
            title: 'Physics - Chapter 5',
            time: '09:00 - 10:00',
            teacher: 'Mr. Daniel',
            meetingUrl: '#',
        },
        {
            title: 'Mathematics - Algebra',
            time: '11:00 - 12:00',
            teacher: 'Ms. Erika',
            meetingUrl: '#',
        },
        {
            title: 'Mathematics - Algebra',
            time: '11:00 - 12:00',
            teacher: 'Ms. Erika',
            meetingUrl: '#',
        },
    ];

    const upcomingClasses: any[] = [
        {
            title: 'Biology - Cell Division',
            time: 'Tomorrow · 10:00',
            teacher: 'Mr. James',
        },
        {
            title: 'English - Grammar',
            time: 'Tomorrow · 13:00',
            teacher: 'Mrs. Alice',
        },
    ];

    return (
        <div className="flex w-full flex-col gap-6">
            <h1 className="hidden text-2xl font-semibold text-gray-800 md:flex">My Dashboard</h1>
            <Card className="overflow-hidden rounded-2xl border-none bg-[#3ABEFF]/10 shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#3ABEFF]">{greeting}!</h2>
                        <p className="mt-2 max-w-lg text-sm text-[#3ABEFF]">
                            "Education is not the learning of facts, but the training of the mind to think."
                        </p>
                    </div>
                    <img src="https://illustrations.popsy.co/blue/student.svg" className="w-40" />
                </CardContent>
            </Card>

            <div className="md:hidden">
                <MobileReminder />
            </div>

            <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardContent>
                        <h3 className="mb-4 text-lg font-semibold">Today Classes</h3>
                        {today.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                                <p className="mb-1 font-medium text-gray-700">No classes today</p>
                                <p className="mb-4 max-w-xs text-sm">
                                    You don't have any scheduled classes today. Enroll a course to start learning!
                                </p>

                                <p
                                    className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                    onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                >
                                    Enroll Now
                                </p>
                            </div>
                        ) : (
                            <InfiniteScroll
                                manual
                                buffer={1}
                                loading={() => 'Loading more courses...'}
                                data="today"
                                className="flex h-72 flex-col"
                                next={({ loading, fetch, hasMore }) => (
                                    <div className="h-8 w-full pt-4 text-center">
                                        {hasMore && (
                                            <button onClick={fetch} disabled={loading}>
                                                {loading ? 'Loading...' : 'Load more'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            >
                                <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
                                    {today.data.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
                                            <div>
                                                <span className="font-medium">{item.name}</span>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Clock size={14} /> {item.start_time} - {item.end_time}
                                                </div>
                                                <span className="text-sm text-gray-500">{item.teacher}</span>
                                            </div>

                                            <a
                                                href={item.meetingUrl || ''}
                                                className="flex items-center gap-2 rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                            >
                                                <PlayCircle size={16} />
                                                Join
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm">
                    <CardContent>
                        <h3 className="mb-4 text-lg font-semibold">Upcoming Classes</h3>
                        {upcoming.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                                <p className="mb-1 font-medium text-gray-700">No upcoming classes</p>
                                <p className="mb-4 max-w-xs text-sm">You don't have any upcoming classes. Start exploring new courses now!</p>

                                <p
                                    className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                    onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                >
                                    Browse Courses
                                </p>
                            </div>
                        ) : (
                            <InfiniteScroll
                                manual
                                buffer={1}
                                loading={() => 'Loading more courses...'}
                                data="upcoming"
                                className="flex h-72 flex-col"
                                next={({ loading, fetch, hasMore }) => (
                                    <div className="h-8 w-full pt-4 text-center">
                                        {hasMore && (
                                            <button onClick={fetch} disabled={loading}>
                                                {loading ? 'Loading...' : 'Load more'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            >
                                <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
                                    {upcoming.data.map((item: any, i: number) => (
                                        <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
                                            <span className="font-medium">{item.name}</span>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Calendar size={14} /> {item.start_time} - {item.end_time}
                                            </div>
                                            <span className="text-sm text-gray-500">{item.teacher}</span>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

StudentDashboard.layout = (page: React.ReactNode) => <LMSLayout title="My Dashboard">{page}</LMSLayout>;
