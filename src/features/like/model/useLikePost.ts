import { Post } from "@/type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLikePost(
  postId: number,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      if(res.status === 500){
        return console.error(res.statusText)
      }
      return res.json() as Promise<{ post: Post; liked: boolean }>;
    },

    onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    like: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
