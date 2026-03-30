import { requireApiData } from "@/shared/api/client";
import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useFollowers(id: string) {
  const { isLoading, data , isError, error} = useQuery({
    queryKey: ["followers", `${id}`],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch(`/api/user/follow/followers/${id}`);
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
