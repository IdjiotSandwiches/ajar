import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavigationList from "@/components/navigation-list";
import BackButton from "@/components/ui/back-button";
import React, { PropsWithChildren } from "react";

interface AppLayoutProps {
  showBackButton?: boolean;
  useContainer?: boolean;
}

export default function AppLayout({
  children,
  showBackButton = true,
  useContainer = true, 
}: PropsWithChildren<AppLayoutProps>) {

  const role = "institute"
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {showBackButton && (
        <div className="absolute top-24 left-6 z-20">
          <BackButton label="Back" />
        </div>
      )}

      {(role === "institute" || role === "admin") && (
        <NavigationList role={role} />
      )}

      <main
        className={`flex-1 ${
          useContainer ? "container mx-auto" : "w-full"
        }`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}


