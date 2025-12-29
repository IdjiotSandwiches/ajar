import FlashToast from "@/components/flash-toast";
import { NotificationProvider } from "@/providers/notification-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <FlashToast />
      {children}
    </NotificationProvider>
  );
}
