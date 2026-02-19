import { TbUser, TbUserFilled } from "react-icons/tb";
import { GoHome, GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { EchoLogo } from "../../../shared/ui/EchoLogo";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/app/_providers/infra/user-provider";
import UserIdentity from "@/app/entities/user/UserIdentity";
export default function AsideLeft() {
  const pathname = usePathname();
  const { dataUser } = useUserContext();

  return (
    <>
      <div className=" hidden lg:flex flex-col justify-between gap-2 xl:max-w-[260px] xl:w-full w-[120px] mt-5 relative">
        <div className="fixed top-5 flex flex-col  xl:max-w-[220px] xl:w-full w-[200px] xl:mr-0 mr-3">
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
          <div className="flex flex-col gap-2 w-full">
            <Link href="/">
              <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
                <div className="">
                  {pathname === "/" ? (
                    <GoHomeFill size={40} color={"white"} title="Главная" />
                  ) : (
                    <GoHome size={40} color={"white"} title="Главная" />
                  )}
                </div>
                <p className="text-white text-[18px] font-bold xl:block hidden">
                  Home
                </p>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
                {pathname === "/profile" ? (
                  <TbUserFilled size={40} color={"white"} title="Профиль" />
                ) : (
                  <TbUser size={40} color={"white"} title="Профиль" />
                )}

                <p className="text-white text-[18px] font-bold xl:block hidden">
                  Profile
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="fixed bottom-5 ">
          <UserIdentity
            avatar={dataUser?.avatar}
            login={dataUser?.login}
            name={dataUser?.name}
          />
        </div>
      </div>
    </>
  );
}
