import { TbUser, TbUserFilled } from "react-icons/tb";
import { GoHome, GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { EchoLogo } from "../ui/EchoLogo";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/user-context";
import UserIdentity from "../ui/UserIdentity";
export default function AsideLeft() {
  const pathname = usePathname();
  const { dataUser, isLoadingUser } = useUserContext();


  return (
    <>
      <div className="lg:flex hidden flex-col justify-between gap-2 max-w-[260px] w-full mt-5 relative">
        <div className="fixed top-5 flex flex-col ">
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
                {pathname === "/" ? (
                  <GoHomeFill size={40} color={"white"} title="Главная" />
                ) : (
                  <GoHome size={40} color={"white"} title="Главная" />
                )}
                <p className="text-white text-[18px] font-bold">Home</p>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
                {pathname === "/profile" ? (
                  <TbUserFilled size={40} color={"white"} title="Профиль" />
                ) : (
                  <TbUser size={40} color={"white"} title="Профиль" />
                )}

                <p className="text-white text-[18px] font-bold">Profile</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="fixed bottom-5 "> 
          <UserIdentity avatar={dataUser?.avatar} login={dataUser?.login} name={dataUser?.name}/>
        </div>
      </div>
    </>
  );
}
