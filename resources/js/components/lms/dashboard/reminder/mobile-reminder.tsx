import { Card, CardContent } from '@/components/ui/card';
import { Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReminderItem from './reminder-item';
import { usePage } from '@inertiajs/react';

export default function MobileReminder({ reminder }: any) {
    const { props } = usePage();
    const status = props.enums?.learning_status_enum;

    type ReminderConfig = {
        title: string;
        url: string;
    };

    const REMINDER_TITLE_MAP: Record<number, ReminderConfig> = {
        1: { title: 'You have new messages.', url: route('chat') },
        2: { title: 'Please review your completed course.', url: route('my-learning', { status: status.Completed }) },
        3: { title: 'Your class is about to start.', url: route('my-learning') },
        4: { title: 'Please complete your course.', url: route('my-learning') },
        5: { title: 'Please add a meeting link for your course.', url: route('my-learning') },
        6: { title: 'There are new teacher applications.', url: route('institute.teacher-application') },
        7: { title: 'A teacher has applied to teach your course.', url: route('institute.course-application') },
        8: { title: 'Some teachers are awaiting verification.', url: route('admin.teacher-applications') },
        9: { title: 'Some courses are awaiting verification.', url: route('admin.course-completion') },
    };

    const [isOpen, setIsOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    const hasReminder = Array.isArray(reminder) && reminder.length > 0;

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        const handleResize = () => {
            setIsDesktop(mediaQuery.matches);
            setIsOpen(mediaQuery.matches);
        };

        handleResize();
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    useEffect(() => {
        if (isDesktop) return;

        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isDesktop]);

    return (
        <Card className="rounded-2xl border-none shadow-sm dark:shadow-[#ffffff]/20">
            <CardContent>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between"
                >
                    <h3 className="text-lg font-semibold">Reminder</h3>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'mt-4 max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col gap-3">
                        {hasReminder ? (
                            <div className="flex flex-col gap-3">
                                {reminder.map((r: any, i: number) => {
                                    const conf = REMINDER_TITLE_MAP[r];
                                    if (!conf) return null;
                                    return (
                                        <ReminderItem
                                            key={i}
                                            title={conf.title}
                                            url={conf.url}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <Bell className="mb-4 h-12 w-12 text-gray-400" />
                                <p className="text-base font-semibold text-gray-700 dark:text-white">
                                    No reminders yet
                                </p>
                                <span className="mt-1 max-w-md text-sm text-gray-500 dark:text-white/70">
                                    You're all caught up
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}
