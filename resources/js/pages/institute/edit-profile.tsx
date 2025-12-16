import ProfilePersonalForm from '@/components/profile/institute/personal-information';
import ProfileSidebar from '@/components/profile/profile-sidebar';
import LMSLayout from '@/layouts/lms-layout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ProfilePage({ profile }: any) {
    const [activeSection, setActiveSection] = useState('Personal Information');
    return (
        <>
            <Head title="Profile" />
            <div className="flex min-h-screen flex-col md:flex-row">

                <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} profile={profile?.user} />
                <main className="flex-1 p-4 md:p-10">{activeSection === 'Personal Information' && <ProfilePersonalForm profile={profile} />}</main>
            </div>
        </>
    );
}

ProfilePage.layout = (page: React.ReactNode) => <LMSLayout>{page}</LMSLayout>;
