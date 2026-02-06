"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";
import AuthLayout from "./AuthLayout";



export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = ["/login", "/signup"].includes(pathname);

   return isAuthPage ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <MainLayout>{children}</MainLayout>
  );
}
