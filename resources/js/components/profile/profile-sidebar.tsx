import { usePage } from '@inertiajs/react';
import ProfileCard from './profile-card';
import { GraduationCap, User } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProfileSidebar({ profile, activeSection, onSectionChange }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;
    const errors = props.errors;

    let menuItems: { name: string; icon: React.ReactNode }[] = [];
    if (user?.role_id === roles.Teacher) {
        menuItems = [
            { name: 'Personal Information', icon: <User size={20} /> },
            { name: 'Teacher Information', icon: <GraduationCap size={20} /> },
        ];
    }

    useEffect(() => {
        if (errors.profile_picture) toast.error(errors.profile_picture);
    }, [errors]);

    return (
        <aside className="flex w-full flex-col items-center lg:w-60 xl:w-80">
            <div className="flex w-full justify-center">
                <ProfileCard user={profile} />
            </div>
            {menuItems.length > 0 && (
                <nav className="mt-5 flex w-full flex-col gap-1 rounded-xl border border-[#3ABEFF] bg-white py-2">
                    {menuItems.map((item) => {
                        const isActive = activeSection === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => onSectionChange(item.name)}
                                className={`flex items-center gap-3 border-l-4 px-4 py-3 text-left text-sm font-medium transition md:text-base ${
                                    isActive
                                        ? 'border-[#3ABEFF] text-black'
                                        : 'border-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                }`}
                            >
                                <span className={`${isActive ? 'text-[#3ABEFF]' : 'text-gray-400'} flex items-center`}>{item.icon}</span>
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            )}
        </aside>
    );
}
