// import { AppContent } from '@/components/app-content';
// import { AppShell } from '@/components/app-shell';
// import { AppSidebar } from '@/components/app-sidebar';
// import { AppSidebarHeader } from '@/components/app-sidebar-header';
// import { type BreadcrumbItem } from '@/types';
// import { type PropsWithChildren } from 'react';

// export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
//     return (
//         <AppShell variant="sidebar">
//             <AppSidebar />
//             <AppContent variant="sidebar">
//                 <AppSidebarHeader breadcrumbs={breadcrumbs} />
//                 {children}
//             </AppContent>
//         </AppShell>
//     );
// }

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import BackButton from "@/components/ui/back-button";
import React, { PropsWithChildren } from "react";

interface AppNavbarLayoutProps {
  showBackButton?: boolean;
  useContainer?: boolean;
}

export default function AppNavbarLayout({
  children,
  showBackButton = true,
  useContainer = true, // default true agar tetap konsisten
}: PropsWithChildren<AppNavbarLayoutProps>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Tombol Back (opsional) */}
      {showBackButton && (
        <div className="absolute top-24 left-6 z-20">
          <BackButton label="Back" />
        </div>
      )}

      {/* Konten utama */}
      <main
        className={`flex-1 ${
          useContainer ? "container mx-auto" : "w-full"
        }`}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}


