import { useQuery } from "@tanstack/react-query";
import { Post } from "@/type/type";
import { fetchPosts } from "./post";

type UsePostsParams = {
  type: "all" | "my" | "user";
  userId?: number;
  enabled?: boolean;
};

export function usePosts({ type, userId, enabled = true }: UsePostsParams) {
  const queryKey = userId ? ["posts", type, userId] : ["posts", type];
  
  return useQuery<Post[]>({
    queryKey,
    queryFn: () => fetchPosts({ type, userId }),
    enabled,
  });
}
