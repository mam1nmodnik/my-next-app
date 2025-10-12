"use client";
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { LiaBookOpenSolid } from "react-icons/lia";

import { Layout } from "antd";
import Link from "next/link";
import { usePostNewContext } from "@/context/post-new-context";

const { Footer } = Layout;
export function FooterMobile({ pathname }: { pathname: string }) {
  const { showModal } = usePostNewContext();
  function openWindowPost() {
    setTimeout(() => {
      return showModal();
    }, 200);
  }
  return (
    <Footer
      style={{ textAlign: "center" }}
      className="lg:hidden flex items-center justify-between w-full  fixed bottom-0"
    >
      <ul className="lg:hidden flex flex-row items-center   glass w-full">
        <li
          className={`flex flex-col items-center justify-center  p-1 h-fit w-full rounded-3xl cursor-pointer  ${
            pathname == "/" ? "text-white" : "text-black"
          }  `}
        >
          <Link href="/" className={`flex flex-col items-center `}>
            <FiHome
              size={30}
              color={`${pathname == "/" ? "white" : "black"}`}
            />
          </Link>
          Главная
        </li>
        <li
          className={`flex flex-col items-center justify-center  p-1 h-fit w-full rounded-3xl cursor-pointer  ${
            pathname == "/profile" ? "text-white" : "text-black"
          }  `}
        >
          <Link href="/profile" className="flex flex-col items-center">
            <AiOutlineUser
              size={30}
              className=""
              color={`${pathname == "/profile" ? "white" : "black"}`}
            />
          </Link>
          Профиль
        </li>
        <li
          className={`flex flex-col items-center justify-center  p-1 h-fit w-full rounded-3xl  cursor-pointer  ${
            pathname == "/myposts" ? "text-white" : "text-black"
          }  `}
        >
          <Link href="/myposts" className="flex flex-col items-center">
            <LiaBookOpenSolid
              size={30}
              className=""
              color={`${pathname == "/myposts" ? "white" : "black"}`}
            />
          </Link>
          Посты
        </li>
        <li className={`flex flex-col items-center justify-center  p-1 h-fit w-full rounded-3xl text-black hover:text-gray active:text-white cursor-pointer `}>
          {pathname == "/myposts" ? (
            <AiOutlineEdit size={30} onClick={showModal} color="black"/>
          ) : (
            <Link href="/myposts" className="flex items-center text-black  ">
              <AiOutlineEdit size={30} onClick={openWindowPost} color=" black" />
            </Link>
          )}
          Новый пост
        </li>
      </ul>
    </Footer>
  );
}
