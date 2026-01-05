import DynamicModal from '@/components/modal/modal';
import { Card, CardContent } from '@/components/ui/card';
import { InfiniteScroll, router, usePage } from '@inertiajs/react';
import { Book, Calendar, Clock, PlayCircle } from 'lucide-react';
import { useState } from 'react';

export default function ClassSection({ title, course, type }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    const emptyMessageMap: Record<number, any> = {
        1: {
            today: {
                title: 'No classes today',
                desc: 'There are no active classes scheduled today.',
            },
            upcoming: {
                title: 'No upcoming classes',
                desc: 'There are no upcoming classes in the system.',
            },
        },
        2: {
            today: {
                title: 'No classes today',
                desc: "You don't have any teaching schedule today.",
            },
            upcoming: {
                title: 'No upcoming classes',
                desc: "You don't have any upcoming teaching schedules.",
            },
        },
        3: {
            today: {
                title: 'No classes today',
                desc: 'There are no courses running today under your institute.',
            },
            upcoming: {
                title: 'No upcoming classes',
                desc: 'There are no upcoming courses scheduled under your institute.',
            },
        },
        4: {
            today: {
                title: 'No classes today',
                desc: "You don't have any scheduled classes today. Enroll a course to start learning!",
                cta: 'Enroll Now',
            },
            upcoming: {
                title: 'No upcoming classes',
                desc: "You don't have any upcoming classes. Start exploring new courses now!",
                cta: 'Browse Courses',
            },
        },
    };

    const empty = emptyMessageMap[Number(user?.role_id)][type];
    const [modalType, setModalType] = useState<string | null>(null);
    const [modalText, setModalText] = useState<string | null>(null);

    const formatDate = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);

        return `${start.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })} · ${start.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        })} - ${end.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const handleJoinButton = (item: any) => {
        if (!item.can_join && user?.role_id === roles.Student) {
            setModalType('warning');
            setModalText('Your course has not started yet. You can join 10 minutes before schedule.');
        } else if (!item.meeting_link && user?.role_id === roles.Student) {
            setModalType('warning');
            setModalText("The meeting link isn't available yet.");
        } else {
            window.open(item.meeting_link, '_blank');
        }
    };

    return (
        <>
            <Card className="rounded-2xl border-none shadow-sm dark:shadow-[#ffffff]/20">
                <CardContent>
                    <h3 className="mb-4 text-lg font-semibold dark:text-white">{title}</h3>

                    {course.data?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <Book className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />

                            <p className="text-base font-semibold text-gray-700 dark:text-white">{empty.title}</p>

                            <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-white/70">{empty.desc}</p>

                            {user?.role_id === roles.Student && empty.cta && (
                                <button
                                    onClick={() => router.get(route('list-course'))}
                                    className="mt-4 rounded-lg bg-[#3ABEFF] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#3ABEFF]/90"
                                >
                                    {empty.cta}
                                </button>
                            )}
                        </div>
                    ) : (
                        <InfiniteScroll
                            data={type}
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
                            className="flex max-h-72 flex-col gap-4 overflow-y-scroll"
                        >
                            {course.data?.map((item: any, i: any) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between rounded-xl border p-4 shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20"
                                >
                                    <div>
                                        <span className="font-medium">{item.name}</span>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-white/60">
                                            {type === 'today' ? (
                                                <>
                                                    <Clock size={14} /> {formatDate(item.start_time, item.end_time)}
                                                </>
                                            ) : (
                                                <>
                                                    <Calendar size={14} /> {formatDate(item.start_time, item.end_time)}
                                                </>
                                            )}
                                        </div>

                                        <span className="text-sm text-gray-500 dark:text-white/60">{item.teacher}</span>
                                    </div>
                                    {type === 'today' && item.has_done == true &&
                                        (user?.role_id !== roles.Institute || user?.role_id !== roles.Admin) && (
                                            <button
                                                onClick={() => handleJoinButton(item)}
                                                className="flex items-center gap-2 rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                            >
                                                <PlayCircle size={16} />
                                                Join
                                            </button>
                                        )}
                                </div>
                            ))}
                        </InfiniteScroll>
                    )}
                </CardContent>
            </Card>

            {modalType === 'warning' && (
                <DynamicModal
                    type="warning"
                    isOpen
                    onClose={() => setModalType(null)}
                    description={modalText!}
                />
            )}
        </>
    );
}
