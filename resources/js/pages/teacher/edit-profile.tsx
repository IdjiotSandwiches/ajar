import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfilePersonalForm from '@/components/profile/teacher/personal-information';
import ProfileTeacherForm from '@/components/profile/teacher/teacher-information';
import { dummyTeachers } from '@/dummy-data/dummy-teacher';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ProfilePage({ profile }: any) {
    const [activeSection, setActiveSection] = useState('Personal Information');
    const teacher = dummyTeachers[0];

    const form = useForm({
        name: teacher.name,
        email: teacher.email,
        phone_number: teacher.phone_number,
        insta_link: 'https://www.instagram.com/',
        linkedin_link: 'https://www.linkedin.com/in/',
        github_link: 'https://www.github.com/',
        description: teacher.description,
        category: teacher.category,
        graduates: teacher.graduates,
        works: teacher.works,
        certificates: teacher.certificates,
        role: 'Teacher',
    });

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} profile={profile?.user} />

            <main className="w-full flex-1 p-5 md:p-10">
                {activeSection === 'Personal Information' && <ProfilePersonalForm profile={profile} />}
                {activeSection === 'Teacher Information' && <ProfileTeacherForm form={form} categories={[]} />}
            </main>
        </div>
    );
}

ProfilePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
