import { useQuery } from "@tanstack/react-query";
import { Post } from "@/type/type";
import { fetchPosts } from "@/app/entities/post/model/post";

type UsePostsParams = {
    type: "all" | "my" | "user";
    userId?: number;
};

export function usePosts({ type, userId }: UsePostsParams) {
    const queryKey = userId ? ["posts", type, userId] : ["posts", type];
    return useQuery<Post[]>({
        queryKey: queryKey,
        queryFn: () => fetchPosts({ type, userId }),
    });
}
