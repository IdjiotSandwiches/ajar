import { storageUrl } from '@/utils/storage';
import { router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
        <div className="fixed top-0 right-0 left-0 z-20 bg-white shadow-sm md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
                <button onClick={onMenu} className="rounded-lg bg-[#3ABEFF]/10 p-2 text-[#3ABEFF]">
                    <Menu />
                </button>

                <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
                <div className="relative" ref={dropdownRef}>
                    <img
                        src={storageUrl(user?.profile_picture)}
                        alt={user?.name}
                        className="h-9 w-9 rounded-full"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />

                    {dropdownOpen && (
                        <div className="animate-fadeIn absolute right-0 mt-3 w-48 origin-top-right rounded-xl border bg-white p-2 shadow-lg">
                            {isLoggedIn ? (
                                <>
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
    );
}
