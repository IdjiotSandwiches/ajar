// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// // import { type BreadcrumbItem } from '@/types';
// import { type ReactNode } from 'react';

// interface AppLayoutProps {
//     children: ReactNode;
//     // breadcrumbs?: BreadcrumbItem[];
// }

// // export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
// export default ({ children, ...props }: AppLayoutProps) => (
//     // <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
//     <AppLayoutTemplate {...props} >
//         {children}
//     </AppLayoutTemplate>
// );

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
