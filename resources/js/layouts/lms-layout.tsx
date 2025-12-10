import MobileNavbar from "@/components/lms/dashboard-navbar";
import MobileReminder from "@/components/lms/mobile-reminder";
import RightPanel from "@/components/lms/right-panel/app";
import Sidebar from "@/components/lms/sidebar";
import React, { useState } from "react";

export default function LMSLayout({ children, title = "Dashboard" }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <main className="flex-1 overflow-y-auto relative">
        <MobileNavbar
          title={title}
          onMenu={() => setMobileOpen(true)}
        />

        <div className="md:hidden px-6 mt-20">
          <MobileReminder />
        </div>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

      <div className="hidden lg:block w-80 border-l bg-white overflow-y-auto p-6">
        <RightPanel />
      </div>
    </div>
  );
}
