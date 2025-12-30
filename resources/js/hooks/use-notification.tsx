// hooks/useNotifications.ts
import { useState } from 'react';

export type Notification = {
    id: number;
    title: string;
    message: string;
    read_at: string | null;
    created_at: string;
};

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: 'Pembayaran Berhasil',
            message: 'Kursus React berhasil dibeli',
            read_at: null,
            created_at: '2024-01-10T10:15:00',
        },
        {
            id: 2,
            title: 'Jadwal Baru',
            message: 'Guru menambahkan jadwal baru',
            read_at: null,
            created_at: '2024-01-09T08:30:00',
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read_at).length;

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n =>
                n.read_at ? n : { ...n, read_at: new Date().toISOString() }
            )
        );
    };

    return {
        notifications,
        unreadCount,
        markAllAsRead,
    };
}
