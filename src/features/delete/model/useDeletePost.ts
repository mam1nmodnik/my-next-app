import { useMessageContext } from "@/app/_providers/ui/message-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(id: number) {   
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
  const deletePost = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      openMessage(result);

      if (!response.ok) {
        throw new Error(result?.message ?? "Не удалось удалить пост");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "my"] });
    },
  });
  return {
    deletePost: deletePost.mutate,
    isLoading: deletePost.isPending,
  };
}
