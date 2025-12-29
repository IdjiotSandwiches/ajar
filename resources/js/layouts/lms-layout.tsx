import MobileNavbar from '@/components/lms/dashboard-navbar';
import PageHeader from '@/components/lms/header';
import Sidebar from '@/components/lms/sidebar';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import RootLayout from './root-layout';

export default function LMSLayout({ children, title = 'Dashboard' }: any) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        router.on('navigate', () => {
            setMobileOpen(false);
        });
    }, []);

    return (
        <RootLayout>
            <Head title={title} />
            <div className="flex min-h-[100svh] w-full md:h-screen">
                <Sidebar
                    collapsed={collapsed}
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                    onNavigate={() => setMobileOpen(false)}
                />

                <main className="relative flex flex-1 flex-col overflow-y-auto">
                    <div className="mb-20 md:mb-0">
                        <MobileNavbar title={title} onMenu={() => setMobileOpen(true)} />
                    </div>

                    <div className="mx-2 flex flex-1 flex-col md:my-4">
                        <div className="flex flex-1 flex-col rounded-xl border bg-white dark:bg-[#222831]">
                            <div className="hidden md:inline">
                                <PageHeader title={title} />
                            </div>
                            <div className="flex flex-1 flex-col p-4">{children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </RootLayout>
    );
}
