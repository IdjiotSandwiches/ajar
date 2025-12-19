import React, { useState } from "react";
import { X } from "lucide-react";

interface AddLinkModalProps {
  title: string;
  placeholder: string;
  onSubmit: (value: string) => void;
  onClose: () => void;
}

export default function AddLinkModal({
  title,
  placeholder,
  onSubmit,
  onClose,
}: AddLinkModalProps) {
  const [value, setValue] = useState("");

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#3ABEFF]/40 backdrop-blur-sm z-99">
      <div className="bg-[#FFF9F7] w-[400px] rounded-2xl shadow-xl p-6 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        <p className="text-sm text-gray-500 mb-6">
          {title === "Meeting Link"
            ? "Add a meeting link for course learning according to the schedule"
            : "Add recording link as proof of course learning"}
        </p>

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]"
        />

        <button
          onClick={() => {
            if (value.trim() !== "") {
              onSubmit(value);
              setValue("");
            }
          }}
          className="w-full bg-[#3ABEFF] hover:bg-[#3ABEFF]/90 text-white py-2 rounded-lg font-medium transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
