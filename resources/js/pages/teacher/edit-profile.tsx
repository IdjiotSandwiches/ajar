import ProfileSidebar from '@/components/profile/profile-sidebar';
import ProfilePersonalForm from '@/components/profile/teacher/personal-information';
import ProfileTeacherForm from '@/components/profile/teacher/teacher-information';
import LMSLayout from '@/layouts/lms-layout';
import React, { useState } from 'react';

export default function ProfilePage({ profile, detail }: any) {
    const [activeSection, setActiveSection] = useState('Personal Information');

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} profile={profile?.user} />
            <main className="w-full flex-1">
                {activeSection === 'Personal Information' && <ProfilePersonalForm profile={profile} />}
                {activeSection === 'Teacher Information' && <ProfileTeacherForm detail={detail} />}
            </main>
        </div>
    );
}

ProfilePage.layout = (page: React.ReactNode) => <LMSLayout title="Profile">{page}</LMSLayout>;
