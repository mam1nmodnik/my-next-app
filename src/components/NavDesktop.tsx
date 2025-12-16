import Link from "next/link";
import { usePostNewContext } from "@/context/post-new-context";
import { signOut, useSession } from "next-auth/react";
import { useDrawerContext } from "@/context/drawer-context";

export default function NavDesktop({ pathname }: { pathname: string }) {
  const { handleCancel } = usePostNewContext();
  const { data: session } = useSession();
  const { showDrawer } = useDrawerContext();

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
          {pathname == "/myposts" && (
            <button
              type="submit"
              className=" h-[40px] pr-2 pl-2 text-xl text-white hover:text-blue-400 cursor-pointer"
              onClick={handleCancel}
            >
              Новый пост +
            </button>
          )}
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
              <span className=" h-[40px] pr-2 pl-2 text-xl text-white hover:text-blue-400 cursor-pointer">
                Войти
              </span>
            </Link>
          )}
        </div>
      </header>
      
    </>
  );
}
