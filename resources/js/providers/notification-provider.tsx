import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Notification = {
    id: string;
    data: {
        title: string;
        message?: string;
        url?: string;
    };
    created_at: string;
    read_at: string | null;
};

const NotificationContext = createContext<any>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const user = props.auth?.user;

    const [notifications, setNotifications] = useState<Notification[]>(props.auth?.notifications ?? []);

    useEffect(() => {
        if (!user) return;
        const channel = window.Echo.private(`App.Models.User.${user.id}`);
        channel.notification((notification: any) => {
            toast.info(notification.data.title, {
                description: notification.data.message,
                position: 'top-right',
            });
            setNotifications((prev) => {
                if (prev.some((n) => n.id === notification.id)) return prev;
                return [notification, ...prev];
            });
        });

        return () => {
            window.Echo.leave(`private-App.Models.User.${user.id}`);
        };
    }, [user?.id]);

    const unreadCount = notifications.filter((n) => !n.read_at).length;
    const markAllAsRead = async () => {
        await axios.post(route('mark-as-read'));
        setNotifications((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: new Date().toISOString() })));
    };
    return <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead }}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => useContext(NotificationContext);
