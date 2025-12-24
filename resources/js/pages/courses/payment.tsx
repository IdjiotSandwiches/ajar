import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react';

export default function PaymentPage({ teachers, schedules, summary, payment }: any) {
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

    const formatIDR = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    const canPay = selectedTeacher && selectedSchedule;

    const onSelectedTeacher = (teacherId: any) => {
        setSelectedTeacher(teacherId);
        router.reload({
            only: ['schedules'],
            data: {
                teacher: teacherId,
            },
        });
    };

    const onSelectedSchedule = (scheduleId: any) => {
        setSelectedSchedule(scheduleId);
    };

    return (
        <>
            <Head title="Course Payment" />
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-800">Course Registration & Payment</h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <h2 className="mb-1 text-lg font-semibold text-gray-800">1. Choose Teacher</h2>
                                <p className="mb-4 text-sm text-gray-500">Select your preferred instructor</p>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {teachers.map((teacher: any) => (
                                        <button
                                            key={teacher.id}
                                            onClick={() => {
                                                onSelectedTeacher(teacher.id);
                                                setSelectedSchedule(null);
                                            }}
                                            className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                                                selectedTeacher === teacher.id
                                                    ? 'border-[#3ABEFF] bg-[#3ABEFF]/10'
                                                    : 'border-gray-200 hover:border-[#3ABEFF]'
                                            }`}
                                        >
                                            <div>
                                                <p className="font-medium text-gray-800">{teacher.name}</p>
                                                <p className="text-xs text-gray-500">{teacher.expertise}</p>
                                            </div>

                                            {selectedTeacher === teacher.id && <CheckCircle className="text-[#3ABEFF]" size={20} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <h2 className="mb-1 text-lg font-semibold text-gray-800">2. Choose Schedule</h2>
                                <p className="mb-4 text-sm text-gray-500">Select available time</p>

                                {(!selectedTeacher || !schedules) ? (
                                    <p className="text-sm text-gray-400 italic">Please select a teacher first</p>
                                ) : (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {schedules.map((schedule: any) => (
                                            <button
                                                key={schedule.id}
                                                onClick={() => onSelectedSchedule(schedule.id)}
                                                className={`rounded-xl border p-4 text-left transition
                                                    ${
                                                        selectedSchedule === schedule.id
                                                            ? 'border-[#3ABEFF] bg-[#3ABEFF]/10'
                                                            : 'border-gray-200 hover:border-[#3ABEFF]'
                                                    }`}
                                            >
                                                <p className="font-medium text-gray-800">
                                                    {schedule.date}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {schedule.start_time} - {schedule.end_time}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                    Course Summary
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Course</span>
                                        <span className="font-medium text-gray-800 text-right">
                                            {/* {course.title} */}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="font-medium text-gray-800">
                                            {/* {course.duration} Minutes */}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Teacher</span>
                                        <span className="font-medium text-gray-800">
                                            {selectedTeacher?.name || '-'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Schedule</span>
                                        <span className="font-medium text-gray-800 text-right">
                                            {selectedSchedule
                                                ? `${selectedSchedule.date}, ${selectedSchedule.time}`
                                                : '-'}
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="flex justify-between">
                                        <span>Price</span>
                                        {/* <span>Rp{formatIDR(course.price)}</span> */}
                                    </div>

                                    <div className="flex justify-between text-red-500">
                                        <span>Discount</span>
                                        {/* <span>- Rp{formatIDR(course.discount)}</span> */}
                                    </div>

                                    <hr />

                                    <div className="flex justify-between text-base font-semibold">
                                        <span>Total</span>
                                        {/* <span>Rp{formatIDR(finalPrice)}</span> */}
                                    </div>
                                </div>

                                <button
                                    disabled={!canPay}
                                    onClick={() => alert('Redirect to payment gateway')}
                                    className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold
                                        ${
                                            canPay
                                                ? 'bg-[#3ABEFF] text-white hover:bg-[#3ABEFF]/90'
                                                : 'cursor-not-allowed bg-gray-300 text-gray-500'
                                        }`}
                                >
                                    Pay Now
                                </button>

                                <p className="mt-3 text-center text-xs text-gray-400">
                                    Payment will be processed via secure third-party gateway
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PaymentPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
