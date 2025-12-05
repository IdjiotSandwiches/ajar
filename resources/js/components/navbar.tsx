import React, { useState, useRef, useEffect } from "react";
import { Bell, Home, Book, GraduationCap } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

export default function Navbar() {
  const { auth } = usePage().props;
  const user = auth?.user;
  const isLoggedIn = !!user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentRoute = route().current();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="relative flex items-center justify-between px-8 py-4 max-w-[1870px] mx-auto">

          <div className="flex items-center">
            <span
              className="text-3xl font-bold text-[#42C2FF] cursor-pointer"
              onClick={() => router.get(route("home"))}
            >
              Ajar
            </span>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 items-center text-[#42C2FF] font-medium hidden md:flex space-x-12 lg:text-lg md:space-x-6 md:text-base max-w-[500px] md:max-w-[350px] sm:max-w-[250px]">
            <span
              className="hover:text-[#1AAAE3] transition-colors cursor-pointer"
              onClick={() => router.get(route("home"))}
            >
              Home
            </span>

            <span
              className="hover:text-[#1AAAE3] transition-colors cursor-pointer"
              onClick={() => router.get(route("list-course", { category_id: 1 }))}
            >
              Course
            </span>

            <span
              className="hover:text-[#1AAAE3] transition-colors cursor-pointer"
              onClick={() => router.get(route("my-learning"))}
            >
              MyLearning
            </span>
          </div>

          <div className="flex items-center space-x-4 relative">
            <div className="relative">
              <Bell size={22} color="#42C2FF" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>

            <span className="text-[#42C2FF] font-medium hidden md:inline">
              Hello, {user?.name ?? "Guest"}
            </span>

            <div className="relative" ref={dropdownRef}>
              <img
                src="/images/image-1.jpg"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-2 origin-top-right animate-fadeIn">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => router.get(route("profile"))}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Profile
                      </button>

                      <div className="h-px bg-gray-200 my-1"></div>

                      <button
                        onClick={() => router.post(route("logout"))}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-red-500 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => router.get(route("login"))}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium cursor-pointer"
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

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around py-3 md:hidden z-50">
        <button
          onClick={() => router.get(route("home"))}
          className="flex flex-col items-center group"
        >
          <div className={`p-2 rounded-full transition-all ${currentRoute === "home" ? "bg-[#42C2FF] text-white" : "text-[#42C2FF] group-hover:bg-blue-100"}`}>
            <Home size={22} />
          </div>
          <span className={`text-xs mt-1 ${currentRoute === "home" ? "text-[#42C2FF] font-semibold" : "text-[#42C2FF]"}`}>
            Home
          </span>
        </button>

        <button
          onClick={() => router.get(route("list-course"))}
          className="flex flex-col items-center group"
        >
          <div className={`p-2 rounded-full transition-all ${currentRoute === "list-course" ? "bg-[#42C2FF] text-white" : "text-[#42C2FF] group-hover:bg-blue-100"}`}>
            <Book size={22} />
          </div>
          <span className={`text-xs mt-1 ${currentRoute === "list-course" ? "text-[#42C2FF] font-semibold" : "text-[#42C2FF]"}`}>
            Course
          </span>
        </button>

        <button
          onClick={() => router.get(route("my-learning"))}
          className="flex flex-col items-center group"
        >
          <div className={`p-2 rounded-full transition-all ${currentRoute === "my-learning" ? "bg-[#42C2FF] text-white" : "text-[#42C2FF] group-hover:bg-blue-100"}`}>
            <GraduationCap size={22} />
          </div>
          <span className={`text-xs mt-1 ${currentRoute === "my-learning" ? "text-[#42C2FF] font-semibold" : "text-[#42C2FF]"}`}>
            MyLearning
          </span>
        </button>
      </div>
    </>
  );
}
