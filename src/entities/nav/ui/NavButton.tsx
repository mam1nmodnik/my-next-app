'use client'
import Link from "next/link";
import { ReactElement } from "react";

type props = {
  title: string;
  link: string;
  pathname: string;
  icon: ReactElement;
  iconFill: ReactElement;
};

export default function NuvButton({
  title,
  link,
  pathname,
  icon,
  iconFill,
}: props) {
  return (
    <Link href={link}>
      <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
        {pathname === link ? iconFill : icon}
        <p className="text-white text-[18px] font-bold xl:block hidden">
          {title}
        </p>
      </div>
    </Link>
  );
}
