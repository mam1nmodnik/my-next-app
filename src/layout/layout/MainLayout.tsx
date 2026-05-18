"use client";
import { FooterMobile } from "../mobile/FooterMobile";
import React from "react";

import { usePathname } from "next/navigation";
import AsideRight from "../main/AsideRight";
import Feed from "../main/Feed";
import Header from "../main/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChat = pathname === "/chat" || pathname.startsWith("/chat/");

  return (
    <div className="flex flex-row max-w-[1280px] xl:justify-between justify-center h-full w-full mx-auto">
      <Header isChat={isChat} />
      <Feed active={isChat}>{children}</Feed>
      {!isChat && <AsideRight />}
      <FooterMobile />
    </div>
  );
}
