import { router, usePage } from '@inertiajs/react';
import { Bell, Book, GraduationCap, Home } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    console.log(user);
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
                <div className="relative mx-auto flex max-w-[1870px] items-center justify-between px-8 py-4">
                    <div className="flex items-center">
                        <span className="cursor-pointer text-3xl font-bold text-[#42C2FF]" onClick={() => router.get(route('home'))}>
                            Ajar
                        </span>
                    </div>

                    <div className="absolute left-1/2 hidden max-w-[500px] -translate-x-1/2 transform items-center space-x-12 font-medium text-[#42C2FF] sm:max-w-[250px] md:flex md:max-w-[350px] md:space-x-6 md:text-base lg:text-lg">
                        <span className="cursor-pointer transition-colors hover:text-[#1AAAE3]" onClick={() => router.get(route('home'))}>
                            Home
                        </span>

                        <span
                            className="cursor-pointer transition-colors hover:text-[#1AAAE3]"
                            onClick={() => router.get(route('list-course', { category_id: 1 }))}
                        >
                            Course
                        </span>

                        <span className="cursor-pointer transition-colors hover:text-[#1AAAE3]" onClick={() => router.get(route('my-learning'))}>
                            MyLearning
                        </span>
                    </div>

                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <Bell size={22} color="#42C2FF" />
                            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
                        </div>

                        <span className="hidden font-medium text-[#42C2FF] md:inline">Hello, {user?.name ?? 'Guest'}</span>

                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user?.profile_picture || 'https://placehold.co/400'}
                                alt="Avatar"
                                className="h-10 w-10 cursor-pointer rounded-full border object-cover"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />

                            {dropdownOpen && (
                                <div className="animate-fadeIn absolute right-0 mt-3 w-48 origin-top-right rounded-xl border bg-white p-2 shadow-lg">
                                    {isLoggedIn ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (user?.role_id === roles.Student) router.get(route('profile'));
                                                    else if (user?.role_id === roles.Teacher) router.get(route('teacher.profile'));
                                                    else if (user?.role_id === roles.Institute) router.get(route('institute.profile'));
                                                }}
                                                className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile
                                            </button>

                                            <div className="my-1 h-px bg-gray-200"></div>

                                            <button
                                                onClick={() => router.post(route('logout'))}
                                                className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => router.get(route('login'))}
                                            className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100"
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

            <div className="fixed right-0 bottom-0 left-0 z-50 flex justify-around border-t bg-white py-3 shadow-lg md:hidden">
                <button onClick={() => router.get(route('home'))} className="group flex flex-col items-center">
                    <div
                        className={`rounded-full p-2 transition-all ${currentRoute === 'home' ? 'bg-[#42C2FF] text-white' : 'text-[#42C2FF] group-hover:bg-blue-100'}`}
                    >
                        <Home size={22} />
                    </div>
                    <span className={`mt-1 text-xs ${currentRoute === 'home' ? 'font-semibold text-[#42C2FF]' : 'text-[#42C2FF]'}`}>Home</span>
                </button>

                <button onClick={() => router.get(route('list-course'))} className="group flex flex-col items-center">
                    <div
                        className={`rounded-full p-2 transition-all ${currentRoute === 'list-course' ? 'bg-[#42C2FF] text-white' : 'text-[#42C2FF] group-hover:bg-blue-100'}`}
                    >
                        <Book size={22} />
                    </div>
                    <span className={`mt-1 text-xs ${currentRoute === 'list-course' ? 'font-semibold text-[#42C2FF]' : 'text-[#42C2FF]'}`}>
                        Course
                    </span>
                </button>

                <button onClick={() => router.get(route('my-learning'))} className="group flex flex-col items-center">
                    <div
                        className={`rounded-full p-2 transition-all ${currentRoute === 'my-learning' ? 'bg-[#42C2FF] text-white' : 'text-[#42C2FF] group-hover:bg-blue-100'}`}
                    >
                        <GraduationCap size={22} />
                    </div>
                    <span className={`mt-1 text-xs ${currentRoute === 'my-learning' ? 'font-semibold text-[#42C2FF]' : 'text-[#42C2FF]'}`}>
                        MyLearning
                    </span>
                </button>
            </div>
        </>
    );
}
