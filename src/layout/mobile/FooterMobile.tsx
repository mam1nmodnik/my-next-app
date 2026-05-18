"use client";

import { Layout } from "antd";
import FooterContainer from "@/layout/mobile/footer/FooterContainer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { useDrawerContext } from "@/_providers/ui/drawer-provider";

const { Footer } = Layout;
export function FooterMobile() {
  const { data: session } = useSession();
  const { showDrawer } = useDrawerContext();

  return (
    <Footer
      style={{ textAlign: "center" }}
      className="lg:hidden flex flex-row gap-6 items-center justify-center w-full h-[60px] fixed bottom-2 "
    >
      <FooterContainer />
      {!session ? (
        <div
          className={`flex items-center justify-center p-2 w-[20%] rounded-[50px] cursor-pointer glass h-full hover:opacity-45 `}
        >
          <Link href="/login">
            <p className={`text-white text-[16px]`}>Войти</p>
          </Link>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center p-2 w-[20%] rounded-[50px] cursor-pointer glass h-full `}
          onClick={showDrawer}
        >
          <div>
            <IoSettingsOutline
              size={25}
              className="opacity-50"
              color={`${"white"}`}
            />
          </div>
          <p className={"text-white/35"}>Settings</p>
        </div>
      )}
    </Footer>
  );
}
