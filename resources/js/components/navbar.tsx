import React from "react";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-4 py-4">
        {/* === Left: Logo === */}
        <div className="flex items-center space-x-1">
          <span className="text-3xl font-bold text-[#3ABEFF] ml-2">Ajar</span>
        </div>

        {/* === Middle: Navigation Links === */}
        <div className="flex items-center space-x-10 text-[#3ABEFF] font-medium">
          <a href="#" className="hover:text-[#3ABEFF] transition-colors text-xl">
            Home
          </a>
          <a href="#" className="hover:text-[#3ABEFF] transition-colors text-xl">
            Course
          </a>
          <a href="#" className="hover:text-[#3ABEFF] transition-colors text-xl">
            MyLearning
          </a>
        </div>

        {/* === Right: Notification + Profile === */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <Bell size={22} color="#3ABEFF" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          {/* Hello Text */}
          <span className="text-[#3ABEFF] font-medium">Hello, Human</span>

          {/* Avatar */}
          <img
            src="/images/image-1.jpg"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
