import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import '@ant-design/v5-patch-for-react-19';
import "../globals.css";
import { LayoutWrapper } from "@/components/layoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable}  `}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
