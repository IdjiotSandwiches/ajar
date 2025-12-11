import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfilePersonalForm from '@/components/profile/student/personal-information';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ProfilePage({ profile }: any) {
    const [activeSection, setActiveSection] = useState('Personal Information');
    return (
        <>
            <Head title="Profile" />
            <div className="flex min-h-screen flex-col md:flex-row gap-8">
                <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} profile={profile} />
                <main className="w-full flex-1">
                    {activeSection === 'Personal Information' && <ProfilePersonalForm profile={profile} />}
                </main>
            </div>
        </>
    );
}

ProfilePage.layout = (page: React.ReactNode) => <LMSLayout title="Profile">{page}</LMSLayout>;
