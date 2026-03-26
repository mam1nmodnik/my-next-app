import AppProvider from "@/_providers/app-provider";
import LayoutWrapper from "@/layout/layout/LayoutWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AppProvider>
  );
}
