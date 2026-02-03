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
      <title>Echo.social</title>

      <link rel="icon" href="/logo.svg" type="image/svg+xml" />

      <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Echo.social" />
      <meta property="og:description" content="Your social echo network." />
      <meta
        property="og:image"
        content="https://echo.social/assets/logo-og.png"
      />
      <meta property="og:url" content="https://echo.social" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Echo.social" />
      <meta name="twitter:description" content="Your social echo network." />
      <meta
        name="twitter:image"
        content="https://echo.social/assets/logo-og.png"
      />

      <meta name="theme-color" content="#000000" />
      <body
        className={` bg-black text-white scroll-smooth selection:bg-indigo-500 selection:text-white min-h-screen h-full`}
      >
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
