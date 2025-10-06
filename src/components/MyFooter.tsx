"use client";
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { LiaBookOpenSolid } from "react-icons/lia";

import { Layout } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModalPostContext } from "@/context/modalPostContext";

const { Footer } = Layout;
export function MyFooter() {
  const pathname = usePathname();
  const { showModal } = useModalPostContext();
  function openWindowPost() {
    setTimeout(() => {
      return showModal();
    }, 200);
  }
  return (
    <Footer
      style={{ textAlign: "center" }}
      className="lg:hidden flex items-center justify-center w-full lg:w-[60%] fixed bottom-0"
    >
      <ul className="lg:hidden flex flex-row items-center   glass w-full">
        <li className="flex items-center justify-center  p-1 h-fit w-full rounded-3xl ">
          <Link href="/">
            <FiHome
              size={45}
              color={`${pathname == "/" ? "white" : "black"}`}
            />
          </Link>
        </li>
        <li className="flex items-center justify-center p-2 w-full rounded-3xl  ">
          <Link href="/profile" className=" items-center">
            <AiOutlineUser
              size={45}
              className=""
              color={`${pathname == "/profile" ? "white" : "black"}`}
            />
          </Link>
        </li>
        <li className="flex items-center justify-center p-2 rounded-2xl w-full ">
          <Link href="/myposts" className="flex items-center text-black  ">
            <LiaBookOpenSolid
              size={45}
              className=""
              color={`${pathname == "/myposts" ? "white" : "black"}`}
            />
          </Link>
        </li>
        <li className="flex items-center justify-center p-2 w-full rounded-3xl">
          {pathname == "/myposts" ? (
            <AiOutlineEdit size={45} onClick={showModal} color='black'/>
          ) : (
            <Link href="/myposts" className="flex items-center text-black  ">
              <AiOutlineEdit size={45} onClick={openWindowPost} color='black'/>
            </Link>
            
          )}
        </li>
      </ul>
    </Footer>
  );
}
