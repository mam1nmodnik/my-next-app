"use client";
import Link from "next/link";
import { EchoLogo } from "../../../shared/ui/EchoLogo";
import { useUserContext } from "@/app/_providers/infra/user-provider";
import UserIdentity from "@/entities/user/UserIdentity";
import NavButtonContainer from "@/entities/nav/continer/NavButtonContaier";
import { User } from "@/type/type";

export default function Header({ isChat }: { isChat: boolean }) {
  const { dataUser }: { dataUser: User | null } = useUserContext();

  return (
    <>
      <header className="hidden lg:flex flex-col justify-between gap-2 w-fit mt-5 ml-6 mr-4 relative items-center">
        <div className=" top-5 flex flex-col w-fit xl:mr-0 mr-3  ">
          <Link href="/">
            <div
              className={`xl:block hidden cursor-pointer ${isChat ? "w-[90px]" : " md:w-full w-[90px] "} pl-4 hover:bg-white/10 rounded-[45px]`}
            >
              <EchoLogo
                iconColor="#ffffff"
                waveColor="#ffffff"
                textColor="#FFFFFF"
                size={56}
                waveCount={2}
                text={!isChat ? "echo" : undefined}
              />
            </div>
            <div className="xl:hidden block cursor-pointer w-[90px] pl-4 hover:bg-white/10 rounded-[45px]">
              <EchoLogo
                iconColor="#ffffff"
                waveColor="#ffffff"
                textColor="#FFFFFF"
                size={56}
                waveCount={2}
              />
            </div>
          </Link>
          <NavButtonContainer isChat={isChat} />
        </div>

        <UserIdentity
          avatar={dataUser?.avatar}
          login={dataUser?.login}
          name={dataUser?.name}
          isChat={isChat}
        />
      </header>
    </>
  );
}
