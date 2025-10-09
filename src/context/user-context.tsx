"use client"; // если используешь Next.js App Router

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

type NameUser = {
  idUser: string;
  nameUser: string;
  emailUser: string;
  telUser: string;
};
type PostsContextType = {
  userName: NameUser;
  getUserLocalStorage: () => NameUser;
};

const UserContext = createContext<PostsContextType | undefined>(undefined);

export function PostsContextProvider({ children }: { children: ReactNode }) {
  const [userName, setNameUser] = useState<NameUser>({
    idUser: "",
    nameUser: "",
    emailUser: "",
    telUser: "",
  });
  
  const getUserLocalStorage = useCallback((): NameUser => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        return { idUser: "", nameUser: "Гость", emailUser: "", telUser: "" };
      }
      const user: NameUser = JSON.parse(raw);
      console.log(user);
      return user;
    } catch (e) {
      console.error("Ошибка парсинга user:", e);
      return { idUser: "", nameUser: "Гость", emailUser: "", telUser: "" };
    }
  }, []);

  useEffect(() => {
    const user = getUserLocalStorage();
    setNameUser(user);
  }, [ getUserLocalStorage]);

  return (
    <UserContext.Provider
      value={{ userName, getUserLocalStorage }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used inside UserContext.Provider"
    );
  }
  return context;
}
