"use client";
import { AiOutlineUser } from "react-icons/ai";
import { FiHome, FiMenu } from "react-icons/fi";
import { LiaBookOpenSolid } from "react-icons/lia";

import { Layout } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useDrawerContext } from "@/context/drawer-context";

const { Footer } = Layout;
export function FooterMobile({ pathname }: { pathname: string }) {
  const { data: session } = useSession();
  const { showDrawer } = useDrawerContext();

  return (
    <Footer
      style={{ textAlign: "center" }}
      className="flex justify-center w-full fixed bottom-4"
    >
      <ul className="lg:hidden flex gap-2 flex-row items-center justify-center glass w-[93%] rounded-4xl  p-1">
        <li
          className={`flex flex-col items-center justify-center p-2 h-fit w-full rounded-4xl cursor-pointer   ${
            pathname == "/" ? "text-white bg-gray-800 ": "text-black"
          }  `}
        >
          <Link href="/" className={`flex flex-col items-center text-black hover:text-white `}>
            <FiHome
              size={30}
              color={`${pathname == "/" ? "white" : "black "}`}
              title="Главная"
              className=""
            />
          </Link>
          Главная
        </li>
        <li
          className={`flex flex-col items-center justify-center  p-2 h-fit w-full rounded-4xl cursor-pointer  ${
            pathname == "/profile" ? "text-white bg-gray-800" : "text-black"
          }  `}
        >
          <Link href="/profile" className="flex flex-col items-center hover:bg-white">
            <AiOutlineUser
              size={30}
              className=""
              color={`${pathname == "/profile" ? "white" : "black"} `}
            />
          </Link>
          Профиль
        </li>
        {!session && (
          <li
            className={`flex flex-col items-center justify-center  p-1 h-fit w-full rounded-3xl text-black hover:text-gray active:text-white cursor-pointer `}
          >
            <Link
              href="/login"
              className="flex items-center text-black text-[16px] "
            >
              Войти
            </Link>
          </li>
        )}
      </ul>
    </Footer>
  );
}
