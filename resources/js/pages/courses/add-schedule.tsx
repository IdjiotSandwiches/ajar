import { InputSwitch } from '@/components/ui/input-switch';
import LMSLayout from '@/layouts/lms-layout';
import { Form, router, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function AddSchedulePage({ sessions, teachings, availability, errors }: any) {
    const { props } = usePage();
    const days = Object.values(props.enums?.days_enum || {});
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    const [popup, setPopup] = useState<{ visible: boolean; day?: string; hour?: string; id?: any }>({
        visible: false,
    });

    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        }
        else {
            router.visit('/');
        }
    };

    const closePopup = () => {
        setPopup({ visible: false });
        setSelectedCourse(null);
    };

    const getSessionAt = (day: string, hour: string) => {
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

    const applyCourse = (isDelete = false) => {
        if (!popup.day || !popup.hour || !selectedCourse) return;

        router.post(
            route('teacher.manage-weekly-course', { delete: isDelete }),
            {
                day: popup.day,
                start_time: popup.hour,
                teaching_course_id: selectedCourse.id,
            },
            { onSuccess: closePopup },
        );
    };

    const renderCell = (day: string, hour: string) => {
        const session = getSessionAt(day, hour);

        return (
            <div
                onClick={() =>
                    setPopup({
                        visible: true,
                        day,
                        hour,
                        id: session?.teaching_course_id,
                    })
                }
                className={`cursor-pointer rounded border px-2 py-1 text-xs text-center transition
                    ${session
                        ? 'border-blue-400 bg-blue-200 text-blue-900'
                        : 'border-dashed border-gray-400 dark:border-white/40'
                    }
                `}
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
            <div className="flex items-start gap-2 rounded-lg bg-[#3ABEFF]/10 p-3 text-sm">
                <Info size={18} />
                <p>Note: Any changes you make will only affect schedules starting next week.</p>
            </div>

            <Form
                method="post"
                action={route('teacher.manage-availability')}
                className="rounded-2xl border dark:border-white/20 p-6 shadow-sm dark:shadow-white/20"
            >
                <h3 className="mb-4 text-lg font-semibold dark:text-white">
                    Offline Status
                </h3>

                <div className="space-y-4 md:hidden">
                    {days.map((day, index) => (
                        <div
                            key={day}
                            className="rounded-xl border dark:border-white/20 bg-white dark:bg-[#222831] p-4 shadow-sm"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h4 className="text-base font-semibold dark:text-white">
                                    {day}
                                </h4>

                                <InputSwitch
                                    name={`availability[${index}].available`}
                                    checked={!!(availability[index]?.active ?? true)}
                                />
                            </div>

                            <input
                                type="hidden"
                                name={`availability[${index}].day`}
                                value={day}
                            />

                            <div className="mb-3">
                                <label className="mb-1 block text-sm text-gray-600 dark:text-white/70">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    name={`availability[${index}].start_time`}
                                    defaultValue={availability[index]?.start_time ?? ''}
                                    className="w-full rounded-lg border dark:border-white/20 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                                />

                                {errors[`availability.${index}.start_time`] && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors[`availability.${index}.start_time`]}
                                    </p>
                                )}

                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-gray-600 dark:text-white/70">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    name={`availability[${index}].end_time`}
                                    defaultValue={availability[index]?.end_time ?? ''}
                                    className="w-full rounded-lg border dark:border-white/20 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                                />

                                {errors[`availability.${index}.end_time`] && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors[`availability.${index}.end_time`]}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block overflow-x-auto rounded-lg border dark:border-white/20">
                    <table className="w-full text-sm">
                        <thead className="bg-[#3ABEFF]/10 border-b dark:border-white/20">
                            <tr>
                                <th className="p-2 text-left">Day</th>
                                <th className="p-2 text-left">Start</th>
                                <th className="p-2 text-left">End</th>
                                <th className="p-2 text-center">Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((day, index) => (
                                <tr
                                    key={day}
                                    className={`border-b dark:border-white/20 ${index % 2 === 0
                                        ? 'bg-[#F9FCFF] dark:bg-[#31363F]'
                                        : 'bg-white dark:bg-[#222831]'
                                        }`}
                                >
                                    <td className="p-2">
                                        {day}
                                        <input
                                            type="hidden"
                                            name={`availability[${index}].day`}
                                            value={day}
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            type="time"
                                            name={`availability[${index}].start_time`}
                                            defaultValue={availability[index]?.start_time ?? ''}
                                            className="w-full rounded-lg border dark:border-white/20 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                                        />

                                        {errors[`availability.${index}.start_time`] && (
                                            <p className="text-red-500">{errors[`availability.${index}.start_time`]}</p>
                                        )}
                                    </td>

                                    <td className="p-2">
                                        <input
                                            type="time"
                                            name={`availability[${index}].end_time`}
                                            defaultValue={availability[index]?.end_time ?? ''}
                                            className="w-full rounded-lg border dark:border-white/20 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                                        />

                                        {errors[`availability.${index}.end_time`] && (
                                            <p className="text-red-500">{errors[`availability.${index}.end_time`]}</p>
                                        )}
                                    </td>

                                    <td className="p-2 text-center">
                                        <InputSwitch
                                            name={`availability[${index}].available`}
                                            checked={!!(availability[index]?.active ?? true)}
                                        />
                                        {errors[`availability.${index}.available`] && (
                                            <p className="text-red-500">{errors[`availability.${index}.available`]}</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="rounded-lg bg-[#3ABEFF] px-6 py-2 font-semibold text-white hover:bg-[#3ABEFF]/90"
                    >
                        Submit
                    </button>
                </div>
            </Form>



            <div className="rounded-2xl border dark:border-white/20 p-6 shadow-sm dark:shadow-white/20">
                <h3 className="mb-4 text-lg font-semibold dark:text-white">Schedule</h3>

                <div className="block md:hidden space-y-4">
                    {days.map((day) => (
                        <div
                            key={day}
                            className="rounded-xl border dark:border-white/20 bg-white dark:bg-[#222831] p-4"
                        >
                            <h4 className="mb-3 font-semibold dark:text-white">{day}</h4>

                            <div className="grid grid-cols-3 gap-2">
                                {hours.map((hour) => (
                                    <div key={hour}>
                                        <p className="mb-1 text-xs text-gray-500">{hour}</p>
                                        {renderCell(day, hour)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block overflow-x-auto rounded-xl border dark:border-white/20">
                    <table className="min-w-[900px] w-full text-center text-sm">
                        <thead className="bg-[#3ABEFF]/10 border-b dark:border-white/20">
                            <tr>
                                <th className="p-2">Hour</th>
                                {days.map((day) => (
                                    <th key={day} className="p-2">
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
                                        <td key={day} className="p-2">
                                            {renderCell(day, hour)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={handleBack}
                    className="cursor-pointer rounded-lg bg-black/80 px-6 py-2 font-semibold text-white transition-all hover:bg-black/70 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                    Back
                </button>
            </div>

            {popup.visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3ABEFF]/40 backdrop-blur-sm px-4">
                    <div className="w-full max-w-sm rounded-xl bg-white dark:bg-[#222831] p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="mb-4 font-semibold dark:text-white">Add / Edit Session</h3>

                        <select
                            className="mb-4 w-full rounded-md border dark:border-white/20 p-2"
                            value={selectedCourse?.id || ''}
                            onChange={(e) =>
                                setSelectedCourse(
                                    teachings.find((t: any) => t.id === Number(e.target.value)),
                                )
                            }
                        >
                            <option value="">Select course</option>
                            {teachings.map((t: any) => (
                                <option key={t.id} value={t.id}>
                                    {t.course.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => applyCourse()}
                            className="w-full rounded-md bg-[#3ABEFF] py-2 text-white"
                        >
                            Save
                        </button>

                        {popup.id && (
                            <button
                                onClick={() => applyCourse(true)}
                                className="mt-3 w-full rounded-md bg-red-500 py-2 text-white"
                            >
                                Remove
                            </button>
                        )}

                        <button
                            onClick={closePopup}
                            className="mt-3 w-full rounded-md bg-gray-600 py-2 text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

AddSchedulePage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Schedule Management">{page}</LMSLayout>
);
