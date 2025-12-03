import React from "react";
import ProfileCard from "./profile-card";
import { User, GraduationCap } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user?: {
    name: string;
    email: string;
    role?: "Student" | "Institute" | "Teacher";
  };
}

const ProfileSidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  user,
}) => {
  const safeUser = user ?? { name: "Unknown", email: "-", role: "Teacher" };

  let menuItems: { name: string; icon: React.ReactNode }[] = [];

  if (safeUser.role === "Teacher") {
    menuItems = [
      { name: "Personal Information", icon: <User size={20} /> },
      { name: "Teacher Information", icon: <GraduationCap size={20} /> },
    ];
  }

  return (
    <aside className="w-full md:w-80 p-4 md:py-10 flex flex-col items-center">

      <div className="w-full flex justify-center">
        <ProfileCard user={safeUser} />
      </div>

      {menuItems.length > 0 && (
        <nav className="w-full flex flex-col gap-1 mt-5 bg-white py-2 border border-[#42C2FF] rounded-xl">
          {menuItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <button
                key={item.name}
                onClick={() => onSectionChange(item.name)}
                className={`flex items-center gap-3 text-left px-4 py-3 text-sm md:text-base transition font-medium border-l-4 
                  ${
                    isActive
                      ? "border-[#42C2FF] text-black"
                      : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span
                  className={`${
                    isActive ? "text-[#42C2FF]" : "text-gray-400"
                  } flex items-center`}
                >
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </nav>
      )}
    </aside>
  );
};

export default ProfileSidebar;
