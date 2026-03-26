import { requireApiData } from "@/shared/api/client";
import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useFollowing(login: string) {
  const { isLoading, data , isError, error} = useQuery({
    queryKey: ["following", `${login}`],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch(`/api/user/follow/following/${login}`);
      return requireApiData<FollowType[]>(
        response,
        "Не удалось загрузить подписки",
      );
    },
  });
  return {
    data,
    isLoading,
    isError,
    error
  } 
}
