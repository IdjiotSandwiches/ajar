import { Menu } from "lucide-react";
import React from "react";

export default function MobileNavbar({ title, onMenu }) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenu}
          className="p-2 rounded-lg bg-[#3ABEFF]/10 text-[#3ABEFF]"
        >
          <Menu />
        </button>

        <h1 className="text-lg font-semibold text-gray-700">{title}</h1>

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
}
