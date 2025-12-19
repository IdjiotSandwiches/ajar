import ClassSection from '@/components/lms/dashboard/class-section';
import Greeting from '@/components/lms/dashboard/greeting';
import MobileReminder from '@/components/lms/dashboard/reminder/mobile-reminder';
import LMSLayout from '@/layouts/lms-layout';
import { usePage } from '@inertiajs/react';
import React from 'react';

export default function StudentDashboard({ today, upcoming, reminder }: any) {
    const { props } = usePage();
    const roles = props.enums?.roles_enum;


    return (
        <div className="flex w-full flex-col gap-6">
            <Greeting />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="md:col-span-1">
                    <MobileReminder reminder={reminder} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-6">
                    <ClassSection
                        title="Today Classes"
                        data={today.data}
                        type="today"
                        role={roles}
                    />

                    <ClassSection
                        title="Upcoming Classes"
                        data={upcoming.data}
                        type="upcoming"
                        role={roles}
                    />
                </div>
            </div>
        </div>
    );
}

StudentDashboard.layout = (page: React.ReactNode) => <LMSLayout title="My Dashboard">{page}</LMSLayout>;
