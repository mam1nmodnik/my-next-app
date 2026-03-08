"use client";

import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import FooterButton from "./FooterButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function FooterContainer() {
  const pathname = usePathname();
  const { status: session } = useSession();

  const btn = [
    {
      link: "/",
      text: "Home",
      icon: <FiHome size={25} color={`${ 'white' }`} title="Home" />,
    },
    {
      link: "/profile",
      text: "Profile",
      icon: <AiOutlineUser size={25} className="" color={`${ 'white' }`} />,
    },
  ];

  return (
    <div className="lg:hidden flex gap-2 flex-row items-center justify-center w-[60%] rounded-4xl glass">
      {btn.map((el, index) => (
        <FooterButton
          key={index}
          pathname={pathname}
          link={el.link}
          text={el.text}
          icon={el.icon}
        />
      ))}
      {!session && (
        <div
          className={`flex items-center justify-center p-2 h-fit w-full rounded-[50px] cursor-pointer  `}
        >
          <Link
            href="/login"
            className="flex items-center text-white text-[16px] "
          >
            Войти
          </Link>
        </div>
      )}
    </div>
  );
}
