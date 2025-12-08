import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfilePersonalForm from '@/components/profile/student/personal-information';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ProfilePage({ profile }: any) {
    const [activeSection, setActiveSection] = useState('Personal Information');
    return (
        <>
            <Head title="Profile" />
            <div className="flex min-h-screen flex-col md:flex-row">
                <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} profile={profile} />
                <main className="w-full flex-1 p-4 md:p-10">
                    {activeSection === 'Personal Information' && <ProfilePersonalForm profile={profile} />}
                </main>
            </div>
        </>
    );
}

ProfilePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
