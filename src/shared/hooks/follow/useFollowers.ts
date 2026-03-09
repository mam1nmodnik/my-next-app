import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useFollowers(login: string) {
  const { isLoading, data } = useQuery({
    queryKey: ["followers", `${login}`],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch(`/api/user/follow/followers/${login}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      return result;
    },
  });
  return {
    data,
    isLoading,
  };
}
