import React from "react";
import { DeleteConfirmationModalProps } from "@/interfaces/shared";
import { HelpCircle, X } from "lucide-react";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#3ABEFF]/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-6 relative text-center animate-fadeIn">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Ikon */}
        <div className="flex justify-center mb-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <HelpCircle className="text-blue-500" size={28} />
          </div>
        </div>

        {/* Judul & Deskripsi */}
        <h2 className="text-lg font-semibold mb-1">Are you sure?</h2>
        <p className="text-sm text-gray-500 mb-5">{description}</p>

        {/* Tombol Aksi */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#3ABEFF] text-white rounded-lg hover:bg-[#3ABEFF]/90 text-sm font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
