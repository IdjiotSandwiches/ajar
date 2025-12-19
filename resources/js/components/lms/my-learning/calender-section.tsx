import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarSectionProps {
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  todayString: string;
  courses: any[];
}

export default function CalendarSection({
  month,
  year,
  setMonth,
  setYear,
  selectedDate,
  setSelectedDate,
  todayString,
  courses,
}: CalendarSectionProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  const filteredCourses = courses.filter((item) => item.date === selectedDate);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit w-full">
      <h3 className="font-semibold text-gray-700 mb-1">My Learning Schedule</h3>
      <p className="text-sm text-gray-500 mb-4">
        {filteredCourses.length} class
        {filteredCourses.length > 1 ? "es" : ""} on{" "}
        {selectedDate === todayString
          ? "today"
          : new Date(selectedDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 gap-5">
        <div>
          <div className="flex justify-between items-center text-[#3ABEFF] mb-3">
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

            <div className="font-semibold text-sm">
              {monthName} {year}
            </div>

            <button
              onClick={() => {
                if (month === 11) {
                  setMonth(0);
                  setYear(year + 1);
                } else setMonth(month + 1);
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const val = `${year}-${month + 1}-${day}`;
              const isSelected = selectedDate === val;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(val)}
                  className={`py-1 rounded-full w-8 h-8 mx-auto transition-all ${
                    isSelected ? "bg-[#3ABEFF] text-white" : "hover:bg-gray-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t md:border-t-0 md:border-l md:pl-4 pt-2 md:pt-0 2xl:border-t 2xl:border-l-0 2xl:pl-0 2xl:pt-2">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
              <div
                key={item.id}
                className="border-l-2 border-[#3ABEFF] text-sm text-gray-600 px-3 mb-2"
              >
                <p className="font-medium text-gray-800">{item.title}</p>
                <p>Duration: {item.duration}</p>
                <p>Time: {item.time}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">
              No schedule on this date
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
