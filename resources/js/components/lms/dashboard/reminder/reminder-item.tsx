import { router } from "@inertiajs/react";

export default function ReminderItem({ title, url }: any) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm" onClick={() => router.get(url)}>
            <span className="text-sm text-gray-700">{title}</span>
        </div>
    );
}
