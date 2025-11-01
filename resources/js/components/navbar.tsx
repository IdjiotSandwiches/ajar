import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-99">
      <div className="relative flex items-center justify-between px-8 py-4 max-w-[1870px] mx-auto">
        {/* === Left: Logo (pojok kiri) === */}
        <div className="flex items-center">
          <span className="text-3xl font-bold text-[#3ABEFF]">Ajar</span>
        </div>

        {/* === Middle: Navigation benar-benar di tengah === */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-12 text-[#3ABEFF] font-medium">
          <a href="#" className="hover:text-[#1AAAE3] transition-colors text-lg" onClick={() => router.get(route('home'))}>
            Home
          </a>
          <a href="#" className="hover:text-[#1AAAE3] transition-colors text-lg" onClick={() => router.get(route('list-course'))}>
            Course
          </a>
          <a href="#" className="hover:text-[#1AAAE3] transition-colors text-lg">
            MyLearning
          </a>
        </div>

        {/* === Right: Notification + Hello + Avatar (pojok kanan) === */}
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          {/* Notification Icon */}
          <div className="relative">
            <Bell size={22} color="#3ABEFF" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          {/* Hello Text */}
          <span className="text-[#3ABEFF] font-medium hidden md:inline">Hello, Human</span>

          {/* Avatar (trigger dropdown) */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src="/images/image-1.jpg"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#3ABEFF]"
              />
              {/* <ChevronDown
                size={18}
                className={`ml-1 text-[#3ABEFF] transition-transform ${
                  openDropdown ? "rotate-180" : ""
                }`}
              /> */}
            </button>

            {/* === Dropdown Menu === */}
            {openDropdown && (
              <div className="absolute right-0 top-14 bg-white border shadow-lg rounded-xl w-40 py-2">
                {isLoggedIn ? (
                  <>
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#EAF8FE] hover:text-[#3ABEFF]"
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setOpenDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#EAF8FE] hover:text-[#3ABEFF]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoggedIn(true);
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#EAF8FE] hover:text-[#3ABEFF]"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
