import "@ant-design/v5-patch-for-react-19";
import "@/app/globals.css";
import { LayoutWrapper } from "@/components/layoutWrapper";
import AppProvider from "./_providers/app-provider";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="referrer" content="origin" />
      <body
        className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 `}
      >
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
