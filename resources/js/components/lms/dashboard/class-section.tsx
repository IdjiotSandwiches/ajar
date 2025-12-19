import { router } from '@inertiajs/react';
import { Calendar, Clock, PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type RoleId = 1 | 2 | 3 | 4;

export default function ClassSection({ title, data, type, role }: any) {
    const resolvedRole: RoleId = [1, 2, 3, 4].includes(Number(role))
        ? (Number(role) as RoleId)
        : 4;

    const isStudent = resolvedRole === 4;

    const emptyMessageMap: Record<RoleId, any> = {
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
                desc: 'You don’t have any teaching schedule today.',
            },
            upcoming: {
                title: 'No upcoming classes',
                desc: 'You don’t have any upcoming teaching schedules.',
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
                desc: 'You don’t have any scheduled classes today. Enroll a course to start learning!',
                cta: 'Enroll Now',
            },
            upcoming: {
                title: 'No upcoming classes',
                desc: 'You don’t have any upcoming classes. Start exploring new courses now!',
                cta: 'Browse Courses',
            },
        },
    };

    const empty = emptyMessageMap[resolvedRole][type];

    return (
        <Card className="rounded-2xl border-none shadow-sm">
            <CardContent>
                <h3 className="mb-4 text-lg font-semibold">{title}</h3>

                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                        <p className="mb-1 font-medium text-gray-700">{empty.title}</p>
                        <p className="mb-4 max-w-xs text-sm">{empty.desc}</p>

                        {isStudent && empty.cta && (
                            <button
                                onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                className="rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                            >
                                {empty.cta}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {data.map((item: any, i: any) => (
                            <div
                                key={i}
                                className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
                            >
                                <div>
                                    <span className="font-medium">{item.title}</span>

                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        {type === 'today' ? (
                                            <>
                                                <Clock size={14} /> {item.time}
                                            </>
                                        ) : (
                                            <>
                                                <Calendar size={14} /> {item.time}
                                            </>
                                        )}
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {item.teacher}
                                    </span>
                                </div>

                                {type === 'today' && item.meetingUrl && (
                                    <a
                                        href={item.meetingUrl}
                                        className="flex items-center gap-2 rounded-lg bg-[#3ABEFF] px-4 py-2 text-sm text-white transition hover:bg-[#3ABEFF]/90"
                                    >
                                        <PlayCircle size={16} />
                                        Join
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
