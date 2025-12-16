import { Card, CardContent } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MobileReminder({ reminder }: any) {
    type ReminderConfig = {
        title: string;
        url: string;
    };

    const REMINDER_TITLE_MAP: Record<number, ReminderConfig> = {
        1: {
            title: 'You have new messages.',
            url: route('chat'),
        },
        2: {
            title: 'Please review your completed course.',
            url: route('my-learning'),
        },
        3: {
            title: 'Your class is about to start.',
            url: route('my-learning'),
        },
        4: {
            title: 'Please complete your course.',
            url: route('my-learning'),
        },
        5: {
            title: 'Please add a meeting link for your course.',
            url: route('my-learning'),
        },
        6: {
            title: 'There are new teacher applications.',
            url: route('institute.teacher-application'),
        },
        7: {
            title: 'A teacher has applied to teach your course.',
            url: '',
        },
    };

    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="">
                <button onClick={() => setIsOpen((prev) => !prev)} className="flex w-full items-center justify-between">
                    <h3 className="text-lg font-semibold">Reminder</h3>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'mt-4 max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col gap-3">
                        {reminder?.map((r: any, i: number) => {
                            const conf = REMINDER_TITLE_MAP[r];
                            if (!conf) return null;
                            return <ReminderItem key={i} title={conf.title} url={conf.url} />;
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ReminderItem({ title, url }: any) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm" onClick={() => router.get(url)}>
            <span className="text-sm text-gray-700">{title}</span>
        </div>
    );
}
