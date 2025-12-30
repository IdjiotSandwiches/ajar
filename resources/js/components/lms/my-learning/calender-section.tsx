import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function CalendarSection({ courses, date }: any) {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());

    const todayString = `${year}-${month + 1}-${now.getDate()}`;
    const [selectedDate, setSelectedDate] = useState(date || `${year}-${month + 1}-${now.getDate()}`);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const monthName = new Date(year, month).toLocaleString('en-US', {
        month: 'long',
    });

    const formatDate = (y: any, m: any, d: any) => {
        return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };

    const handleSelectedDate = (date: any) => {
        setSelectedDate(date);
        router.reload({
            data: { date: date },
            preserveUrl: false,
        });
    };

    const statusStyle: Record<string, string> = {
        completed: 'border-green-600',
        scheduled: 'border-[#3ABEFF]',
        cancelled: 'border-red-600',
    };

    return (
        <div className="h-fit w-full rounded-xl border p-6 shadow-sm dark:border-white/20 dark:shadow-[#ffffff]/20">
            <h3 className="mb-1 font-semibold text-gray-700 dark:text-white">My Learning Schedule</h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-white/50">
                {courses.length} class
                {courses.length > 1 ? 'es' : ''} on{' '}
                {selectedDate === todayString
                    ? 'today'
                    : new Date(selectedDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                      })}
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-1">
                <div>
                    <div className="mb-3 flex items-center justify-between text-[#3ABEFF]">
                        <button
                            onClick={() => {
                                if (month === 0) {
                                    setMonth(11);
                                    setYear(year - 1);
                                } else setMonth(month - 1);
                            }}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="text-sm font-semibold">
                            {monthName} {year}
                        </div>

                        <button
                            onClick={() => {
                                if (month === 11) {
                                    setMonth(0);
                                    setYear(year + 1);
                                } else {
                                    setMonth(month + 1);
                                }
                            }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="mb-1 grid grid-cols-7 text-center text-xs font-semibold text-gray-600">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                            <div key={`e-${i}`} />
                        ))}

                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                            const val = formatDate(year, month, day);
                            const isSelected = selectedDate === val;
                            return (
                                <button
                                    key={day}
                                    onClick={() => handleSelectedDate(val)}
                                    className={`mx-auto h-8 w-8 rounded-full py-1 transition-all ${
                                        isSelected ? 'bg-[#3ABEFF] text-white' : 'hover:bg-gray-50 dark:hover:bg-white/20'
                                    }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="max-h-60 overflow-auto border-t pt-2 md:border-t-0 md:border-l md:pt-0 md:pl-4 2xl:border-t 2xl:border-l-0 2xl:pt-2 2xl:pl-0 dark:border-white/20">
                    {courses.length > 0 ? (
                        courses.map((course: any, index: number) => (
                            <div key={index} className={`mb-2 border-l-2 ${statusStyle[course.status]} px-3 text-sm text-gray-600`}>
                                <p className="font-medium text-gray-800 dark:text-white">{course.name}</p>
                                <p className="dark:text-white/50">Duration: {course.duration} Minutes</p>
                                <p className="dark:text-white/50">Time: {course.time}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 italic dark:text-white/50">No schedule on this date</p>
                    )}
                </div>
            </div>
        </div>
    );
}
