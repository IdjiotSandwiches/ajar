import ClassSection from '@/components/lms/dashboard/class-section';
import Greeting from '@/components/lms/dashboard/greeting';
import MobileReminder from '@/components/lms/dashboard/reminder/mobile-reminder';
import LMSLayout from '@/layouts/lms-layout';
import React from 'react';

export default function StudentDashboard({ today, upcoming, reminder }: any) {
    return (
        <div className="flex w-full flex-col gap-6">
            <Greeting />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <MobileReminder reminder={reminder} />
                </div>
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <ClassSection title="Today Classes" course={today} type="today" />
                    <ClassSection title="Upcoming Classes" course={upcoming} type="upcoming" />
                </div>
            </div>
        </div>
    );
}

StudentDashboard.layout = (page: React.ReactNode) => <LMSLayout title="My Dashboard">{page}</LMSLayout>;
