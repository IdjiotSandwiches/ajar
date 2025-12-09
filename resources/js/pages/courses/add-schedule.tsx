import { dummyCourses } from "@/dummy-data/dummy-course";
import AppLayout from "@/layouts/app-layout";
import { Plus } from "lucide-react";
import React, { useState } from "react";

interface ScheduleSlot {
    day: string;
    hour: string;
    bookedBy?: number | null;
}

export default function AddSchedulePage() {
    const currentTeacher = { id: 1, name: "Dodi", avatar: "/images/teacher-dodi.png" };
    const course = dummyCourses[0];

    const hours = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    ];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);

    const handleSlotClick = (day: string, hour: string) => {
        const index = schedule.findIndex((s) => s.day === day && s.hour === hour);
        const updated = [...schedule];

        if (index === -1) {
            updated.push({ day, hour, bookedBy: currentTeacher.id });
        } else {
            if (schedule[index].bookedBy === currentTeacher.id) {
                updated.splice(index, 1);
            } else {
                updated[index].bookedBy = currentTeacher.id;
            }
        }
        setSchedule(updated);
    };

    const renderCell = (day: string, hour: string) => {
        const slot = schedule.find((s) => s.day === day && s.hour === hour);
        if (!slot) {
            return (
                <button
                    onClick={() => handleSlotClick(day, hour)}
                    className="p-1 md:p-2 bg-transparent border-2 border-[#42C2FF] rounded-md hover:bg-[#42C2FF]/20"
                >
                    <Plus size={14} className="md:size-4" color="#42C2FF" />
                </button>
            );
        }
        const isCurrentTeacher = slot.bookedBy === currentTeacher.id;
        const avatar = isCurrentTeacher ? currentTeacher.avatar : "/images/unknown.png";
        return (
            <button
                onClick={() => handleSlotClick(day, hour)}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-[#42C2FF]"
            >
                <img src={`/${avatar}`} alt="teacher" className="w-full h-full object-cover" />
            </button>
        );
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-5 sm:p-8 rounded-2xl shadow mb-10">
                    <div className="space-y-4">
                        <h1 className="text-xl md:text-2xl font-semibold text-[#42C2FF] text-center mb-4 sm:mb-6">
                            Add Schedule
                        </h1>

                        <div>
                            <h2 className="font-semibold text-base sm:text-lg">Title</h2>
                            <p className="text-sm sm:text-base">{course.name}</p>
                        </div>

                        <div>
                            <h2 className="font-semibold text-base sm:text-lg">Description</h2>
                            <p className="text-sm sm:text-base">{course.description}</p>
                        </div>

                        <div>
                            <h2 className="font-semibold text-base sm:text-lg">Learning Objectives</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                                {course.learning_objectives?.map((obj, i) => (
                                    <li key={i}>{obj.description}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-base sm:text-lg">Course Overviews</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                                {course.course_overviews?.map((co, i) => (
                                    <li key={i}>{co.description}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-base sm:text-lg">Course Skills</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                                {course.course_skills?.map((pl, i) => (
                                    <li key={i}>{pl.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-base sm:text-lg">Duration</h2>
                            <p className="text-sm sm:text-base">{course.duration} Minutes</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="col-span-1 bg-white p-5 sm:p-6 rounded-2xl shadow">
                        <h2 className="font-semibold text-lg mb-4 text-left text-[#42C2FF]">Teachers</h2>
                        <div className="space-y-4">
                            {course.teacher?.map((t: any) => (
                                <div
                                    key={t.name}
                                    className="flex items-center gap-3 border border-[#42C2FF]/30 p-3 rounded-xl"
                                >
                                    <img
                                        src={`/${t.image || "/images/default-avatar.png"}`}
                                        alt={t.name}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                                    />
                                    <span className="font-medium text-sm sm:text-base">{t.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow">
                        <h2 className="font-semibold text-lg mb-4 text-[#42C2FF]">Schedule</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-center text-xs sm:text-sm border border-[#42C2FF]">
                                <thead className="bg-[#42C2FF] text-white">
                                    <tr>
                                        <th className="py-2 px-2 sm:px-3 border border-[#42C2FF]">Hours</th>
                                        {days.map((day) => (
                                            <th key={day} className="py-2 px-2 sm:px-3 border border-[#42C2FF]">{day}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {hours.map((hour, i) => (
                                        <tr key={hour} className={i % 2 === 0 ? "bg-black/5" : "bg-white"}>
                                            <td className="border border-[#42C2FF] py-2 px-2 sm:px-3 font-medium">
                                                {hour}
                                            </td>
                                            {days.map((day) => (
                                                <td key={day} className="border border-[#42C2FF] py-2 text-center">
                                                    {renderCell(day, hour)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <button className="mt-10 w-full bg-[#42C2FF] text-white py-3 rounded-md font-semibold hover:bg-[#42C2FF]/90">
                    Submit
                </button>
            </div>
        </div>
    );
}

AddSchedulePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
