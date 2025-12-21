import { InputSwitch } from '@/components/ui/input-switch';
import LMSLayout from '@/layouts/lms-layout';
import { Form, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function AddSchedulePage({ sessions, teachings, availability, errors }: any) {
    const { props } = usePage();
    const days = Object.values(props.enums?.days_enum || {});
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    const [popup, setPopup] = useState<{
        visible: boolean;
        day?: string;
        hour?: string;
        id?: any;
    }>({ visible: false });

    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    const closePopup = () => {
        setPopup({ visible: false });
        setSelectedCourse(null);
    };

    const getSessionAt = (day: string, hour: string): any => {
        const h = Number(hour.split(':')[0]);
        return (
            sessions?.find((s: any) => {
                if (s.day !== day) return false;

                const start = Number(s.start_time.split(':')[0]);
                const end = Number(s.end_time.split(':')[0]);

                return h >= start && h < end;
            }) ?? null
        );
    };

    const applyCourse = (isDelete: boolean = false) => {
        if (!popup.day || !popup.hour || !selectedCourse) return;

        router.post(
            route('teacher.manage-weekly-course', { delete: isDelete }),
            {
                day: popup.day,
                start_time: popup.hour,
                teaching_course_id: selectedCourse.id,
            },
            {
                onSuccess: () => closePopup(),
            },
        );
    };

    const renderCell = (day: string, hour: string) => {
        const session = getSessionAt(day, hour);
        return (
            <div
                onClick={() => setPopup({ visible: true, day, hour, id: session?.teaching_course_id })}
                className={`cursor-pointer rounded border px-2 py-1 text-xs ${
                    session ? 'border-blue-400 bg-blue-200' : 'border-dashed border-gray-400'
                }`}
            >
                {session?.course_name ?? '+'}
            </div>
        );
    };

    useEffect(() => {
        if (popup.visible) {
            const course = teachings.find((t: any) => t.id === popup.id) || null;
            setSelectedCourse(course);
        }
    }, [popup.visible, popup.id, teachings]);

    return (
        <div className="flex min-h-screen flex-col gap-6">
            {/* Ini buat nyimpen nanti teacher ny bisa kapan buat ngajar kek jadwal kerja dia gitu lah */}
            <Form method="post" action={route('teacher.manage-availability')}>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="border-b bg-[#3ABEFF]/10">
                            <tr>
                                <th className="w-52 p-2 text-center">Day</th>
                                <th className="p-3 text-left">Start Time</th>
                                <th className="p-3 text-left">End Time</th>
                                <th className="w-32 p-3 text-center">Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day, index) => (
                                <tr key={day} className={`border-b hover:bg-[#42C2FF]/10 ${index % 2 === 0 ? 'bg-[#f9fcff]' : 'bg-white'}`}>
                                    <td className="p-2 text-center">
                                        {day}
                                        <input type="hidden" name={`availability[${index}].day`} value={day} />
                                    </td>
                                    <td className="p-2 text-left">
                                        <input
                                            type="time"
                                            defaultValue={availability[index]?.start_time ?? ''}
                                            name={`availability[${index}].start_time`}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-[#3ABEFF] focus:ring-2 focus:ring-[#3ABEFF]/30 focus:outline-none"
                                        />
                                        {errors[`availability.${index}.start_time`] && (
                                            <p className="text-red-500">{errors[`availability.${index}.start_time`]}</p>
                                        )}
                                    </td>
                                    <td className="p-2 text-left">
                                        <input
                                            type="time"
                                            defaultValue={availability[index]?.end_time ?? ''}
                                            name={`availability[${index}].end_time`}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-[#3ABEFF] focus:ring-2 focus:ring-[#3ABEFF]/30 focus:outline-none"
                                        />
                                        {errors[`availability.${index}.end_time`] && (
                                            <p className="text-red-500">{errors[`availability.${index}.end_time`]}</p>
                                        )}
                                    </td>
                                    <td className="p-2 text-center">
                                        <InputSwitch name={`availability[${index}].available`} checked={!!(availability[index]?.active ?? true)} />
                                        {errors[`availability.${index}.available`] && (
                                            <p className="text-red-500">{errors[`availability.${index}.available`]}</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-2 flex justify-end">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-lg bg-[#3ABEFF] px-4 py-2.5 font-semibold text-white transition hover:bg-[#3ABEFF]/90"
                    >
                        Submit
                    </button>
                </div>
            </Form>
            <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full text-center text-sm">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="w-32">Hour</th>
                            {days.map((day) => (
                                <th key={day} className="w-32">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map((hour) => (
                            <tr key={hour}>
                                <td className="font-medium">{hour}</td>
                                {days.map((day) => (
                                    <td key={day} className="p-1">
                                        {renderCell(day, hour)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-start gap-2">
                <button
                    type="button"
                    onClick={handleBack}
                    className="cursor-pointer rounded-lg bg-black/80 px-6 py-2 font-semibold text-white transition-all hover:bg-black/70"
                >
                    Back
                </button>
            </div>

            {popup.visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-80 rounded-xl bg-white p-6">
                        <h2 className="mb-4 text-lg font-semibold">Add / Edit Session</h2>

                        <select
                            className="mb-4 w-full rounded border p-2"
                            value={selectedCourse?.id || popup.id || ''}
                            onChange={(e) => setSelectedCourse(teachings.find((t: any) => t.id === Number(e.target.value)))}
                        >
                            <option value="">Select course</option>
                            {teachings.map((t: any) => (
                                <option key={t.id} value={t.id}>
                                    {t.course.name} ({t.course.duration}m)
                                </option>
                            ))}
                        </select>

                        <button onClick={() => applyCourse()} className="w-full cursor-pointer rounded bg-blue-500 py-2 text-white">
                            Save
                        </button>

                        {popup.id && (
                            <button onClick={() => applyCourse(true)} className="mt-3 w-full cursor-pointer rounded bg-red-500 py-2 text-white">
                                Remove
                            </button>
                        )}

                        <button onClick={closePopup} className="mt-3 w-full cursor-pointer rounded bg-gray-600 py-2 text-white">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

AddSchedulePage.layout = (page: React.ReactNode) => <LMSLayout title="Schedule Management">{page}</LMSLayout>;
