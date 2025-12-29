import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import BackButton from '@/components/ui/back-button';
import { PropsWithChildren } from 'react';
import RootLayout from '../root-layout';

interface AppLayoutProps {
    showBackButton?: boolean;
    useContainer?: boolean;
}

export default function AppLayout({ children, showBackButton = true, useContainer = true }: PropsWithChildren<AppLayoutProps>) {
    return (
        <RootLayout>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                {showBackButton && (
                    <div className="absolute top-24 left-6 z-20 hidden md:inline">
                        <BackButton label="Back" />
                    </div>
                )}
                <main className={`flex-1 ${useContainer ? 'container mx-auto' : 'w-full'}`}>{children}</main>
                <Footer />
            </div>
        </RootLayout>
    );
}
