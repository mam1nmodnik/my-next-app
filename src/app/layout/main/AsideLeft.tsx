"use client";
import Link from "next/link";
import { EchoLogo } from "../../../shared/ui/EchoLogo";
import { useUserContext } from "@/app/_providers/infra/user-provider";
import UserIdentity from "@/entities/user/UserIdentity";
import NavButtonContainer from "@/entities/nav/continer/NavButtonContaier";

export default function AsideLeft() {
  const { dataUser } = useUserContext();

  return (
    <>
      <div className=" hidden lg:flex flex-col justify-between gap-2 xl:max-w-[260px] xl:w-full w-[120px] mt-5 ml-6 relative items-center">
        <div className="fixed top-5 flex flex-col xl:max-w-[220px] xl:w-full w-fit xl:mr-0 mr-3  ">
          <Link href="/">
            <div className="xl:block hidden cursor-pointer pl-4 hover:bg-white/10 rounded-[45px]">
              <EchoLogo
                iconColor="#ffffff"
                waveColor="#ffffff"
                textColor="#FFFFFF"
                size={56}
                waveCount={2}
                text="echo"
              />
            </div>
            <div className="xl:hidden block cursor-pointer  w-[90px] pl-4 hover:bg-white/10 rounded-[45px]">
              <EchoLogo
                iconColor="#ffffff"
                waveColor="#ffffff"
                textColor="#FFFFFF"
                size={56}
                waveCount={2}
              />
            </div>
          </Link>
          <NavButtonContainer />
        </div>

        <UserIdentity
          avatar={dataUser?.avatar}
          login={dataUser?.login}
          name={dataUser?.name}
        />
      </div>
    </>
  );
}
