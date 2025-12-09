import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import NavigationList from '@/components/navigation-list';
import BackButton from '@/components/ui/back-button';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import { toast, Toaster } from 'sonner';

interface AppLayoutProps {
    showBackButton?: boolean;
    useContainer?: boolean;
}

export default function AppLayout({ children, showBackButton = true, useContainer = true }: PropsWithChildren<AppLayoutProps>) {
    const { props } = usePage();
    const user = props.auth?.user;
    const { flash }: any = props;

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {showBackButton && (
                <div className="absolute top-24 left-6 z-20 hidden md:inline">
                    <BackButton label="Back" />
                </div>
            )}

            {(user?.role_id === 1 || user?.role_id === 2 || user?.role_id === 3) && <NavigationList role={user?.role_id} />}

            <main className={`flex-1 ${useContainer ? 'container mx-auto' : 'w-full'}`}>{children}</main>
            <Toaster richColors={true} />
            <Footer />
        </div>
    );
}
