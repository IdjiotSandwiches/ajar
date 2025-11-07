import React from "react";
import { X } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onPay: () => void;
  course?: {
    name?: string;
    duration?: number;
    price?: number;
  };
  schedule?: { date?: string; time?: string };
}

export default function PaymentModal({
  isOpen,
  onClose,
  onPrevious,
  onPay,
  course,
  schedule,
}: PaymentModalProps) {
  if (!isOpen) return null;

  const courseName = course?.name ?? "Pengembangan AI & Ilmu Data menggunakan Python";
  const duration = course?.duration ?? 2;
  const price = course?.price ?? 200000;
  const date = schedule?.date ?? "2025-04-15";
  const time = schedule?.time ?? "16:00";

  // 🔹 Format tanggal menjadi "dd month yyyy"
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3ABEFF]/40 backdrop-blur-sm z-50 transition-opacity duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
          Payment
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Your payment will be transferred to OrderOnline
        </p>

        <div className="bg-[#E9F6FF] rounded-2xl px-5 py-5 text-sm">
          <p className="font-semibold mb-4 text-gray-800">Details</p>

          <div className="grid grid-cols-2 text-gray-600">
            <p>Course Title</p>
            <p className="text-right text-gray-800 font-medium">{courseName}</p>

            <p className="mt-3">Date and Time</p>
            <p className="mt-3 text-right text-gray-800 font-medium">
              {formattedDate} {time}
            </p>

            <p className="mt-3">Duration</p>
            <p className="mt-3 text-right text-gray-800 font-medium">
              {duration} Jam
            </p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between font-semibold text-gray-800">
            <p>Total Price</p>
            <p>
              Rp
              {price.toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onPrevious}
            className="w-1/2 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
          >
            Back
          </button>
          <button
            onClick={onPay}
            className="w-1/2 py-3 rounded-xl bg-[#3ABEFF] hover:bg-[#32A7D8] text-white font-medium"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
