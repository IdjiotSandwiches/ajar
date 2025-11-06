import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface TimeSelectModalProps {
  isOpen: boolean;
  onPrevious: () => void;
  onNext: (selected: { date: string; time: string }) => void;
  onClose: () => void;
}

const times = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export default function TimeSelectModal({
  isOpen,
  onPrevious,
  onNext,
  onClose,
}: TimeSelectModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const now = new Date();
  const [month, setMonth] = useState<number>(now.getMonth());
  const [year, setYear] = useState<number>(now.getFullYear());

  if (!isOpen) return null;

  const monthName = new Date(year, month).toLocaleString("en-US", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handleNext = () => {
    if (selectedDate && selectedTime) onNext({ date: selectedDate, time: selectedTime });
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3ABEFF]/40 backdrop-blur-sm z-50 transition-opacity duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">Pick Course Date</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Select the available course schedule
        </p>

        <div className="grid grid-cols-3 border rounded-2xl overflow-hidden">
          <div className="col-span-2 bg-[#3ABEFF]/10 p-4 flex flex-col h-[300px]">
            <div className="flex justify-between items-center text-[#3ABEFF] mb-3">
              <button onClick={prevMonth} className="hover:bg-white rounded-full p-1">
                <ChevronLeft size={18} />
              </button>
              <div className="font-semibold text-sm">{monthName} {year}</div>
              <button onClick={nextMonth} className="hover:bg-white rounded-full p-1">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-gray-600 text-xs mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center flex-grow text-sm">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const val = `${year}-${month + 1}-${day}`;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(val)}
                    className={`py-1 rounded-full transition-all ${
                      selectedDate === val
                        ? "bg-[#3ABEFF] text-white"
                        : "hover:bg-white"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#3ABEFF]/10 p-4 flex flex-col gap-2 overflow-y-auto h-[300px] border-l">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-1.5 px-2 text-xs rounded-lg text-left transition-all ${
                  selectedTime === time
                    ? "bg-[#3ABEFF] text-white"
                    : "hover:bg-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onPrevious}
            className="w-1/2 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedDate || !selectedTime}
            className={`w-1/2 py-3 rounded-xl text-white font-medium ${
              selectedDate && selectedTime
                ? "bg-[#3ABEFF] hover:bg-[#32A7D8]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
