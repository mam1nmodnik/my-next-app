import { TbUser, TbUserFilled } from "react-icons/tb";
import { LogoutOutlined } from "@ant-design/icons";
import { GoHome, GoHomeFill } from "react-icons/go";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { EchoLogo } from "../ui/EchoLogo";
import { usePathname } from "next/navigation";
export default function AsideLeft() {
  const pathname = usePathname();

  return (
    <>
      <div className="lg:flex hidden flex-col gap-2 max-w-[260px] max-h-screen h-full w-full mt-5">
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
    </>
  );
}
