import { useNotifications } from "@/hooks/use-notification";
import NotificationDropdown from "../ui/notification";
import SwitchDarkMode from "../ui/switch-dark-mode";

export default function PageHeader({ title }: { title: string }) {

    const { notifications, unreadCount, markAllAsRead } = useNotifications();

    return (
        <div className="flex h-16 items-center border-b dark:border-white/20 mx-4 justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
            </h1>
            <div className="flex gap-2 items-center">
                <SwitchDarkMode />
                <NotificationDropdown
                    notifications={notifications}
                    unreadCount={unreadCount}
                    onOpen={markAllAsRead}
                />
            </div>
        </div>
    );
}