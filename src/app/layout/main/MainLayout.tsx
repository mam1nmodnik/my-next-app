"use client";
import { FooterMobile } from "../mobile/FooterMobile";
import React from "react";

import AsideLeft from "./AsideLeft";
import Feed from "./Feed";
import AsideRight from "./AsideRight";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row justify-center items-stretch max-w-[1280px] h-full w-full gap-4 mx-auto">
        <AsideLeft />
        <Feed>{children}</Feed>
        <AsideRight />
      </div>

      <FooterMobile />
    </>
  );
}
