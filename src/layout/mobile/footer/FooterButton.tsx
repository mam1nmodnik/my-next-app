"use client";
import Link from "next/link";
import { FooterButtonType } from "./type";

export default function FooterButton({
  pathname,
  link,
  text,
  icon,
  click,
}: FooterButtonType) {
  const block = (
    <>
      <div>{icon}</div>
      <p className={`${pathname == link ? "text-white" : "text-white"} `}>
        {text}
      </p>
    </>
  );

  const butLink = link ? (
    <Link
      href={link}
      className={`flex flex-col items-center text-black hover:text-white `}
    >
      {block}
    </Link>
  ) : (
    <div className={`flex flex-col items-center text-black hover:text-white `}>
      {block}
    </div>
  );

  return (
    <div
      className={`flex items-center justify-center p-2 h-fit w-full cursor-pointer rounded-4xl ${
        pathname == link ? "bg-[#3e3e3e] " : "opacity-50 "
      }  `}
      onClick={click && click}
    >
      {butLink}
    </div>
  );
}
