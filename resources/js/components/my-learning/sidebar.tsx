import React from "react";
import { FaClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

interface SidebarProps {
  tab: "progress" | "completed";
  setTab: (tab: "progress" | "completed") => void;
}

export default function Sidebar({ tab, setTab }: SidebarProps) {
  return (
    <div className="col-span-2 flex flex-col gap-4">
      <button
        onClick={() => setTab("progress")}
        className={`flex items-center justify-center gap-2 py-3 rounded-full border text-sm font-medium ${
          tab === "progress"
            ? "bg-[#E6F8FF] border-[#3ABEFF] text-[#3ABEFF]"
            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
        }`}
      >
        <FaClock /> In Progress
      </button>

      <button
        onClick={() => setTab("completed")}
        className={`flex items-center justify-center gap-2 py-3 rounded-full border text-sm font-medium ${
          tab === "completed"
            ? "bg-[#E8FFF1] border-[#32D583] text-[#32D583]"
            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
        }`}
      >
        <FaCheck /> Completed
      </button>
    </div>
  );
}
