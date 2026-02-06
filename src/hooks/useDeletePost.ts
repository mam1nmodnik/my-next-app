import { useMessageContext } from "@/context/message-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeletePost(id: number) {   

 const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
   const deletePost = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/delete-post/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      openMessage(res);
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