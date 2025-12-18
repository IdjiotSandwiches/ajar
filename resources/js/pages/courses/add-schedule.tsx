import { availableCourses } from '@/dummy-data/dummy-courses';
import LMSLayout from '@/layouts/lms-layout';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

interface ScheduleSlot {
    day: string;
    hour: string;
    bookedBy?: number | null;
}

export default function AddSchedulePage() {
    const currentTeacher = { id: 1, name: 'Dodi', avatar: '/images/teacher-dodi.png' };
    const course = availableCourses[0];

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    const hours = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
                    className="rounded-md border-2 border-[#42C2FF] bg-transparent p-1 hover:bg-[#42C2FF]/20 md:p-2"
                >
                    <Plus size={14} className="md:size-4" color="#42C2FF" />
                </button>
            );
        }
        const isCurrentTeacher = slot.bookedBy === currentTeacher.id;
        const avatar = isCurrentTeacher ? currentTeacher.avatar : '/images/unknown.png';
        return (
            <button
                onClick={() => handleSlotClick(day, hour)}
                className="h-6 w-6 overflow-hidden rounded-full border-2 border-[#42C2FF] md:h-8 md:w-8"
            >
                <img src={`/${avatar}`} alt="teacher" className="h-full w-full object-cover" />
            </button>
        );
    };

    return (
        <div className="flex min-h-screen flex-col gap-6">
            <h1 className="hidden text-2xl font-semibold text-gray-800 md:flex">Add Schedule Course</h1>
            <div className="rounded-2xl bg-white p-4 shadow sm:p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-base font-semibold sm:text-lg">Title</h2>
                        <p className="text-sm sm:text-base">{course.name}</p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold sm:text-lg">Description</h2>
                        <p className="text-sm sm:text-base">{course.description}</p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold sm:text-lg">Learning Objectives</h2>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 sm:text-base">
                            {course.learning_objectives?.map((obj, i) => <li key={i}>{obj.description}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold sm:text-lg">Course Overviews</h2>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 sm:text-base">
                            {course.course_overviews?.map((co, i) => <li key={i}>{co.description}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold sm:text-lg">Course Skills</h2>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 sm:text-base">
                            {course.course_skills?.map((pl, i) => <li key={i}>{pl.name}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold sm:text-lg">Duration</h2>
                        <p className="text-sm sm:text-base">{course.duration} Minutes</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
                <div className="col-span-1 rounded-2xl bg-white p-4 shadow sm:p-6">
                    <h2 className="mb-4 text-left text-lg font-semibold text-black">Teachers</h2>
                    <div className="space-y-4">
                        {course.teacher?.map((t: any) => (
                            <div key={t.name} className="flex items-center gap-3 rounded-xl border border-[#42C2FF]/30 p-3">
                                <img
                                    src={`/${t.image || '/images/default-avatar.png'}`}
                                    alt={t.name}
                                    className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
                                />
                                <span className="text-sm font-medium sm:text-base">{t.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-1 rounded-2xl bg-white p-4 shadow sm:p-6 lg:col-span-3">
                    <h2 className="mb-4 text-lg font-semibold text-black">Schedule</h2>

                    <div className="overflow-x-auto rounded-2xl border border-[#42C2FF]">
                        <table className="min-w-full text-center text-xs sm:text-sm">
                            <thead className="bg-[#42C2FF] text-white">
                                <tr>
                                    <th className="border border-[#42C2FF] px-2 py-2 sm:px-3">Hours</th>
                                    {days.map((day) => (
                                        <th key={day} className="border border-[#42C2FF] px-2 py-2 sm:px-3">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {hours.map((hour, i) => (
                                    <tr key={hour} className={i % 2 === 0 ? 'bg-black/5' : 'bg-white'}>
                                        <td className="border border-[#42C2FF] px-2 py-2 font-medium sm:px-3">{hour}</td>
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

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-lg bg-black/80 px-6 py-2 font-semibold text-white transition-all hover:bg-black/70"
                >
                    Back
                </button>
                <button type="submit" className="rounded-lg bg-[#42C2FF] px-6 py-2 font-semibold text-white transition-all hover:bg-[#42C2FF]/90">
                    Submit
                </button>
            </div>
        </div>
    );
}

AddSchedulePage.layout = (page: React.ReactNode) => <LMSLayout title="Add Schedule">{page}</LMSLayout>;
