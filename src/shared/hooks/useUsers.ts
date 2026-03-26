import { requireApiData } from "@/shared/api/client";
import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  const { isLoading, data, error, isError  } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch("/api/user/users");
      return requireApiData<FollowType[]>(
        response,
        "Не удалось загрузить пользователей",
      );
    },
  });
  return {
    data,
    isLoading,
    error,
    isError, 
  };
}
