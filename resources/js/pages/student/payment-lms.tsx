/* eslint-disable @typescript-eslint/no-unused-vars */
import LMSLayout from "@/layouts/lms-layout";
import { Head, router } from "@inertiajs/react";
import { CreditCard, Wallet } from "lucide-react";
import React from "react";

const payments = [
    {
        id: 1,
        course_name: "React Advanced",
        teacher: "Andi Pratama",
        price: 650000,
        schedule: "18 Dec 2025 01:00–02:00 PM",
        status: "unpaid",
    },
    {
        id: 2,
        course_name: "UI/UX Design Fundamentals",
        teacher: "Sinta Dewi",
        price: 450000,
        schedule: "20 Dec 2025 09:00–11:00 AM",
        status: "paid",
    },
    {
        id: 3,
        course_name: "Laravel REST API",
        teacher: "Budi Santoso",
        price: 550000,
        schedule: "22 Dec 2025 07:00–09:00 PM",
        status: "unpaid",
    },
];

const totalUnpaid = payments
    .filter((p) => p.status === "unpaid")
    .reduce((sum, p) => sum + p.price, 0);

const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.price, 0);

export default function PaymentsPage() {
    const handlePay = (courseId: number) => {
        router.get(route("student.checkout", courseId));
    };

    return (
        <>
            <Head title="Payments" />

            <div className="flex min-h-screen flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border dark:border-white/20 p-6 shadow-sm dark:shadow-[#ffffff]/20 flex items-center gap-4">
                        <div className="rounded-full bg-red-100 p-3">
                            <Wallet className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-white/70">
                                Total Unpaid Amount
                            </p>
                            <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                                Rp
                                {totalUnpaid.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border dark:border-white/20 p-6 shadow-sm dark:shadow-[#ffffff]/20 flex items-center gap-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <CreditCard
                                className="text-green-500"
                                size={24}
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-white/70">
                                Total Paid Amount
                            </p>
                            <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                                Rp
                                {totalPaid.toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border dark:border-white/20 p-6 shadow-sm dark:shadow-[#ffffff]/20">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                        Payment History
                    </h3>

                    <div className="space-y-4 lg:hidden">
                        {payments.map((course) => (
                            <div
                                key={course.id}
                                className="rounded-xl border dark:border-white/20 p-4 shadow-sm dark:shadow-[#ffffff]/20"
                            >
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500  dark:text-white/70">Course</p>
                                    <p className="font-semibold text-gray-800  dark:text-white">
                                        {course.course_name}
                                    </p>
                                </div>

                                <div className="mb-2">
                                    <p className="text-sm text-gray-500  dark:text-white/70">Teacher</p>
                                    <p className="text-gray-700  dark:text-white/90">{course.teacher}</p>
                                </div>

                                <div className="mb-2">
                                    <p className="text-sm text-gray-500  dark:text-white/70">Schedule</p>
                                    <p className="text-gray-700  dark:text-white/90">{course.schedule}</p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <p className="text-sm text-gray-500  dark:text-white/70">Price</p>
                                        <p className="font-semibold">
                                            Rp {course.price.toLocaleString("id-ID")}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${course.status === "paid"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {course.status.toUpperCase()}
                                    </span>
                                </div>

                                {course.status === "unpaid" && (
                                    <button
                                        onClick={() =>
                                            router.get(route("payment-register", course.id))
                                        }
                                        className="mt-4 w-full rounded-md bg-[#3ABEFF] py-2 text-sm font-semibold text-white transition hover:bg-[#3ABEFF]/90"
                                    >
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>


                    <div className="hidden lg:block overflow-x-auto rounded-lg border dark:border-white/20">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b dark:border-white/20 bg-[#3ABEFF]/10 dark:text-white/80">
                                <tr>
                                    <th className="p-3 text-left font-semibold">
                                        Course
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Teacher
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Schedule
                                    </th>
                                    <th className="p-3 text-left font-semibold">
                                        Price
                                    </th>
                                    <th className="p-3 text-center font-semibold">
                                        Status
                                    </th>
                                    <th className="p-3 text-center font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {payments.map((course, index) => (
                                    <tr
                                        key={course.id}
                                        className={`border-b dark:border-white/20 dark:text-white/70 ${index % 2 === 0
                                                ? "bg-[#F9FCFF] dark:bg-[#31363F]"
                                                : "bg-white dark:bg-[#222831]"
                                            }`}
                                    >
                                        <td className="p-3 font-medium">
                                            {course.course_name}
                                        </td>
                                        <td className="p-3">
                                            {course.teacher}
                                        </td>
                                        <td className="p-3">
                                            {course.schedule}
                                        </td>
                                        <td className="p-3 font-semibold">
                                            Rp
                                            {course.price.toLocaleString(
                                                "id-ID",
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${course.status ===
                                                        "paid"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {course.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center">
                                            {course.status === "unpaid" ? (
                                                <button
                                                    onClick={() =>
                                                        router.get(route('payment-register', course.id))
                                                    }
                                                    className="rounded-md bg-[#3ABEFF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3ABEFF]/90"
                                                >
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

PaymentsPage.layout = (page: React.ReactNode) => (
    <LMSLayout title="Payments">{page}</LMSLayout>
);
