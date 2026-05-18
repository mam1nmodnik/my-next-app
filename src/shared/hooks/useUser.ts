
import { requireApiData } from "@/shared/api/client";
import { User } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useUser() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, data, error, isError } = useQuery<User, Error>({
    queryKey: ["user", id],
    enabled: Boolean(id),
    queryFn: async (): Promise<User> => {
      const response = await fetch(`/api/user/user/${id}`);
      return requireApiData<User>(response, "Не удалось загрузить профиль");
    },
  });

  return {
    isLoading,
    data,
    error,
    isError,
  };
}
