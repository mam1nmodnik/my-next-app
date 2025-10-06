"use client";
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai";

import { Layout } from "antd";
import Link from "next/link";

const { Footer } = Layout;
export function MyFooter() {
  return (
    <Footer
      style={{ textAlign: "center" }}
      className="lg:hidden flex items-center justify-center w-full lg:w-[60%] p-0 fixed bottom-0"
    >
      <ul className="lg:hidden flex flex-row gap-5 text-center items-center">
        <li className="md:text-xl text-l glass p-2 w-fit rounded-2xl">
          <Link href="/">Главная</Link>
        </li>
        <li className=" flex items-center active:p-1.5 p-2 h-fit min-w-[53px] rounded-3xl glass ">
          <Link href="/profile" className="flex items-center">
            <AiOutlineUser size={40} className=""/>
          </Link>
        </li>
        <li className="md:text-xl text-l glass p-2 rounded-2xl">Мои посты</li>
        <li className="flex items-center md:p-2 p-2 h-fit min-w-[53px] rounded-3xl glass">
          <AiOutlineEdit size={40} />
        </li>
      </ul>
    </Footer>
  );
}
