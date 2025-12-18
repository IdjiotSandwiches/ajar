import { Calendar } from 'lucide-react';

export default function TeacherCourseScheduleSection({ schedules }: { schedules: any[]; onAddSchedule: () => void }) {
    return (
        <div className="w-full py-4 md:px-4 md:py-2">
            <div className="mb-3 flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-semibold text-gray-800">
                    <Calendar size={16} />
                    Teaching Schedule
                </h4>
            </div>

            {schedules.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Tidak ada jadwal mengajar.</p>
            ) : (
                <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
                    {schedules.map((schedule) => (
                        <li key={schedule.id} className="flex justify-between rounded-md bg-[#F9FCFF] p-2 text-sm">
                            <span className="font-medium text-gray-700">{schedule.day}</span>
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
