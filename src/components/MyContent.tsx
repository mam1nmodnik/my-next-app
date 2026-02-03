"use client";
import { Layout } from "antd";
import { FooterMobile } from "./FooterMobile";
import { usePathname } from "next/navigation";

import React from "react";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { EchoLogo } from "./IU/EchoLogo";
import { LogoutOutlined } from "@ant-design/icons";
export default function MyContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const authcontent = ["/login", "/signup"].includes(pathname);

  return (
    <div>
      <div className="flex flex-row justify-center flex-1 items-stretch h-full w-full gap-4 px-4 md:px-0 max-w-[1280px] mx-auto ">
        {!authcontent && (
          <div className="lg:flex hidden flex-col gap-2 max-w-[260px] w-full mt-5">
            <div className="sticky top-5">
              <Link href="/">
                <div className=" cursor-pointer max-w-[220px] pl-4 hover:bg-white/10 rounded-[45px]">
                  <EchoLogo
                    iconColor="#ffffff"
                    waveColor="#ffffff"
                    textColor="#FFFFFF"
                    size={56}
                    waveCount={2}
                    text="echo"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-2">
                <Link href="/">
                  <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
                    <FiHome
                      size={40}
                      color={"white"}
                      title="Главная"
                      className=""
                    />
                    <p className="text-white text-[18px] font-bold">Home</p>
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
                    <AiOutlineUser size={40} className="" color={"white"} />
                    <p className="text-white text-[18px] font-bold">Profile</p>
                  </div>
                </Link>
                <div
                  className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/login",
                    })
                  }
                >
                  <LogoutOutlined
                    size={40}
                    style={{ color: "white", fontSize: 35 }}
                  />
                  <p className="text-white text-[18px] font-bold">Logout</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-[568px] flex flex-col">
          {!authcontent ? (
            <div className="mb-[100px] md:mb-0">{children}</div>
          ) : (
            <>{children}</>
          )}
        </div>
        {}
        {!authcontent && (
          <div className="text-white max-w-[260px] w-full lg:block hidden  ">
            <div className="sticky top-0">
              <div className="flex flex-col gap-4 mt-5 p-4 ">
                <h1 className="text-xl font-bold ">Trends for you</h1>
                <div className="bg-gray-800 rounded-2xl h-[200px]"></div>
              </div>

              <div className="flex flex-col gap-4 mt-5 p-4">
                <h1 className="text-xl font-bold ">Who to follow</h1>
                <div className="bg-gray-800 rounded-2xl h-[200px]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!authcontent && <FooterMobile pathname={pathname} />}
    </div>
  );
}
