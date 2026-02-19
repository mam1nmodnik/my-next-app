"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./main/MainLayout";
import AuthLayout from "./main/AuthLayout";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = ["/login", "/signup"].includes(pathname);

  return isAuthPage ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <MainLayout>{children}</MainLayout>
  );
}
