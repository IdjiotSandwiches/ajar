import { Form, router, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function PaymentModal({ isOpen, onClose, onPrevious, onConfirm, schedule }: any) {
    const { paymentDetail } = usePage<any>().props;
    useEffect(() => {
        if (isOpen) {
            router.reload({
                only: ['paymentDetail'],
                data: { selected_schedule_id: schedule },
            });
        }
    }, [isOpen, schedule]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('enroll-course', schedule), {}, {
            onSuccess: () => {
                onConfirm();
            }
        });
    };

    return (
        <>
            {paymentDetail && (
                <div className="fixed inset-0 z-99 flex items-center justify-center bg-[#42C2FF]/40 backdrop-blur-sm transition-opacity duration-200">
                    <div className="animate-fadeIn relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>

                        <h2 className="mb-1 text-center text-lg font-semibold text-gray-800">Payment</h2>
                        <p className="mb-6 text-center text-sm text-gray-500">Your payment will be transferred to OrderOnline</p>

                        <div className="rounded-2xl bg-[#E9F6FF] px-5 py-5 text-sm">
                            <p className="mb-4 font-semibold text-gray-800">Details</p>

                            <div className="grid grid-cols-2 text-gray-600">
                                <p>Course Title</p>
                                <p className="text-right font-medium text-gray-800">{paymentDetail.title}</p>

                                <p className="mt-3">Date and Time</p>
                                <p className="mt-3 text-right font-medium text-gray-800">
                                    {(() => {
                                        const date = new Date(paymentDetail.date_time);
                                        const formattedDate =
                                            date.toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            }) +
                                            ' ' +
                                            date.toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            });
                                        return formattedDate;
                                    })()}
                                </p>

                                <p className="mt-3">Duration</p>
                                <p className="mt-3 text-right font-medium text-gray-800">{paymentDetail.duration} Minutes</p>
                            </div>

                            <hr className="my-4 border-gray-300" />

                            <div className="grid grid-cols-2 text-gray-600">
                                <p>Price</p>
                                <p className="text-right font-medium text-gray-800">
                                    Rp
                                    {paymentDetail.price.toLocaleString('id-ID', {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>
                                <p className="mt-3">Discount</p>
                                <p className="mt-3 text-right font-medium text-gray-800">
                                    {paymentDetail.discount.toLocaleString('id-ID', {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>
                            </div>

                            <hr className="my-4 border-gray-300" />

                            <div className="flex justify-between font-semibold text-gray-800">
                                <p>Total Price</p>
                                <p>
                                    Rp
                                    {paymentDetail.final_price.toLocaleString('id-ID', {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 flex gap-4"
                        >
                            <button
                                onClick={onPrevious}
                                className="w-1/2 cursor-pointer rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 cursor-pointer rounded-xl bg-[#42C2FF] py-3 font-medium text-white hover:bg-[#42C2FF]/90"
                            >
                                Pay
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
