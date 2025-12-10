import { router, usePage } from '@inertiajs/react';
import { Bell, Book, GraduationCap, Home } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
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
                        <svg width="52" height="37" viewBox="0 0 108 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M43.712 58.544C44.0533 59.184 44.224 59.7387 44.224 60.208C44.2667 60.6347 44.1387 61.04 43.84 61.424C43.5413 61.7653 43.072 62.0853 42.432 62.384C41.408 62.8533 40.5973 62.96 40 62.704C39.4453 62.448 38.9333 61.8293 38.464 60.848L22.464 26.8L6.592 60.784C6.12267 61.7653 5.58933 62.384 4.992 62.64C4.43733 62.896 3.62667 62.7893 2.56 62.32C1.92 62.064 1.45067 61.744 1.152 61.36C0.896 60.976 0.789333 60.5067 0.832 59.952C0.917333 59.3973 1.13067 58.7573 1.472 58.032L19.84 19.696C20.096 19.184 20.4587 18.7787 20.928 18.48C21.44 18.1387 21.9733 17.968 22.528 17.968C22.912 17.968 23.2747 18.032 23.616 18.16C23.9573 18.288 24.256 18.48 24.512 18.736C24.768 18.992 24.9813 19.3333 25.152 19.76L43.712 58.544ZM10.432 49.904L12.608 44.976H32.448L34.56 49.904H10.432Z" fill="#42C2FF" />
                            <path d="M88.848 62.64C88.0373 62.64 87.4187 62.512 86.992 62.256C86.608 62.0427 86.352 61.7227 86.224 61.296C86.1387 60.8267 86.096 60.2933 86.096 59.696V34.48C86.096 33.84 86.16 33.3067 86.288 32.88C86.416 32.4533 86.672 32.1547 87.056 31.984C87.44 31.7707 88.0587 31.664 88.912 31.664C89.68 31.664 90.256 31.7707 90.64 31.984C91.0667 32.1547 91.344 32.432 91.472 32.816C91.6427 33.1573 91.728 33.5627 91.728 34.032L91.472 35.952C91.7707 35.3973 92.112 34.8427 92.496 34.288C92.9227 33.7333 93.4347 33.2427 94.032 32.816C94.672 32.3467 95.4187 31.9627 96.272 31.664C97.168 31.3653 98.256 31.216 99.536 31.216C100.176 31.216 100.773 31.28 101.328 31.408C101.925 31.4933 102.48 31.6427 102.992 31.856C103.547 32.0693 104.016 32.3253 104.4 32.624C104.784 32.88 105.083 33.1787 105.296 33.52C105.552 33.8187 105.68 34.1813 105.68 34.608C105.68 35.5467 105.381 36.3573 104.784 37.04C104.187 37.68 103.568 38 102.928 38C102.373 38 101.968 37.936 101.712 37.808C101.456 37.6373 101.2 37.4667 100.944 37.296C100.731 37.1253 100.411 36.976 99.984 36.848C99.5573 36.6773 98.8747 36.592 97.936 36.592C97.296 36.592 96.6133 36.72 95.888 36.976C95.2053 37.232 94.544 37.616 93.904 38.128C93.264 38.5973 92.7307 39.216 92.304 39.984C91.92 40.752 91.728 41.648 91.728 42.672V59.824C91.728 60.4213 91.664 60.9333 91.536 61.36C91.408 61.7867 91.1307 62.1067 90.704 62.32C90.32 62.5333 89.7013 62.64 88.848 62.64Z" fill="#42C2FF" />
                            <path d="M81.4 62.576C80.4613 62.576 79.7787 62.384 79.352 62C78.968 61.616 78.7333 61.0187 78.648 60.208L78.904 57.008C78.4773 57.6907 77.816 58.48 76.92 59.376C76.024 60.2293 74.8507 60.9973 73.4 61.68C71.9493 62.32 70.1787 62.64 68.088 62.64C66.04 62.64 64.12 62.2347 62.328 61.424C60.5787 60.6133 59.0213 59.4827 57.656 58.032C56.3333 56.5813 55.288 54.9173 54.52 53.04C53.7947 51.1627 53.432 49.1573 53.432 47.024C53.432 44.9333 53.7947 42.9707 54.52 41.136C55.288 39.2587 56.3547 37.616 57.72 36.208C59.0853 34.8 60.6427 33.6907 62.392 32.88C64.184 32.0693 66.0827 31.664 68.088 31.664C69.9653 31.664 71.5653 31.92 72.888 32.432C74.2107 32.9013 75.3413 33.5413 76.28 34.352C77.2613 35.12 78.1147 35.9947 78.84 36.976L78.712 34.288C78.6693 33.3493 78.8613 32.688 79.288 32.304C79.7573 31.8773 80.4827 31.664 81.464 31.664C82.2747 31.664 82.8507 31.792 83.192 32.048C83.576 32.304 83.832 32.6667 83.96 33.136C84.088 33.6053 84.152 34.1813 84.152 34.864V59.568C84.152 60.1653 84.088 60.6987 83.96 61.168C83.832 61.6373 83.576 61.9787 83.192 62.192C82.808 62.448 82.2107 62.576 81.4 62.576ZM69.048 57.264C70.7547 57.264 72.312 56.816 73.72 55.92C75.1707 55.024 76.3013 53.8293 77.112 52.336C77.9653 50.8 78.392 49.0507 78.392 47.088C78.392 45.0827 77.944 43.3333 77.048 41.84C76.1947 40.304 75.0427 39.1093 73.592 38.256C72.184 37.36 70.6267 36.912 68.92 36.912C66.9147 36.912 65.1653 37.3813 63.672 38.32C62.2213 39.216 61.0693 40.432 60.216 41.968C59.3627 43.504 58.936 45.2533 58.936 47.216C58.936 49.136 59.3627 50.864 60.216 52.4C61.0693 53.8933 62.2427 55.088 63.736 55.984C65.272 56.8373 67.0427 57.264 69.048 57.264Z" fill="#42C2FF" />
                            <path d="M38.376 75.12C37.8213 75.12 37.3307 75.0347 36.904 74.864C36.4773 74.736 36.1573 74.48 35.944 74.096C35.688 73.712 35.56 73.1147 35.56 72.304C35.56 71.536 35.688 70.96 35.944 70.576C36.1573 70.192 36.4987 69.9147 36.968 69.744C37.3947 69.616 37.8853 69.552 38.44 69.552C39.4213 69.552 40.36 69.4667 41.256 69.296C42.1947 69.1253 43.0053 68.784 43.688 68.272C44.4133 67.76 44.968 66.992 45.352 65.968C45.7787 64.9867 45.992 63.7067 45.992 62.128V34.288C45.992 33.7333 46.056 33.264 46.184 32.88C46.312 32.496 46.568 32.1973 46.952 31.984C47.3787 31.728 47.9973 31.6 48.808 31.6C49.576 31.6 50.152 31.728 50.536 31.984C50.9627 32.1973 51.24 32.5387 51.368 33.008C51.496 33.4347 51.56 33.9467 51.56 34.544V62.128C51.56 64.3467 51.2187 66.2667 50.536 67.888C49.8533 69.552 48.9147 70.9173 47.72 71.984C46.5253 73.0507 45.1387 73.84 43.56 74.352C41.9813 74.864 40.2533 75.12 38.376 75.12ZM48.68 23.92C47.4427 23.92 46.5893 23.6853 46.12 23.216C45.6933 22.704 45.48 21.8293 45.48 20.592C45.48 19.3547 45.7147 18.5227 46.184 18.096C46.6533 17.6267 47.5067 17.392 48.744 17.392C49.9813 17.392 50.8133 17.648 51.24 18.16C51.7093 18.6293 51.944 19.4827 51.944 20.72C51.944 21.9147 51.7093 22.7467 51.24 23.216C50.7707 23.6853 49.9173 23.92 48.68 23.92Z" fill="#42C2FF" />
                        </svg>
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
