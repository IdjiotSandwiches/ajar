import { Calendar } from "lucide-react";

export default function TeacherCourseScheduleSection({
    schedules,
}: {
    schedules: any[];
    onAddSchedule: () => void;
}) {
    return (
        <div className="md:px-4 py-4 md:py-2 w-full">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar size={16} />
                    Teaching Schedule
                </h4>
            </div>

            {schedules.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                    Tidak ada jadwal mengajar.
                </p>
            ) : (
                <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
                    {schedules.map((schedule) => (
                        <li
                            key={schedule.id}
                            className="flex justify-between text-sm bg-[#F9FCFF] p-2 rounded-md"
                        >
                            <span className="font-medium text-gray-700">
                                {schedule.day}
                            </span>
                            <span className="text-gray-600">
                                {schedule.start_time} - {schedule.end_time}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
