import { Menu } from 'lucide-react';
import { useRef } from 'react';
import NotificationDropdown from '../ui/notification';
import SwitchDarkMode from '../ui/switch-dark-mode';
export default function MobileNavbar({ title, onMenu }: any) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    return (
        <div className="fixed top-0 right-0 left-0 z-20 bg-white shadow-sm md:hidden dark:bg-[#222831]">
            <div className="relative flex items-center px-4 py-3">
                <button onClick={onMenu} className="rounded-lg bg-[#3ABEFF]/10 p-2 text-[#3ABEFF]">
                    <Menu />
                </button>

                <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold whitespace-nowrap text-gray-700 dark:text-white">{title}</h1>

                <div className="relative ml-auto flex items-center gap-2" ref={dropdownRef}>
                    <SwitchDarkMode />
                    <NotificationDropdown />
                </div>
            </div>
        </div>
    );
}
