import Pagination from '@/components/pagination';
import LMSLayout from '@/layouts/lms-layout';
import { router, usePage } from '@inertiajs/react';
import { CreditCard, Wallet } from 'lucide-react';
import React from 'react';

export default function PaymentsPage({ payments, amounts }: any) {
    const { props } = usePage();
    const status = props.enums?.payment_status_enum;
    const statusStyle: Record<string, string> = {
        paid: 'bg-green-100 text-green-600',
        pending: 'bg-yellow-100 text-yellow-600',
        failed: 'bg-red-100 text-red-600',
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
                        <div className="rounded-full bg-red-100 p-3">
                            <Wallet className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Unpaid Amount</p>
                            <p className="text-lg font-bold text-gray-800 md:text-xl">
                                Rp
                                {Number(amounts.pending).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
                        <div className="rounded-full bg-green-100 p-3">
                            <CreditCard className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Paid Amount</p>
                            <p className="text-lg font-bold text-gray-800 md:text-xl">
                                Rp
                                {Number(amounts.paid).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Payment History</h3>

                    <div className="space-y-4 md:hidden">
                        {payments.data?.map((payment: any) => (
                            <div key={payment.id} className="rounded-xl border bg-white p-4 shadow-sm">
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">Course</p>
                                    <p className="font-semibold text-gray-800">{payment.course_name}</p>
                                </div>

                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">Teacher</p>
                                    <p className="text-gray-700">{payment.teacher}</p>
                                </div>

                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">Schedule</p>
                                    <p className="text-gray-700">{payment.schedule}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="font-semibold">Rp {payment.amount.toLocaleString('id-ID')}</p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[payment.status] ?? 'bg-red-100 text-red-600'}`}
                                    >
                                        {payment.status.toUpperCase()}
                                    </span>
                                </div>

                                {payment.status === status.Pending && (
                                    <button
                                        onClick={() => router.get(route('pending-payment', payment.id))}
                                        className="mt-4 w-full rounded-md bg-[#3ABEFF] py-2 text-sm font-semibold text-white transition hover:bg-[#3ABEFF]/90"
                                    >
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="hidden overflow-x-auto rounded-lg border md:block">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="border-b bg-[#3ABEFF]/10">
                                <tr>
                                    <th className="p-3 text-left font-semibold">Course</th>
                                    <th className="p-3 text-left font-semibold">Teacher</th>
                                    <th className="p-3 text-left font-semibold">Schedule</th>
                                    <th className="p-3 text-left font-semibold">Price</th>
                                    <th className="p-3 text-center font-semibold">Status</th>
                                    <th className="p-3 text-center font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {payments.data?.map((payment: any, index: number) => (
                                    <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-[#F9FCFF]' : 'bg-white'}`}>
                                        <td className="p-3 font-medium">{payment.course_name}</td>
                                        <td className="p-3">{payment.teacher}</td>
                                        <td className="p-3">{payment.schedule}</td>
                                        <td className="p-3 font-semibold">
                                            Rp
                                            {payment.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[payment.status] ?? 'bg-red-100 text-red-600'}`}
                                            >
                                                {payment.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center">
                                            {payment.status === status.Pending ? (
                                                <button
                                                    onClick={() => router.get(route('pending-payment', payment.id))}
                                                    className="rounded-md bg-[#3ABEFF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3ABEFF]/90"
                                                >
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={payments.links} />
                </div>
            </div>
        </>
    );
}

PaymentsPage.layout = (page: React.ReactNode) => <LMSLayout title="Payments">{page}</LMSLayout>;
