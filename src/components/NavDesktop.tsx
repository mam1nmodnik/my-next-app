import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useDrawerContext } from "@/context/drawer-context";
import { MyButton } from "./IU/MyButton";
import { usePathname } from "next/navigation";

export default function NavDesktop() {
  const { data: session } = useSession();
  const { showDrawer } = useDrawerContext();
  const pathname = usePathname();
  return (
    <>
      <header className="lg:flex hidden top-0 h-[100px] w-full p-6 text-left flex-row items-center justify-between  gap-4">
        <div className="text-xl flex flex-row items-center gap-4 text-white">
          <Link href="/">
            <span
              className={`${
                pathname == "/"
                  ? "text-gray-500"
                  : "text-white hover:text-blue-400"
              }`}
            >
              Главная
            </span>
          </Link>
          <Link href="/profile">
            <span
              className={`${
                pathname == "/profile"
                  ? "text-gray-500"
                  : "text-white hover:text-blue-400"
              }`}
            >
              Профиль
            </span>
          </Link>
          <Link href="/myposts" scroll={false}>
            <span
              className={`${
                pathname == "/myposts"
                  ? "text-gray-500"
                  : "text-white hover:text-blue-400"
              }`}
            >
              Мои посты
            </span>
          </Link>
          {session && (
            <button
              type="submit"
              className={` hover:text-blue-400 cursor-pointer`}
              onClick={showDrawer}
            >
              Меню
            </button>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {session && (
            <button
              className=" h-[40px] pr-2 pl-2 text-xl text-white hover:text-blue-400 cursor-pointer"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              Выйти
            </button>
          )}
          {!session && (
            <Link href="/login" scroll={false}>
              <MyButton className=" h-[40px] pr-2 pl-2 text-xl text-white hover:text-blue-400 cursor-pointer">
                Войти
              </MyButton>
            </Link>
          )}
        </div>
      </header>
      
    </>
  );
}
