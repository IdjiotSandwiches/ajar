import MobileReminder from '@/components/lms/mobile-reminder';
import { Card, CardContent } from '@/components/ui/card';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Calendar, Clock, PlayCircle } from 'lucide-react';
import React from 'react';

export default function StudentDashboard({ today, upcoming, reminder }: any) {
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 4 && hour < 11) return 'Good Morning';
        if (hour >= 11 && hour < 15) return 'Good Afternoon';
        if (hour >= 15 && hour < 19) return 'Good Evening';
        return 'Good Night';
    };

    return (
        <div className="flex w-full flex-col gap-6">
            <h1 className="hidden text-2xl font-semibold text-gray-800 md:flex">My Dashboard</h1>
            <Card className="overflow-hidden rounded-2xl border-none bg-[#3ABEFF]/10 shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#3ABEFF]">{getGreeting()}!</h2>
                        <p className="mt-2 max-w-lg text-sm text-[#3ABEFF]">
                            "Education is not the learning of facts, but the training of the mind to think."
                        </p>
                    </div>
                    <img src="https://illustrations.popsy.co/blue/student.svg" className="w-40" />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="col-span-1">
                    <MobileReminder reminder={reminder} />
                </div>
                <div className="col-span-2 gap-6">
                    <Card className="mb-6 rounded-2xl border-none shadow-sm">
                        <CardContent>
                            <h3 className="mb-4 text-lg font-semibold">Today Classes</h3>

                            {today.data.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                                    <p className="mb-1 font-medium text-gray-700">No classes today</p>
                                    <p className="mb-4 max-w-xs text-sm">
                                        You don't have any scheduled classes today. Enroll a course to start learning!
                                    </p>

                                    <button
                                        className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90 cursor-pointer"
                                        onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {today.data.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
                                            <div>
                                                <span className="font-medium">{item.title}</span>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Clock size={14} /> {item.time}
                                                </div>
                                                <span className="text-sm text-gray-500">{item.teacher}</span>
                                            </div>

                                            <a
                                                href={item.meetingUrl}
                                                className="flex items-center gap-2 rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                            >
                                                <PlayCircle size={16} />
                                                Join
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl border-none shadow-sm">
                        <CardContent>
                            <h3 className="mb-4 text-lg font-semibold">Upcoming Classes</h3>

                            {upcoming.data.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                                    <p className="mb-1 font-medium text-gray-700">No upcoming classes</p>
                                    <p className="mb-4 max-w-xs text-sm">You don’t have any upcoming classes. Start exploring new courses now!</p>

                                    <button
                                        className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90 cursor-pointer"
                                        onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                    >
                                        Browse Courses
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {upcoming.data.map((item: any, i: number) => (
                                        <div key={i} className="rounded-xl border bg-white p-4 shadow-sm">
                                            <span className="font-medium">{item.title}</span>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Calendar size={14} /> {item.time}
                                            </div>
                                            <span className="text-sm text-gray-500">{item.teacher}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

StudentDashboard.layout = (page: React.ReactNode) => <LMSLayout title="My Dashboard">{page}</LMSLayout>;
