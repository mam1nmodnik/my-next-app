import { useQuery } from "@tanstack/react-query";

type UserWithFollowInfo = {
  id: number;
  login: string;
  name: string | null;
  avatar: string | null;
  avatarPublicId: string | null;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  isFollowedByMe: boolean;
};
export function useUsers() {
     const { isLoading, data } = useQuery({
        queryKey: ["users"],
        queryFn: async (): Promise<Array<UserWithFollowInfo>> => {
          const response = await fetch("/api/user/users");
          const result = await response.json();
          return result;
        },
      });
    return (
        {
           data: data, 
           isLoading: isLoading    
        }
    )
}