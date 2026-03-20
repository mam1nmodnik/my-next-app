"use client";
import Link from "next/link";
import { ReactElement } from "react";

type props = {
  title: string;
  link: string;
  active: boolean;
  icon: ReactElement;
  iconFill: ReactElement;
  isChat: boolean;
};

export default function NavButton({
  title,
  link,
  active,
  icon,
  iconFill,
  isChat,
}: props) {
  return (
    <Link href={link}>
      <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
        {active ? iconFill : icon}
        {!isChat && (
          <p className="text-white text-[18px] font-bold xl:block hidden">
            {title}
          </p>
        )}
      </div>
    </Link>
  );
}
