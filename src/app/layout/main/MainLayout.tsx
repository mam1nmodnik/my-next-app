"use client";
import { FooterMobile } from "../mobile/FooterMobile";
import React from "react";

import Header from "./Header";
import Feed from "./Feed";
import AsideRight from "./AsideRight";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChat = pathname === "/chat" || pathname.startsWith("/chat/");
  return (
    <>
      <div className={`flex flex-row max-w-[1280px]  h-full w-full mx-auto`}>
        <Header  isChat={isChat} />
        <Feed active={isChat}>{children}</Feed>
        {!isChat && <AsideRight />}
      </div>
      <FooterMobile />
    </>
  );
}
