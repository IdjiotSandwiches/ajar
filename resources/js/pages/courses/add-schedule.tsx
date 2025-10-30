import { getCategoryNameById } from "@/dummy-data/dummy-category";
import { dummyCourse } from "@/dummy-data/dummy-course";
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
    const course = dummyCourse;

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
                    className="p-2 bg-transparent border-2 border-[#3ABEFF] rounded-md hover:bg-[#3ABEFF]/20"
                >
                    <Plus size={16} color="#3ABEFF" strokeWidth={2} />
                </button>
            );
        }
        const isCurrentTeacher = slot.bookedBy === currentTeacher.id;
        const avatar = isCurrentTeacher ? currentTeacher.avatar : "/images/unknown.png";
        return (
            <button
                onClick={() => handleSlotClick(day, hour)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#3ABEFF]"
            >
                <img src={avatar} alt="teacher" className="w-full h-full object-cover" />
            </button>
        );
    };

    return (
        <div>
            {/* <BackButton className="m-4" label="Back" /> */}
            <div className="max-w-7xl mx-auto py-12 px-8">


                {/* === Info Course === */}
                <div className="bg-white p-8 rounded-2xl shadow mb-10">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-semibold text-[#3ABEFF] text-center mb-6">
                            Add Schedule
                        </h1>
                        <div>
                            <h2 className="font-semibold text-lg">Title</h2>
                            <p>{course.title}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Description</h2>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Category</h2>
                            <div className="flex gap-3 mt-2">
                                {course.category?.map((catId) => (
                                    <div
                                        key={catId}
                                        className="bg-[#E7F6FF] text-[#3ABEFF] px-3 py-1 rounded-md text-sm font-medium"
                                    >
                                        {getCategoryNameById(catId)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">Learning Objectives</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                                {course.learning_objectives.map((obj, i) => (
                                    <li key={i}>{obj.learning_objective}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">Course Overviews</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                                {course.course_overviews.map((co, i) => (
                                    <li key={i}>{co.course_overview}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">Programming Language</h2>
                            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                                {course.programming_language.map((pl, i) => (
                                    <li key={i}>{pl.programming_language}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">Duration</h2>
                            <p>{course.duration} Minutes</p>
                        </div>


                    </div>
                </div>

                {/* === Layout: Teacher List + Schedule Table === */}
                <div className="grid grid-cols-4 gap-8">
                    {/* LEFT: Teacher List */}
                    <div className="col-span-1 bg-white p-6 rounded-2xl shadow">
                        <h2 className="font-semibold text-lg mb-4 text-left text-[#3ABEFF]">Teachers</h2>
                        <div className="space-y-4">
                            {course.teacher?.map((t: import("@/interfaces/shared").TeacherRegisterProps) => (
                                <div
                                    key={t.name}
                                    className="flex items-center gap-3 border border-[#3ABEFF]/30 p-3 rounded-xl"
                                >
                                    <img
                                        src={typeof t.image === "string" ? t.image : "/images/default-avatar.png"}
                                        alt={t.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="font-medium">{t.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Schedule Table */}
                    <div className="col-span-3 bg-white p-6 rounded-2xl shadow">
                        <h2 className="font-semibold text-lg mb-4 text-[#3ABEFF]">Schedule</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-center text-sm border border-[#3ABEFF]">
                                <thead className="bg-[#3ABEFF] text-white">
                                    <tr>
                                        <th className="py-2 px-3 border border-[#3ABEFF]">Hours</th>
                                        {days.map((day) => (
                                            <th key={day} className="py-2 px-3 border border-[#3ABEFF]">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {hours.map((hour, i) => (
                                        <tr key={hour} className={i % 2 === 0 ? "bg-black/5" : "bg-white"}>
                                            <td className="border border-[#3ABEFF] py-2 px-3 font-semibold text-gray-700">
                                                {hour}
                                            </td>
                                            {days.map((day) => (
                                                <td key={day} className="border border-[#3ABEFF] py-2 px-3 text-center">
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

                <button className="mt-10 w-full bg-[#3ABEFF] text-white py-3 rounded-md font-semibold hover:bg-[#3ABEFF]/90">
                    Submit
                </button>
            </div>
        </div>
    );
}


AddSchedulePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;