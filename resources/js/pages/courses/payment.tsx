import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { CheckCircle } from 'lucide-react';

export default function PaymentPage() {
    const teachers = [
        { id: 1, name: 'John Doe', expertise: 'React Specialist' },
        { id: 2, name: 'Jane Smith', expertise: 'Frontend Architect' },
        { id: 3, name: 'Michael Tan', expertise: 'Senior UI Engineer' },
    ];

    const schedules = [
        {
            id: 1,
            date: '18 Dec 2025',
            time: '01:00 - 02:00 PM',
        },
        {
            id: 2,
            date: '20 Dec 2025',
            time: '09:00 - 10:00 AM',
        },
    ];

    const course = {
        title: 'Advanced React for Professionals',
        duration: 120,
        price: 750000,
        discount: 150000,
    };

    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

    const finalPrice = course.price - course.discount;

    const formatIDR = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    const canPay = selectedTeacher && selectedSchedule;

    return (
        <>
            <Head title="Course Payment" />

            <div className="min-h-screen py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
                        Course Registration & Payment
                    </h1>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl bg-white dark:bg-[#222831] p-6 shadow-sm">
                                <h2 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">
                                    1. Choose Teacher
                                </h2>
                                <p className="mb-4 text-sm text-gray-500">
                                    Select your preferred instructor
                                </p>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    {teachers.map((teacher) => (
                                        <button
                                            key={teacher.id}
                                            onClick={() => {
                                                setSelectedTeacher(teacher);
                                                setSelectedSchedule(null);
                                            }}
                                            className={`flex items-center justify-between rounded-xl border p-4 text-left transition
                                                ${
                                                    selectedTeacher?.id === teacher.id
                                                        ? 'border-[#3ABEFF] bg-[#3ABEFF]/10'
                                                        : 'border-gray-200 hover:border-[#3ABEFF]'
                                                }`}
                                        >
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white">
                                                    {teacher.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {teacher.expertise}
                                                </p>
                                            </div>

                                            {selectedTeacher?.id === teacher.id && (
                                                <CheckCircle className="text-[#3ABEFF]" size={20} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white dark:bg-[#222831] p-6 shadow-sm">
                                <h2 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white">
                                    2. Choose Schedule
                                </h2>
                                <p className="mb-4 text-sm text-gray-500">
                                    Select available time
                                </p>

                                {!selectedTeacher ? (
                                    <p className="text-sm italic text-gray-400">
                                        Please select a teacher first
                                    </p>
                                ) : (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {schedules.map((schedule) => (
                                            <button
                                                key={schedule.id}
                                                onClick={() => setSelectedSchedule(schedule)}
                                                className={`rounded-xl border p-4 text-left transition
                                                    ${
                                                        selectedSchedule?.id === schedule.id
                                                            ? 'border-[#3ABEFF] bg-[#3ABEFF]/10'
                                                            : 'border-gray-200 hover:border-[#3ABEFF]'
                                                    }`}
                                            >
                                                <p className="font-medium text-gray-800 dark:text-white">
                                                    {schedule.date}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {schedule.time}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-2xl bg-white dark:bg-[#222831] p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                                    Course Summary
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Course</span>
                                        <span className="font-medium text-gray-800 dark:text-white text-right">
                                            {course.title}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="font-medium text-gray-800 dark:text-white">
                                            {course.duration} Minutes
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Teacher</span>
                                        <span className="font-medium text-gray-800 dark:text-white">
                                            {selectedTeacher?.name || '-'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Schedule</span>
                                        <span className="font-medium text-gray-800 dark:text-white text-right">
                                            {selectedSchedule
                                                ? `${selectedSchedule.date}, ${selectedSchedule.time}`
                                                : '-'}
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="flex justify-between">
                                        <span>Price</span>
                                        <span>Rp{formatIDR(course.price)}</span>
                                    </div>

                                    <div className="flex justify-between text-red-500">
                                        <span>Discount</span>
                                        <span>- Rp{formatIDR(course.discount)}</span>
                                    </div>

                                    <hr />

                                    <div className="flex justify-between text-base font-semibold">
                                        <span>Total</span>
                                        <span>Rp{formatIDR(finalPrice)}</span>
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
