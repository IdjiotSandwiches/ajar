import MobileNavbar from '@/components/lms/dashboard-navbar';
import RightPanel from '@/components/lms/right-panel/app';
import Sidebar from '@/components/lms/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function LMSLayout({ children, title }: any) {
    const { props } = usePage();
    const flash: any = props?.flash;

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    useEffect(() => {
        router.on('navigate', () => {
            setMobileOpen(false);
        });
    }, []);

    return (
        <>
            <Head title={title} />
            <div className="flex min-h-[100svh] w-full overflow-hidden bg-gray-50 md:h-screen">
                <Sidebar
                    collapsed={collapsed}
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                    onNavigate={() => setMobileOpen(false)}
                />

                <main className="relative flex flex-1 flex-col overflow-hidden">
                    <div className="mb-20 md:mb-0">
                        <MobileNavbar title={title} onMenu={() => setMobileOpen(true)} />
                    </div>

                    <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">{children}</div>
                </main>

                <div className="hidden w-72 overflow-y-auto border-l bg-white p-6 lg:block">
                    <RightPanel />
                </div>
            </div>
            <Toaster richColors={true} />
        </>
    );
}
