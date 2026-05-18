import { useMessageContext } from "@/_providers/ui/message-provider";
import { getApiErrorResponse, requireApiResponse } from "@/shared/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(id: number) {   
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
  const deletePost = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
      });
      return requireApiResponse<{ id: number }>(
        response,
        "Не удалось удалить пост",
      );
    },
    onSuccess: (response) => {
      openMessage(response);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      openMessage(getApiErrorResponse(error, "Не удалось удалить пост"));
    },
  });
  return {
    deletePost: deletePost.mutate,
    isLoading: deletePost.isPending,
  };
}
