"use client";
import { ReactElement } from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { TbUser, TbUserFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";
import NavButton from "../ui/NavButton";

type LINKTYPE = {
  title: string;
  link: string;
  icon: ReactElement;
  iconFill: ReactElement;
};

const LINK: LINKTYPE[] = [
  {
    title: "Home",
    link: "/",
    icon: <GoHome size={40} color={"white"} title="Главная" />,
    iconFill: <GoHomeFill size={40} color={"white"} title="Главная" />,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: <TbUser size={40} color={"white"} title="Профиль" />,
    iconFill: <TbUserFilled size={40} color={"white"} title="Профиль" />,
  },
];

export default function NavButtonContainer() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-full">
      {LINK.map((el, index) => (
        <NavButton {...el} pathname={pathname} key={index} />
      ))}
    </div>
  );
}
