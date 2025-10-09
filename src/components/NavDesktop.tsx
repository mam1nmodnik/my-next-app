import Link from "next/link";
import { usePostNewContext } from "@/context/post-new-context";

export default function NavDesktop({ pathname }: { pathname: string }) {
  const { showModal } = usePostNewContext();

  return (
    <header className="lg:sticky lg:flex hidden top-0 h-[100px] w-full p-6 text-left flex-row justify-between  gap-4">
      <div className="text-xl flex flex-row items-center gap-4 text-white">
        <Link href="/">Главная</Link>
        <Link href="/profile">Профиль</Link>
        <Link href="/myposts" scroll={false}>
          Мои посты
        </Link>
      </div>
      {pathname == "/myposts" && (
        <button
          type="submit"
          className="rounded-[20px] h-[40px] pr-2 pl-2 text-xl text-white hover:text-blue-400 cursor-pointer"
          onClick={showModal}
        >
          Добавить новый пост +
        </button>
      )}
    </header>
  );
}
