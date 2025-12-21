import ProfilePersonalForm from '@/components/profile/institute/personal-information';
import ProfileSidebar from '@/components/profile/profile-sidebar';
import LMSLayout from '@/layouts/lms-layout';
import React, { useState } from 'react';

export default function ProfilePage({ profile }: any) {
    const [activeSection, setActiveSection] = useState('Personal Information');
    return (
        <>
            <div className="flex flex-col gap-8 md:flex-row">
                <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} profile={profile?.user} />
                <main className="w-full flex-1">{activeSection === 'Personal Information' && <ProfilePersonalForm profile={profile} />}</main>
            </div>
        </>
    );
}

ProfilePage.layout = (page: React.ReactNode) => <LMSLayout title="Profile">{page}</LMSLayout>;
