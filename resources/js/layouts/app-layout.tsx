import AppLayoutTemplate from '@/layouts/app/app-layout-template';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  useContainer?: boolean;
}

export default function AppLayout({
  children,
  showBackButton = true,
  useContainer = true,
}: AppLayoutProps) {
  return (
    <AppLayoutTemplate showBackButton={showBackButton} useContainer={useContainer}>
      {children}
    </AppLayoutTemplate>
  );
}
