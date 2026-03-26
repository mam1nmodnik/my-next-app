"use client";

import { usePathname } from "next/navigation";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/signup"].includes(pathname);

  return isAuthPage ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <MainLayout>{children}</MainLayout>
  );
}
