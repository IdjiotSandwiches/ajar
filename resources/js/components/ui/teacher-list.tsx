import { storageUrl } from "@/utils/storage";
import { useEffect, useState } from "react";

export default function TeacherList({ teachers }: any) {
    const safeTeachers = teachers ?? [];
    const [currentTeacherIndex, setCurrentTeacherIndex] = useState(0);

    useEffect(() => {
        if (safeTeachers.length > 1) {
            const interval = setInterval(() => {
                setCurrentTeacherIndex((prev) => (prev + 1) % safeTeachers.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [safeTeachers.length]);

    const teacher = safeTeachers[currentTeacherIndex];
    return (
        <div className="relative h-[56px] overflow-hidden bg-[#F9FCFF] dark:bg-gray-700">
            {safeTeachers.length > 0 ? (
                <div className="absolute inset-0 transition-all duration-700 ease-in-out flex items-center gap-2 px-4 py-2">
                    <img
                        src={storageUrl(teacher?.profile_picture)}
                        alt={teacher?.name || "Teacher"}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-800 dark:text-white leading-tight">
                            {teacher?.name || "Teacher"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-white/70">
                            {teacher?.works?.[0]?.position || "Teacher"}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-left w-full h-full px-4">
                    <p className="text-sm text-gray-500 italic dark:text-white/70">No teacher yet</p>
                </div>
            )}
        </div>
    );
}
