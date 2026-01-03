// import { AppContent } from '@/components/app-content';
// import { AppShell } from '@/components/app-shell';
// import { AppSidebar } from '@/components/app-sidebar';
// import { AppSidebarHeader } from '@/components/app-sidebar-header';
// import { type BreadcrumbItem } from '@/types';
// import { type PropsWithChildren } from 'react';

// export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
//     return (
//         <AppShell variant="sidebar">
//             <AppSidebar />
//             <AppContent variant="sidebar">
//                 <AppSidebarHeader breadcrumbs={breadcrumbs} />
//                 {children}
//             </AppContent>
//         </AppShell>
//     );
// }

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import NavigationList from '@/components/navigation-list';
import BackButton from '@/components/ui/back-button';
import { Toaster } from '@/components/ui/sonner';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface AppNavbarLayoutProps {
    showBackButton?: boolean;
    useContainer?: boolean;
}

export default function AppNavbarLayout({ children, showBackButton = true, useContainer = true }: PropsWithChildren<AppNavbarLayoutProps>) {
    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {showBackButton && (
                <div className="absolute top-24 left-6 z-20">
                    <BackButton label="Back" />
                </div>
            )}

            {(user?.role_id === 1 || user?.role_id === 2 || user?.role_id === 3) && <NavigationList role={user?.role_id} />}

            <main className={`flex-1 ${useContainer ? 'container mx-auto' : 'w-full'}`}>{children}</main>
            <Toaster />
            <Footer />
        </div>
    );
}
