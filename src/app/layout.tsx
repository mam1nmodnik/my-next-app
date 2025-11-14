import '@ant-design/v5-patch-for-react-19';
import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutWrapper } from "@/components/layoutWrapper";
import AppProvider from "./_providers/app-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="referrer" content="origin"/>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
