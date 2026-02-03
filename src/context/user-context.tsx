"use client";
import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { User } from "@/type/type";
import {  useQuery } from "@tanstack/react-query";

type UserContextType = {
  dataUser: User | undefined;
  isLoadingUser: boolean
  errorUser: Error | null
};


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {

  const { isLoading, error, data } = useQuery({
    queryKey: ["this-user"],
    queryFn: async (): Promise<User> => {
      const response = await fetch("/api/user/this-user");
      const result = await response.json()
      return result;
    },
  });
  return (
    <UserContext.Provider
      value={{
        dataUser: data,
        isLoadingUser: isLoading,
        errorUser: error,
        
      }}
    >
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
