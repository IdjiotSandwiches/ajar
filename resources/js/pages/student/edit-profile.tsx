import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import { useForm } from "@inertiajs/react";
import ProfilePersonalForm from "@/components/profile/student/personal-information";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("Personal Information");

  const form = useForm({
    name: "Kikung",
    email: "kikung@gmail.com",
    phone_number: "091234123",
    role: "Student",
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ProfileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={form.data}
      />

      <main className="flex-1 p-4 md:p-10 w-full">
        {activeSection === "Personal Information" && (
          <ProfilePersonalForm form={form} />
        )}
      </main>
    </div>
  );
}


ProfilePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
