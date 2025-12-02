import React, { useState, useEffect, useRef } from "react";
import { List, X } from "lucide-react";
import { router } from "@inertiajs/react";

interface NavigationListProps {
    role: 1 | 2 | 3
}

export default function NavigationList({ role }: NavigationListProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const navItems =
        role === 3
            ? [
                { label: "My Courses", route: "institute.my-courses" },
                { label: "Teacher Applications", route: "institute.teacher-application" },
                { label: "Courses Taken", route: "institute.courses-taken" },
            ]
            : role === 2
                ? [
                    { label: "Add Schedule", route: "teacher.add-schedule" },
                    // { label: "Finish a Course", route: "teacher.finish-course" },
                    // { label: "Student Chats", route: "teacher.chat" },
                ]
                : role === 1
                    ? [
                        { label: "Course Completion", route: "admin.course-completion" },
                        // { label: "Teacher Management", route: "admin.teacher-management" },
                    ]
                    : [];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => setOpen(false);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (routeName: string) => {
        setOpen(false);
        router.get(route(routeName)); 
    };

    return (
        <div ref={wrapperRef} className="fixed top-22 right-6 z-49">
            <button
                onClick={() => setOpen(!open)}
                className="p-3 rounded-full bg-white shadow-md transition flex items-center justify-center"
            >
                {open ? (
                    <X className="w-5 h-5 text-[#42C2FF]" />
                ) : (
                    <List className="w-5 h-5 text-[#42C2FF]" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-2 animate-fadeIn">
                    {navItems.map((item, idx) => (
                        <p
                            key={idx}
                            onClick={() => handleNavigation(item.route)}
                            className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700 cursor-pointer"
                        >
                            {item.label}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
