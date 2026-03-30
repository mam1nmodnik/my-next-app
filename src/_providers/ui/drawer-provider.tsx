import { Drawer } from "antd";
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChatbubblesOutline, IoChatbubbles } from "react-icons/io5";

type DrawerContextType = {
  showDrawer: () => void;
  onClose: () => void;
};

type LINKTYPE = {
  title: string;
  link: string;
  icon: ReactElement;
  iconFill: ReactElement;
};

const LINK: LINKTYPE[] = [
  {
    title: "Chat",
    link: "/chat",
    icon: <IoChatbubblesOutline size={40} color={"white"} title="Профиль" />,
    iconFill: <IoChatbubbles size={40} color={"white"} title="Профиль" />,
  },
  // {
  //   title: "Who to follow",
  //   link: "/who-to-follow",
  //   icon: <IoChatbubblesOutline size={40} color={"white"} title="Профиль" />,
  //   iconFill: <IoChatbubbles size={40} color={"white"} title="Профиль" />,
  // },
];
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);
export function DrawerContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const showDrawer = useCallback(async () => {
    setOpen(true);
  }, []);

  const onClose = useCallback(async () => {
    setOpen(false);
  }, []);

  return (
    <DrawerContext.Provider value={{ showDrawer, onClose }}>
      <Drawer
        onClose={onClose}
        open={open}
        closable={false}
        title={
          <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-row items-center justify-center gap-5">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-gray-600/25 transition cursor-pointer"
              >
                ✕
              </button>
              <h1 className="text-white text-[24px]">Меню</h1>
            </div>
            <button
              className="block rounded-[20px] h-[40px] pr-2 pl-2 text-white hover:bg-white/25 hover:text-blue-400 cursor-pointer"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              Выйти
            </button>
          </div>
        }
        mask={true}
        size="large"
        classNames={{
          header: "bg-black text-white",
          body: "bg-black ",
        }}
      >
        <div className="flex flex-wrap  gap-4">
          {LINK.map((el, index) => {
            const isActive =
              el.link === "/" ? pathname === "/" : pathname.startsWith(el.link);
            return (
              <Link key={index} href={el.link} onClick={onClose} scroll={false}>
                <div className="flex flex-row gap-4 items-center cursor-pointer w-fit pt-2 pb-2 pl-4 pr-4 hover:bg-white/10 rounded-[45px]">
                  {isActive ? el.iconFill : el.icon}
                  <p className="text-white text-[18px] font-bold">{el.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Drawer>
      {children}
    </DrawerContext.Provider>
  );
}
export function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context)
    throw new Error(
      "useDrawerContext must be used inside DrawerContextProvider",
    );
  return context;
}
