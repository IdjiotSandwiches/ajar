import { router } from "@inertiajs/react";

export default function ReminderItem({ title, url }: any) {
    return (
        <div className="flex items-center justify-between rounded-xl p-3 border dark:border-white/20 shadow-sm dark:shadow-[#ffffff]/20 cursor-pointer" onClick={() => router.get(url)}>
            <span className="text-sm text-gray-700 dark:text-white/90">{title}</span>
        </div>
    );
}
