import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import { useForm } from "@inertiajs/react";
import ProfilePersonalForm from "@/components/profile/institute/personal-information";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("Personal Information");

  const form = useForm({
    name: "Ajar",
    insta_link: "https://www.instagram.com/",
    linkedin_link: "https://www.linkedin.com/in/",
    github_link: "https://www.github.com/",
    website_link: "https://www.ajar.com/",
    role: "Institute",
  });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <ProfileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={form.data}
      />

      {/* Content Area */}
      <main className="flex-1 p-10">
        {activeSection === "Personal Information" && (
          <ProfilePersonalForm form={form} />
        )}
      </main>
    </div>
  );
}

ProfilePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
