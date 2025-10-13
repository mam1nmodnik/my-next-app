// user-context.tsx
"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@/type/type-post-context";

type UserContextType = {
  userName: User | null;
  setNameUser: React.Dispatch<React.SetStateAction<User | null>>;
  loader: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [userName, setNameUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
      if (session?.user) {
        const userData: User = {
          id: session.user.id || "",
          name: session.user.name || "",
          email: session.user.email || "",
          login: session.user?.login || "",
        };
        setNameUser(userData);
      }
      setTimeout(() => {
        setLoader(false);
    }, 1000);
  }, [session]);

  return (
    <UserContext.Provider value={{ userName, setNameUser, loader }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used inside UserContextProvider");
  return context;
}
