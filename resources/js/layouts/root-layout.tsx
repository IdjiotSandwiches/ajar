import FlashToast from "@/components/flash-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FlashToast />
      {children}
    </>
  );
}
