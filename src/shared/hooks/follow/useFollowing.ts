import { FollowType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";

export function useFollowing(login: string) {
  const { isLoading, data } = useQuery({
    queryKey: ["following", `${login}`],
    queryFn: async (): Promise<Array<FollowType>> => {
      const response = await fetch(`/api/user/follow/following/${login}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      return result;
    },
  });
  return {
    data,
    isLoading
  } 
}
