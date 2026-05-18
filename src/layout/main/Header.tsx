"use client";
import Link from "next/link";
import UserIdentity from "./UserIdentity";
import NavButtonContainer from "@/entities/nav/container/NavButtonContainer";
import { User } from "@/type/type";
import { EchoLogo } from "@/shared/ui/EchoLogo";
import { useUserContext } from "@/_providers/infra/user-provider";

export default function Header({ isChat }: { isChat: boolean }) {
  const { dataUser }: { dataUser: User | null } = useUserContext();
  return (
    <>
      <header className="hidden lg:flex flex-col gap-2 justify-between w-fit max-h-screen pt-5 pb-5 pl-6 mr-4 sticky top-0">
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
          id={dataUser?.id}
        />
      </header>
    </>
  );
}
