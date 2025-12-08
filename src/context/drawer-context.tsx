import ButtonDrawer from "@/components/IU/ButtonDrawer";
import { Drawer } from "antd";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { FiUsers } from "react-icons/fi";
import { signOut } from "next-auth/react";

type DrawerContextType = {
  showDrawer: () => void;
  onClose: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);
export function DrawerContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(async () => {
    setOpen(true);
  }, []);

  const onClose = useCallback(async () => {
    setOpen(false);
  }, []);

  return (
    <DrawerContext.Provider value={{ showDrawer, onClose }}>
      <Drawer
        title="Меню"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        mask={true}
        classNames={{
          header: "bg-slate-800 text-white",
          body: "bg-slate-800 ",
        }}
        extra={
          <button
            className="lg:hidden block rounded-[20px] h-[40px] pr-2 pl-2  text-white hover:text-blue-400 cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            Выйти
          </button>
        }
      >
        <div className="flex flex-wrap">
          <ButtonDrawer
            label="Пользователи"
            icon={<FiUsers size={40} />}
            link="/users"
          />
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
      "useDrawerContext must be used inside DrawerContextProvider"
    );
  return context;
}
