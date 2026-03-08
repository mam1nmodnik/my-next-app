"use client";
import Link from "next/link";
import { FooterButtonType } from "./type";

export default function FooterButton({
  pathname,
  link,
  text,
  icon,
}: FooterButtonType) {
  return (
    <div
      className={`flex items-center justify-center p-2 h-fit w-full cursor-pointer rounded-4xl ${
        pathname == link ? 'bg-[#3e3e3e] ' : "opacity-50 "
      }  `}
    >
      <Link
        href={link}
        className={`flex flex-col items-center text-black hover:text-white `}
      >
        {icon}
        <p className={`${pathname == link ? "text-white" : "text-white"} `}>
          {text}
        </p>
      </Link>
    </div>
  );
}
