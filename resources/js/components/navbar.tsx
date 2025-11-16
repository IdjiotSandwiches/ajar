import { router, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Tutup dropdown jika klik di luar area
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <nav className="sticky top-0 z-99 w-full bg-white shadow-sm">
            <div className="relative mx-auto flex max-w-[1870px] items-center justify-between px-8 py-4">
                {/* === Left: Logo (pojok kiri) === */}
                <div className="flex items-center">
                    <span className="text-3xl font-bold text-[#3ABEFF]">Ajar</span>
                </div>
                {/* === Middle: Navigation benar-benar di tengah === */}
                <div className="absolute left-1/2 flex -translate-x-1/2 transform items-center space-x-12 font-medium text-[#3ABEFF]">
                    <a href="#" className="text-lg transition-colors hover:text-[#1AAAE3]" onClick={() => router.get(route('home'))}>
                        Home
                    </a>
                    <a href="#" className="text-lg transition-colors hover:text-[#1AAAE3]" onClick={() => router.get(route('list-course'))}>
                        Course
                    </a>
                    <a href="#" className="text-lg transition-colors hover:text-[#1AAAE3]" onClick={() => router.get(route('my-learning'))}>
                        MyLearning
                    </a>
                </div>

                {/* === Right: Notification + Hello + Avatar (pojok kanan) === */}
                <div className="relative flex items-center space-x-4" ref={dropdownRef}>
                    {/* Notification Icon */}
                    <div className="relative">
                        <Bell size={22} color="#3ABEFF" />
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
                    </div>

                    {/* Hello Text */}
                    <span className="hidden font-medium text-[#3ABEFF] md:inline">Hello, {user !== null ? user?.name : 'Human'}</span>

                    {/* Avatar (trigger dropdown) */}
                    <div className="relative">
                        <button onClick={() => setOpenDropdown((prev) => !prev)} className="flex items-center focus:outline-none">
                            <img src="/images/image-1.jpg" alt="Avatar" className="h-10 w-10 rounded-full border-2 border-[#3ABEFF] object-cover" />
                            {/* <ChevronDown
                size={18}
                className={`ml-1 text-[#3ABEFF] transition-transform ${
                  openDropdown ? "rotate-180" : ""
                }`}
              /> */}
                        </button>

                        {/* === Dropdown Menu === */}
                        {openDropdown && (
                            <div className="absolute top-14 right-0 w-40 rounded-xl border bg-white py-2 shadow-lg">
                                {user !== null ? (
                                    <>
                                        <a href="#profile" className="block px-4 py-2 text-gray-700 hover:bg-[#EAF8FE] hover:text-[#3ABEFF]">
                                            Profile
                                        </a>
                                        <button
                                            onClick={() => {
                                                router.post('logout');
                                                setOpenDropdown(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#EAF8FE] hover:text-[#3ABEFF]"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            router.get('login');
                                            setOpenDropdown(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#EAF8FE] hover:text-[#3ABEFF]"
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
