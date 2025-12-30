import { Bell } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// import { Notification } from '@/hooks/useNotifications';

type Notification = {
    id: number;
    title: string;
    message: string;
    read_at: string | null;
    created_at: string;
};

function formatTime(date: string) {
    return new Date(date).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

interface Props {
    notifications: Notification[];
    unreadCount: number;
    onOpen: () => void;
}

export default function NotificationDropdown({
    notifications,
    unreadCount,
    onOpen,
}: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        setOpen(!open);
        if (!open) onOpen();
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={handleToggle}
                className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/20"
            >
                <Bell className="h-5 w-5 text-[#3ABEFF]" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-80 rounded-xl border dark:border-white/20 bg-white dark:bg-[#242124] shadow-md">
                    <div className="px-4 py-2 border-b dark:border-white/20 font-semibold text-sm dark:text-white">
                        Notifications
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                <Bell className="mb-2 h-8 w-8 text-gray-400" />
                                <p className="text-sm font-medium text-gray-600 dark:text-white/70">
                                    Tidak ada notifikasi
                                </p>
                                <p className="text-xs text-gray-400">
                                    Semua notifikasi akan muncul di sini
                                </p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    className={`px-4 py-3 text-sm border-b dark:border-white/20 last:border-b-0 hover:bg-gray-100 dark:hover:bg-white/10 ${
                                        !notif.read_at
                                            ? 'bg-blue-50 dark:bg-white/5'
                                            : ''
                                    }`}
                                >
                                    <div className="flex justify-between">
                                        <p className="font-medium dark:text-white">
                                            {notif.title}
                                        </p>
                                        <span className="text-[10px] text-gray-400">
                                            {formatTime(notif.created_at)}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-white/70">
                                        {notif.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
