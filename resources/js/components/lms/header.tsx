import NotificationDropdown from '../ui/notification';
import SwitchDarkMode from '../ui/switch-dark-mode';

export default function PageHeader({ title }: { title: string }) {
    return (
        <div className="mx-4 flex h-16 items-center justify-between border-b dark:border-white/20">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            <div className="flex items-center gap-2">
                <SwitchDarkMode />
                <NotificationDropdown />
            </div>
        </div>
    );
}
