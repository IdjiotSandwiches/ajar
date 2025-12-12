import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReminderList from "./reminder-list";
import { usePage, router } from "@inertiajs/react";
import { LogOut } from "lucide-react";

export default function RightPanel() {
  const { props } = usePage();
  const user = props.auth?.user;

  const isLoggedIn = !!user;

  const handleLogout = () => {
    router.post(route("logout"));
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-2xl shadow-sm border-none relative">
        <div className={`${isLoggedIn ? "" : "hidden"}`}>
          <button
            onClick={handleLogout}
            className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition flex items-center gap-1"
            title="Logout"
          >
            <LogOut size={16} /> <p className="text-sm">Logout</p>
          </button>
        </div>
        
        <CardContent className="text-center relative">
          <img
            src={user?.profile_picture || "https://placehold.co/400"}
            alt={user?.name}
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <h3 className="font-semibold text-lg">{user?.name}</h3>
          <p className="text-sm text-gray-500">
            Technology/Design Student/Teacher/Institute
          </p>
        </CardContent>
      </Card>

      <ReminderList />
    </div>
  );
}
