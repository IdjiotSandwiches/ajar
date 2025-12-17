import { router, usePage } from '@inertiajs/react';
import { BookA, BookCheck, Calendar, ChevronDown, ChevronLeft, ChevronRight, LogOut, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Book, Home, MessageSquare, User } from 'react-feather';
import { FaMoneyBill } from 'react-icons/fa';

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    route?: string;
    children?: NavItem[];
}

const MENU_STUDENT: NavItem[] = [
    { id: "dashboard", label: "My Dashboard", icon: <Home size={18} />, route: "dashboard" },
    { id: "mylearning", label: "My Learning", icon: <Book size={18} />, route: "my-learning" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, route: "chat" },
    { id: "payments", label: "Payments", icon: <FaMoneyBill size={18} />, route: "payments" },
    { id: "profile", label: "Profile", icon: <User size={18} />, route: "profile" },
];

const MENU_TEACHER: NavItem[] = [
    { id: "dashboard", label: "My Dashboard", icon: <Home size={18} />, route: "dashboard" },
    { id: "mylearning", label: "My Learning", icon: <Book size={18} />, route: "my-learning" },
    {
        id: "applications",
        label: "Applications",
        icon: <User size={18} />,
        children: [
            {
                id: "instituteapplications",
                label: "Institute Applications",
                icon: <BookCheck size={16} />,
                route: "teacher.institute-applications",
            },
            {
                id: "courseapplications",
                label: "Course Applications",
                icon: <User size={16} />,
                route: "teacher.course-applications",
            },
        ],
    },
    { id: "coursestaught", label: "Courses Taught", icon: <BookA size={18} />, route: "teacher.courses-taught" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, route: "chat" },
    { id: "profile", label: "Profile", icon: <User size={18} />, route: "teacher.profile" },
];

const MENU_INSTITUTE: NavItem[] = [
    { id: "dashboard", label: "My Dashboard", icon: <Home size={18} />, route: "dashboard" },
    { id: "mycourses", label: "My Courses", icon: <Book size={18} />, route: "institute.my-courses" },
    { id: "coursestaken", label: "Courses Taken", icon: <BookCheck size={18} />, route: "institute.courses-taken" },
    {
        id: "teachermanagement",
        label: "Teacher Management",
        icon: <User size={18} />,
        children: [
            {
                id: "teacherapplications",
                label: "Teacher Applications",
                icon: <BookCheck size={16} />,
                route: "institute.teacher-application",
            },
            {
                id: "courseteacherapplications",
                label: "Course Teaching",
                icon: <BookCheck size={16} />,
                route: "institute.course-teacher-applications",
            },
            {
                id: "manageteachers",
                label: "Manage Teachers",
                icon: <User size={16} />,
                route: "institute.list-teacher",
            },
        ],
    },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, route: "chat" },
    { id: "profile", label: "Profile", icon: <User size={18} />, route: "institute.profile" },
];

const MENU_ADMIN: NavItem[] = [
    { id: "dashboard", label: "My Dashboard", icon: <Home size={18} />, route: "dashboard" },
    { id: "coursesmanagement", label: "Courses Management", icon: <Book size={18} />, route: "admin.courses-management" },
    { id: "usersmanagement", label: "Users Management", icon: <User size={18} />, route: "admin.users-management" },
];


const isRouteActive = (routeName?: string) => {
    if (!routeName) return false;
    return route().current(routeName);
};

export default function Sidebar({ collapsed, mobileOpen, onClose, onToggleCollapse }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    let MENU: NavItem[] = MENU_STUDENT;

    if (user?.role_id === 1) MENU = MENU_ADMIN;
    else if (user?.role_id === 2) MENU = MENU_TEACHER;
    else if (user?.role_id === 3) MENU = MENU_INSTITUTE;

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    useEffect(() => {
        MENU.forEach((item) => {
            if (item.children?.some((c) => isRouteActive(c.route))) {
                setOpenMenu(item.id);
            }
        });
    }, []);

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
            />

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r bg-white transition-all duration-300 md:static ${collapsed ? 'md:w-20' : 'md:w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <button onClick={onClose} className="absolute top-6 right-4 rounded-full bg-[#3ABEFF]/10 p-2 text-[#3ABEFF] md:hidden">
                    <X size={18} />
                </button>

                <div className={`flex items-center ${!collapsed ? 'justify-between' : 'justify-center'} px-4 py-6`}>
                    <div className="cursor-pointer" onClick={() => router.get(route('home'))}>
                        {!collapsed && (
                            <svg width="64" height="36" viewBox="0 0 78 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32.8856 34.408C33.1416 34.888 33.2696 35.304 33.2696 35.656C33.3016 35.976 33.2056 36.28 32.9816 36.568C32.7576 36.824 32.4056 37.064 31.9256 37.288C31.1576 37.64 30.5496 37.72 30.1016 37.528C29.6856 37.336 29.3016 36.872 28.9496 36.136L16.9496 10.6L5.04556 36.088C4.69356 36.824 4.29356 37.288 3.84556 37.48C3.42956 37.672 2.82156 37.592 2.02156 37.24C1.54156 37.048 1.18956 36.808 0.965563 36.52C0.773563 36.232 0.693563 35.88 0.725563 35.464C0.789563 35.048 0.949563 34.568 1.20556 34.024L14.9816 5.272C15.1736 4.888 15.4456 4.584 15.7976 4.36C16.1816 4.104 16.5816 3.976 16.9976 3.976C17.2856 3.976 17.5576 4.024 17.8136 4.12C18.0696 4.216 18.2936 4.36 18.4856 4.552C18.6776 4.744 18.8376 5 18.9656 5.32L32.8856 34.408ZM7.92556 27.928L9.55756 24.232H24.4376L26.0216 27.928H7.92556Z"
                                    fill="#42C2FF"
                                />
                                <path
                                    d="M28.7664 43.84C28.3504 43.84 27.9824 43.776 27.6624 43.648C27.3424 43.552 27.1024 43.36 26.9424 43.072C26.7504 42.784 26.6544 42.336 26.6544 41.728C26.6544 41.152 26.7504 40.72 26.9424 40.432C27.1024 40.144 27.3584 39.936 27.7104 39.808C28.0304 39.712 28.3984 39.664 28.8144 39.664C29.5504 39.664 30.2544 39.6 30.9264 39.472C31.6304 39.344 32.2384 39.088 32.7504 38.704C33.2944 38.32 33.7104 37.744 33.9984 36.976C34.3184 36.24 34.4784 35.28 34.4784 34.096V13.216C34.4784 12.8 34.5264 12.448 34.6224 12.16C34.7184 11.872 34.9104 11.648 35.1984 11.488C35.5184 11.296 35.9824 11.2 36.5904 11.2C37.1664 11.2 37.5984 11.296 37.8864 11.488C38.2064 11.648 38.4144 11.904 38.5104 12.256C38.6064 12.576 38.6544 12.96 38.6544 13.408V34.096C38.6544 35.76 38.3984 37.2 37.8864 38.416C37.3744 39.664 36.6704 40.688 35.7744 41.488C34.8784 42.288 33.8384 42.88 32.6544 43.264C31.4704 43.648 30.1744 43.84 28.7664 43.84ZM36.4944 5.44C35.5664 5.44 34.9264 5.264 34.5744 4.912C34.2544 4.528 34.0944 3.872 34.0944 2.944C34.0944 2.016 34.2704 1.392 34.6224 1.072C34.9744 0.719998 35.6144 0.543999 36.5424 0.543999C37.4704 0.543999 38.0944 0.735998 38.4144 1.12C38.7664 1.472 38.9424 2.112 38.9424 3.04C38.9424 3.936 38.7664 4.56 38.4144 4.912C38.0624 5.264 37.4224 5.44 36.4944 5.44Z"
                                    fill="#42C2FF"
                                />
                                <path
                                    d="M64.886 37.48C64.278 37.48 63.814 37.384 63.494 37.192C63.206 37.032 63.014 36.792 62.918 36.472C62.854 36.12 62.822 35.72 62.822 35.272V16.36C62.822 15.88 62.87 15.48 62.966 15.16C63.062 14.84 63.254 14.616 63.542 14.488C63.83 14.328 64.294 14.248 64.934 14.248C65.51 14.248 65.942 14.328 66.23 14.488C66.55 14.616 66.758 14.824 66.854 15.112C66.982 15.368 67.046 15.672 67.046 16.024L66.854 17.464C67.078 17.048 67.334 16.632 67.622 16.216C67.942 15.8 68.326 15.432 68.774 15.112C69.254 14.76 69.814 14.472 70.454 14.248C71.126 14.024 71.942 13.912 72.902 13.912C73.382 13.912 73.83 13.96 74.246 14.056C74.694 14.12 75.11 14.232 75.494 14.392C75.91 14.552 76.262 14.744 76.55 14.968C76.838 15.16 77.062 15.384 77.222 15.64C77.414 15.864 77.51 16.136 77.51 16.456C77.51 17.16 77.286 17.768 76.838 18.28C76.39 18.76 75.926 19 75.446 19C75.03 19 74.726 18.952 74.534 18.856C74.342 18.728 74.15 18.6 73.958 18.472C73.798 18.344 73.558 18.232 73.238 18.136C72.918 18.008 72.406 17.944 71.702 17.944C71.222 17.944 70.71 18.04 70.166 18.232C69.654 18.424 69.158 18.712 68.678 19.096C68.198 19.448 67.798 19.912 67.478 20.488C67.19 21.064 67.046 21.736 67.046 22.504V35.368C67.046 35.816 66.998 36.2 66.902 36.52C66.806 36.84 66.598 37.08 66.278 37.24C65.99 37.4 65.526 37.48 64.886 37.48Z"
                                    fill="#42C2FF"
                                />
                                <path
                                    d="M60.0188 37.432C59.3148 37.432 58.8028 37.288 58.4828 37C58.1948 36.712 58.0188 36.264 57.9548 35.656L58.1468 33.256C57.8268 33.768 57.3308 34.36 56.6588 35.032C55.9868 35.672 55.1068 36.248 54.0188 36.76C52.9308 37.24 51.6028 37.48 50.0348 37.48C48.4988 37.48 47.0588 37.176 45.7148 36.568C44.4028 35.96 43.2348 35.112 42.2108 34.024C41.2188 32.936 40.4348 31.688 39.8588 30.28C39.3148 28.872 39.0428 27.368 39.0428 25.768C39.0428 24.2 39.3148 22.728 39.8588 21.352C40.4348 19.944 41.2348 18.712 42.2588 17.656C43.2828 16.6 44.4508 15.768 45.7628 15.16C47.1068 14.552 48.5308 14.248 50.0348 14.248C51.4428 14.248 52.6428 14.44 53.6348 14.824C54.6268 15.176 55.4748 15.656 56.1788 16.264C56.9148 16.84 57.5548 17.496 58.0988 18.232L58.0028 16.216C57.9708 15.512 58.1148 15.016 58.4348 14.728C58.7868 14.408 59.3308 14.248 60.0668 14.248C60.6748 14.248 61.1068 14.344 61.3628 14.536C61.6508 14.728 61.8428 15 61.9388 15.352C62.0348 15.704 62.0828 16.136 62.0828 16.648V35.176C62.0828 35.624 62.0348 36.024 61.9388 36.376C61.8428 36.728 61.6508 36.984 61.3628 37.144C61.0748 37.336 60.6268 37.432 60.0188 37.432ZM50.7548 33.448C52.0348 33.448 53.2028 33.112 54.2588 32.44C55.3468 31.768 56.1948 30.872 56.8028 29.752C57.4428 28.6 57.7628 27.288 57.7628 25.816C57.7628 24.312 57.4268 23 56.7548 21.88C56.1148 20.728 55.2508 19.832 54.1628 19.192C53.1068 18.52 51.9388 18.184 50.6588 18.184C49.1548 18.184 47.8428 18.536 46.7228 19.24C45.6348 19.912 44.7708 20.824 44.1308 21.976C43.4908 23.128 43.1708 24.44 43.1708 25.912C43.1708 27.352 43.4908 28.648 44.1308 29.8C44.7708 30.92 45.6508 31.816 46.7708 32.488C47.9228 33.128 49.2508 33.448 50.7548 33.448Z"
                                    fill="#42C2FF"
                                />
                            </svg>
                        )}
                    </div>

                    <button className="hidden rounded-lg bg-[#3ABEFF]/10 p-2.5 text-[#3ABEFF] md:flex" onClick={onToggleCollapse}>
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav className={`${collapsed ? 'px-0' : 'px-3'} flex-1`}>
                    <ul className="space-y-2">
                        {MENU.map((item) => {
                            const isParentActive = isRouteActive(item.route) || item.children?.some((c) => isRouteActive(c.route));

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            if (item.children) {
                                                setOpenMenu(openMenu === item.id ? null : item.id);
                                            } else if (item.route) {
                                                router.get(route(item.route));
                                            }
                                        }}
                                        className={`flex items-center rounded-xl transition-all ${isParentActive ? 'bg-[#3ABEFF] text-white' : 'hover:bg-[#3ABEFF]/10'} ${
                                            collapsed ? 'mx-auto h-10 w-10 justify-center' : 'w-full justify-between px-4 py-3'
                                        } `}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                                        </div>

                                        {!collapsed && item.children && (
                                            <ChevronDown size={16} className={`transition-transform ${openMenu === item.id ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>

                                    {!collapsed && item.children && openMenu === item.id && (
                                        <ul className="mt-2 ml-5 space-y-1 font-medium">
                                            {item.children.map((child) => (
                                                <li key={child.id}>
                                                    <button
                                                        onClick={() => router.get(route(child.route!))}
                                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                                                            isRouteActive(child.route) ? 'bg-[#3ABEFF]/20 text-[#3ABEFF]' : 'hover:bg-[#3ABEFF]/10'
                                                        } `}
                                                    >
                                                        {child.icon}
                                                        <span>{child.label}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className={`flex items-center gap-3 border-t px-4 py-4 ${collapsed ? 'justify-center' : ''} `}>
                    <img src={user?.profile_picture || 'https://placehold.co/40'} alt="profile" className="h-10 w-10 rounded-full object-cover" />

                    {!collapsed && (
                        <>
                            <div className="flex flex-1 flex-col">
                                <span className="text-sm font-semibold">{user?.name}</span>
                                <span className="text-xs text-gray-500 capitalize">{Object.keys(roles).find(key => roles[key] === user?.role_id) ?? 'User'}</span>
                            </div>

                            <button onClick={() => router.post(route('logout'))} className="text-sm text-red-500 hover:underline cursor-pointer">
                                <LogOut size={20} />
                            </button>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}
