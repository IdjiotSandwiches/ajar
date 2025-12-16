import MobileNavbar from "@/components/lms/dashboard-navbar";
import RightPanel from "@/components/lms/right-panel/app";
import Sidebar from "@/components/lms/sidebar";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function LMSLayout({ children, title = "Dashboard" }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    router.on('navigate', () => {
      setMobileOpen(false);
    })
  }, []);

  return (
    <div className="flex min-h-[100svh] md:h-screen w-full bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onNavigate={() => setMobileOpen(false)}
      />

      <main className="flex-1 flex flex-col relative 2xl:px-36 overflow-y-auto">
        <div className="mb-20 md:mb-0">
          <MobileNavbar
            title={title}
            onMenu={() => setMobileOpen(true)}
          />
        </div>

        <div className="flex-1 flex flex-col p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* <div className="hidden lg:block w-72 border-l bg-white overflow-y-auto p-6">
        <RightPanel />
      </div> */}
    </div>
  );
}
