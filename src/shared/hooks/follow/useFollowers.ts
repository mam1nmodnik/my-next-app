import { requireApiData } from "@/shared/api/client";
import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useFollowers(login: string) {
  const { isLoading, data , isError, error} = useQuery({
    queryKey: ["followers", `${login}`],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch(`/api/user/follow/followers/${login}`);
      return requireApiData<FollowType[]>(
        response,
        "Не удалось загрузить подписчиков",
      );
    },
  });
  return {
    data,
    isLoading,
    isError,
    error
  };
}
