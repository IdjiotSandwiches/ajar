import React, { useState } from "react";
import { Bell } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { auth } = usePage().props;
  const user = auth?.user;
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-99">
      <div className="relative flex items-center justify-between px-8 py-4 max-w-[1870px] mx-auto">
        <div className="flex items-center">
          <span
            className="text-3xl font-bold text-[#3ABEFF] cursor-pointer"
            onClick={() => router.get(route("home"))}>Ajar</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-12 text-[#3ABEFF] font-medium">
          <a
            href="#"
            className="hover:text-[#1AAAE3] transition-colors text-lg"
            onClick={() => router.get(route("home"))}
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-[#1AAAE3] transition-colors text-lg"
            onClick={() => router.get(route("list-course"))}
          >
            Course
          </a>
          <a
            href="#"
            className="hover:text-[#1AAAE3] transition-colors text-lg"
            onClick={() => router.get(route("my-learning"))}
          >
            MyLearning
          </a>
        </div>

        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <Bell size={22} color="#3ABEFF" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          <span className="text-[#3ABEFF] font-medium hidden md:inline">
            Hello, {user?.name ?? "Guest"}
          </span>


          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none rounded-full">
              <img
                src="/images/image-1.jpg"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-48 mr-1 mt-2 rounded-md border bg-white shadow-md z-999"
              align="end"
            >
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem
                    onClick={() => router.get(route("profile"))}
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                    className="cursor-pointer text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() => setIsLoggedIn(true)}
                  className="cursor-pointer"
                >
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
