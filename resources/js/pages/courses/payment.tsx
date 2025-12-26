import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react';

export default function PaymentPage({ course, teachers, schedules, payment }: any) {
    const [snapToken, setSnapToken] = useState<any>(payment?.snap_token);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(payment?.teacher_id);
    const [selectedSchedule, setSelectedSchedule] = useState<any>(payment?.schedule_id);

    const formatIDR = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    const onSelectedTeacher = (teacherId: any) => {
        setSelectedTeacher(teacherId);
        setSelectedSchedule(null);
        router.reload({
            only: ['schedules'],
            data: {
                teacher: teacherId,
            },
        });
    };

    const triggerSnapPopup = (token: string) => {
        if (window.snap) {
            window.snap.pay(token, {
                onSuccess: () => {
                    router.get(route('payment-lms'));
                },
                onPending: () => {
                    router.get(route('payment-lms'));
                },
                onError: (result: any) => {
                    console.error('error', result);
                },
            });
        }
    };

    const handlePay = () => {
        if (snapToken) {
            triggerSnapPopup(snapToken);
            return;
        }

        router.post(
            route('pay', selectedSchedule),
            {},
            {
                preserveState: true,
                only: ['course', 'teachers', 'payment', 'flash', 'snap_token'],
                onSuccess: (page: any) => {
                    const newToken = page.props.flash?.snap_token || page.props.snap_token;
                    if (newToken) {
                        setSnapToken(newToken);
                        triggerSnapPopup(newToken);
                    }
                },
            },
        );
    };

    const teacherSummary = teachers?.find((x: any) => x.id === selectedTeacher);
    const scheduleSummary = schedules?.find((x: any) => x.id === selectedSchedule);
    const isLocked = !!payment || !!snapToken;
    const canPay = (selectedTeacher && selectedSchedule) || isLocked;

    return (
        <>
            <Head title="Course Payment" />

            <div className="min-h-screen py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">Course Registration & Payment</h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#222831]">
                                <h2 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">1. Choose Teacher</h2>
                                <p className="mb-4 text-sm text-gray-500">Select your preferred instructor</p>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {teachers.map((teacher: any) => (
                                        <button
                                            key={teacher.id}
                                            onClick={() => onSelectedTeacher(teacher.id)}
                                            className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                                                selectedTeacher === teacher.id
                                                    ? 'border-[#3ABEFF] bg-[#3ABEFF]/10'
                                                    : 'border-gray-200 hover:border-[#3ABEFF]'
                                            }`}
                                            disabled={isLocked}
                                        >
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white">{teacher.name}</p>
                                                <p className="text-xs text-gray-500">{teacher.expertise}</p>
                                            </div>

                                            {selectedTeacher === teacher.id && <CheckCircle className="text-[#3ABEFF]" size={20} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#222831]">
                                <h2 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">2. Choose Schedule</h2>
                                <p className="mb-4 text-sm text-gray-500">Select available time</p>

                                {!selectedTeacher || !schedules ? (
                                    <p className="text-sm text-gray-400 italic">Please select a teacher first</p>
                                ) : (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {schedules.map((schedule: any) => (
                                            <button
                                                key={schedule.id}
                                                onClick={() => setSelectedSchedule(schedule.id)}
                                                className={`rounded-xl border p-4 text-left transition ${
                                                    selectedSchedule === schedule.id
                                                        ? 'border-[#3ABEFF] bg-[#3ABEFF]/10'
                                                        : 'border-gray-200 hover:border-[#3ABEFF]'
                                                }`}
                                                disabled={isLocked}
                                            >
                                                <p className="font-medium text-gray-800 dark:text-white">{schedule.date}</p>
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
                            <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#222831]">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Course Summary</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Course</span>
                                        <span className="text-right font-medium text-gray-800 dark:text-white">{course.name}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{course.duration} Minutes</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Teacher</span>
                                        <span className="font-medium text-gray-800 dark:text-white">{teacherSummary?.name || '-'}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Schedule</span>
                                        <span className="text-right font-medium text-gray-800 dark:text-white">
                                            {selectedSchedule
                                                ? `${scheduleSummary?.date}, ${scheduleSummary?.start_time}-${scheduleSummary?.end_time}`
                                                : '-'}
                                        </span>
                                    </div>

                                    <hr className="dark:border-white/20" />

                                    <div className="flex justify-between">
                                        <span>Price</span>
                                        <span>Rp{formatIDR(course.price)}</span>
                                    </div>

                                    <div className="flex justify-between text-red-500">
                                        <span>Discount</span>
                                        <span>- Rp{formatIDR(course.discount)}</span>
                                    </div>

                                    <hr className="dark:border-white/20" />

                                    <div className="flex justify-between text-base font-semibold">
                                        <span>Total</span>
                                        <span>Rp{formatIDR(course.final_price)}</span>
                                    </div>
                                </div>

                                <button
                                    disabled={!canPay}
                                    onClick={handlePay}
                                    className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold ${
                                        canPay
                                            ? 'bg-[#3ABEFF] text-white hover:bg-[#3ABEFF]/90'
                                            : 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-white/70'
                                    }`}
                                >
                                    Pay Now
                                </button>

                                <p className="mt-3 text-center text-xs text-gray-400">Payment will be processed via secure third-party gateway</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PaymentPage.layout = (page: React.ReactNode) => <AppLayout useContainer={false}>{page}</AppLayout>;
