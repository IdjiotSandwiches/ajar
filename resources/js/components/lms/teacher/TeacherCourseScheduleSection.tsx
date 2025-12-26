import { Calendar } from 'lucide-react';

export default function TeacherCourseScheduleSection({ schedules }: any) {
    return (
        <div className="w-full py-4 md:px-4 md:py-2">
            <div className="mb-3 flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                    <Calendar size={16} />
                    Teaching Schedule
                </h4>
            </div>

            {schedules.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-white/70 italic">Tidak ada jadwal mengajar.</p>
            ) : (
                <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
                    {schedules.map((schedule: any, index: number) => {
                        const formatTime = (iso: string) => iso.slice(11, 16);
                        return (
                            <li key={index} className="flex justify-between rounded-md bg-[#F9FCFF] dark:bg-[#31363F] p-2 text-sm">
                                <span className="font-medium text-gray-700 dark:text-white">{schedule.day}</span>
                                <span className="text-gray-600 dark:text-white/90">
                                    {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
