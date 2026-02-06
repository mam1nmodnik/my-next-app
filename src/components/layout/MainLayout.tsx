"use client";
import { FooterMobile } from "./FooterMobile";
import React from "react";

import AsideLeft from "./AsideLeft";
import AsideRight from "./AsideRight";
import Feed from "./Feed";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row justify-center flex-1 items-stretch h-full w-full gap-4  max-w-[1280px] mx-auto ">
        <AsideLeft  />
        <Feed>{children}</Feed>
        <AsideRight />
      </div>

      <FooterMobile  />
    </>
  );
}
