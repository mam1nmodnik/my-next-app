import { requireApiData } from "@/shared/api/client";
import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useFollowing(id: string) {
  const { isLoading, data , isError, error} = useQuery({
    queryKey: ["following", `${id}`],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch(`/api/user/follow/following/${id}`);
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
