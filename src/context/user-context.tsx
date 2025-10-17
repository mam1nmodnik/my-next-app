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
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  inputValue: User | null;
  setInputValue: React.Dispatch<React.SetStateAction<User | null>>;
  saveChanges: () => void
};




const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [userName, setNameUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState<User | null>(null);
 
  useEffect(() => {
    if (session?.user) {
      const userData: User = {
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        login: session.user?.login || "",
        avatar: session.user?.image || "",
      };
      setNameUser(userData);
      setInputValue(userData);
    }
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [session]);
  async function saveChanges() {
    if (inputValue) {
      const data = {
        id: Number(userName?.id),
        name: inputValue.name,
        email: inputValue.email,
        login: inputValue.login,
      };

      try {
       const res = await fetch("/api/user/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

         if (res.ok) {
          const response = await res.json()
          setNameUser(inputValue);
          setEdit(false);
          console.log(response)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <UserContext.Provider value={{ userName, setNameUser, loader, edit, setEdit, inputValue, setInputValue, saveChanges }}>
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
