"use client";
import { createContext, useContext, ReactNode } from "react";
import { User } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import MyLoader from "@/shared/ui/MyLoader";
import { useSession } from "next-auth/react";

type UserContextType = {
  dataUser: User | null;
  isLoadingUser: boolean;
  errorUser: Error | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const { isLoading, error, data } = useQuery({
    queryKey: ["this-user"],
    queryFn: async (): Promise<User> => {
      const response = await fetch("/api/user/this-user");
      if (!response.ok) throw new Error("Unauthorized");
      return response.json();
    },
    enabled: !!session?.user, 
    retry: false,
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MyLoader />
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        dataUser: session && (data as User)  ,
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
