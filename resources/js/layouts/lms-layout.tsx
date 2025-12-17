import MobileNavbar from '@/components/lms/dashboard-navbar';
import Sidebar from '@/components/lms/sidebar';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function LMSLayout({ children, title = 'Dashboard' }: any) {
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
            <div className="flex min-h-[100svh] w-full bg-gray-50 md:h-screen">
                <Sidebar
                    collapsed={collapsed}
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    onToggleCollapse={() => setCollapsed(!collapsed)}
                    onNavigate={() => setMobileOpen(false)}
                />

                <main className="relative flex flex-1 flex-col overflow-y-auto 2xl:px-36">
                    <div className="mb-20 md:mb-0">
                        <MobileNavbar title={title} onMenu={() => setMobileOpen(true)} />
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-8">{children}</div>
                </main>
            </div>
            <Toaster richColors={true} />
        </>
    );
}
