"use client";

import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import FooterButton from "./FooterButton";


export default function FooterContainer() {
  const pathname = usePathname();

  const btn = [
    {
      link: "/",
      text: "Home",
      icon: <FiHome size={25} color={`${"white"}`} title="Home" />,
    },
    {
      link: "/profile",
      text: "Profile",
      icon: <AiOutlineUser size={25} className="" color={`${"white"}`} />,
    },
  ];

  return (
    <div className=" flex gap-2 flex-row items-center justify-center w-[60%] rounded-4xl glass">
      {btn.map((el, index) => (
        <FooterButton
          key={index}
          pathname={pathname}
          link={el.link}
          text={el.text}
          icon={el.icon}
        />
      ))}
    </div>
  );
}
