import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import ProfilePersonalForm from "@/components/profile/teacher/personal-information";
import ProfileTeacherForm from "@/components/profile/teacher/teacher-information";
import { useForm } from "@inertiajs/react";
import { dummyTeachers } from "@/dummy-data/dummy-teacher";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("Personal Information");

  const teacher = dummyTeachers[0];

  const form = useForm({
    name: teacher.name,
    email: teacher.email,
    phone_number: teacher.phone_number,
    insta_link: "https://www.instagram.com/",
    linkedin_link: "https://www.linkedin.com/in/",
    github_link: "https://www.github.com/",
    description: teacher.description,
    category: teacher.category,
    graduates: teacher.graduates,
    works: teacher.works,
    certificates: teacher.certificates,
    role: "Teacher",
  });

  return (
    <div className="min-h-screen flex">
      <ProfileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={form.data}
      />
      <main className="flex-1 p-10">
        {activeSection === "Personal Information" && (
          <ProfilePersonalForm form={form} />
        )}
        {activeSection === "Teacher Information" && (
          <ProfileTeacherForm form={form} categories={[]} />
        )}
      </main>
    </div>
  );
}

ProfilePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
