import { router, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SwitchDarkMode from "../ui/switch-dark-mode";

export default function MobileNavbar({ title, onMenu }: any) {
  const { props } = usePage();
  const user = props.auth?.user;

  const isLoggedIn = !!user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-[#222831] shadow-sm z-20">
      <div className="relative flex items-center px-4 py-3">
        <button
          onClick={onMenu}
          className="p-2 rounded-lg bg-[#3ABEFF]/10 text-[#3ABEFF]"
        >
          <Menu />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-gray-700 dark:text-white whitespace-nowrap">
          {title}
        </h1>

        <div className="ml-auto relative flex gap-2 items-center" ref={dropdownRef}>
          <SwitchDarkMode />

          <img
            src={user?.profile_picture || "https://placehold.co/400"}
            alt={user?.name}
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="animate-fadeIn absolute right-0 mt-28 w-48 origin-top-right rounded-xl border bg-white dark:bg-[#222831] p-2 shadow-lg">
              {isLoggedIn ? (
                <button
                  onClick={() => router.post(route("logout"))}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-white/20"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => router.get(route("login"))}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

}