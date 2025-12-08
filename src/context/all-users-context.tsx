import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type AllUsersType = {
  users: UsersType[];
  Users: () => void
};

const AllUsersContext = createContext<AllUsersType | undefined>(undefined);
type UsersType = {
  id: number;
  login: string;
  avatar: string;
};
export function AllUsersContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UsersType[]>([]);
  const Users = useCallback(async () => {
    const response = await fetch(`/api/users`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Ошибка сервера");
    } else {
      const data = await response.json();
      setUsers(data);
    }
  }, []);
  
  return (
    <AllUsersContext.Provider value={{ users, Users }}>
      {children}
    </AllUsersContext.Provider>
  );
}
export function useAllUsersContext() {
  const context = useContext(AllUsersContext);
  if (!context)
    throw new Error(
      "useAllUsersContext must be used inside AllUsersContextProvider"
    );
  return context;
}
