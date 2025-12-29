import { usePage } from '@inertiajs/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Notification = {
    id: string;
    title: string;
    message?: string;
    url?: string;
    created_at: string;
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
            toast.info(notification.title, {
                description: notification.message,
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

    return <NotificationContext.Provider value={{ notifications }}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => useContext(NotificationContext);
