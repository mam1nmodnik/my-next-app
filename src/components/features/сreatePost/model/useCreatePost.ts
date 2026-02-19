import { useMessageContext } from "@/app/_providers/ui/message-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCreatePost( 
) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const res = await response.json();
      openMessage(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  
   const createPost = () => {
    
    createPostMutation.mutate()
   }

  return {
    createPost: createPost,
    content,
    setContent,
    isLoading: createPostMutation.isPending,
  };
}