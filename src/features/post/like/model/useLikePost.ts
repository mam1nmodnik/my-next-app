import { useMessageContext } from "@/_providers/ui/message-provider";
import { getApiErrorResponse, requireApiResponse } from "@/shared/api/client";
import { Post } from "@/type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLikePost(
  postId: number,
) {
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      return requireApiResponse<{ post: Post; liked: boolean }>(
        res,
        "Не удалось изменить лайк",
      );
    },

    onSuccess: async (response) => {
      openMessage(response);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      openMessage(getApiErrorResponse(error, "Не удалось изменить лайк"));
    },
  });

  return {
    like: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
