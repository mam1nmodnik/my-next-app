import Link from "next/link";
import { useModalPostContext } from "@/context/modalPostContext";

export default function NavDesktop({ pathname }: { pathname: string }) {
  const { showModal } = useModalPostContext();

  return (
    <header className="lg:sticky lg:flex hidden top-0 h-fit w-full p-6 text-left flex-row justify-between  gap-4">
      <div className="text-xl flex flex-row items-center gap-4 text-white">
        <Link href="/">Главная</Link>
        <Link href="/profile">Профиль</Link>
        <Link href="/myposts" scroll={false}>
          Мои посты
        </Link>
      </div>
      {pathname == "/myposts" && (
        <button
          className="rounded-[10px] lg:rounded-[20px] w-fit p-2 text-xl font-medium text-black glass"
          onClick={showModal}
        >
          Добавить новый пост +
        </button>
      )}
    </header>
  );
}
