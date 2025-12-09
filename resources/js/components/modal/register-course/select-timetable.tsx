import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TimeSelectModal({ isOpen, onPrevious, onNext, onClose, selectedTeacherId }: any) {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const now = new Date();
    const [month, setMonth] = useState<number>(now.getMonth());
    const [year, setYear] = useState<number>(now.getFullYear());

    const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const handleNext = () => {
        if (selectedDate && selectedTime) onNext(selectedTime);
    };

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
        } else setMonth((prev) => prev - 1);
    };

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
        } else setMonth((prev) => prev + 1);
    };

    const reset = () => {
        setSelectedTime('');
        setSelectedDate('');
        onPrevious();
    };

    const { schedules } = usePage<any>().props;

    useEffect(() => {
        if (isOpen) {
            router.reload({
                only: ['schedules'],
                data: { selected_teacher_id: selectedTeacherId },
            });
        }
    }, [isOpen, selectedTeacherId]);


    useEffect(() => {
        if (!schedules) return;

        const today = new Date();
        const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
            today.getDate()
        ).padStart(2, '0')}`;

        if (schedules[todayString]) {
            setSelectedDate(todayString);
            if (schedules[todayString].length === 1) {
                setSelectedTime(schedules[todayString][0].id);
            }
        }
    }, [schedules]); 


    if (!isOpen) return null;

    return (
        <>
            {schedules && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#42C2FF]/40 backdrop-blur-sm">
                    <div className="animate-fadeIn relative w-[90%] max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl">
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>

                        <h2 className="mb-1 text-center text-lg font-semibold text-gray-800">Pick Course Date</h2>
                        <p className="mb-6 text-center text-sm text-gray-500">Select the available course schedule</p>

                        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border">
                            <div className="col-span-2 flex h-[260px] sm:h-[300px] flex-col bg-[#42C2FF]/10 p-3 sm:p-4">
                                <div className="mb-3 flex items-center justify-between text-[#42C2FF]">
                                    <button onClick={prevMonth} className="rounded-full p-1 hover:bg-white">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <div className="text-xs sm:text-sm font-semibold">
                                        {monthName} {year}
                                    </div>
                                    <button onClick={nextMonth} className="rounded-full p-1 hover:bg-white">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>

                                <div className="mb-2 grid grid-cols-7 text-center text-[10px] sm:text-xs text-gray-600">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                                        <p key={d}>{d}</p>
                                    ))}
                                </div>

                                <div className="grid flex-grow grid-cols-7 gap-1 text-center text-[11px] sm:text-sm">
                                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}

                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                        const val = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const isAvailable = !!schedules[val];

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => isAvailable && setSelectedDate(val)}
                                                disabled={!isAvailable}
                                                className={`
                                                    flex items-center justify-center 
                                                    rounded-full 
                                                    transition-all
                                                    disabled:cursor-not-allowed 
                                                    disabled:bg-[#d9e1e6]

                                                    ${selectedDate === val ? 'bg-[#42C2FF] text-white' : 'hover:bg-white'}

                                                    w-6 h-6 sm:w-8 sm:h-8
                                                `}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex h-[260px] sm:h-[300px] flex-col gap-2 overflow-y-auto border-l bg-[#42C2FF]/10 p-3 sm:p-4">
                                {selectedDate &&
                                    schedules[selectedDate]?.map((time: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTime(time.id)}
                                            className={`
                                                rounded-lg px-2 py-1.5 text-left 
                                                text-[10px] sm:text-xs transition-all
                                                ${selectedTime === time.id ? 'bg-[#42C2FF] text-white' : 'hover:bg-white'}
                                            `}
                                        >
                                            {time.time}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 sm:gap-4">
                            <button
                                onClick={reset}
                                className="w-1/2 rounded-xl border border-gray-300 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!selectedDate || !selectedTime}
                                className={`
                                    w-1/2 rounded-xl py-2 sm:py-3 
                                    text-sm sm:text-base font-medium text-white
                                    ${selectedDate && selectedTime ? 'bg-[#42C2FF] hover:bg-[#42C2FF]/90' : 'cursor-not-allowed bg-gray-300'}
                                `}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
