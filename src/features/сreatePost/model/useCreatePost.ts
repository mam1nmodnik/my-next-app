import { useMessageContext } from "@/app/_providers/ui/message-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCreatePost( 
) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
  const [loadBtn, setLoadBtn] = useState(false)
  const createPostMutation = useMutation({
    
    mutationFn: async () => {
      
      const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const res = await response.json();
      openMessage(res);
      setLoadBtn(el => !el)
      setContent('')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  
   const createPost = () => {
    setLoadBtn(el => !el)
    createPostMutation.mutate()
   }

  return {
    createPost: createPost,
    content,
    setContent,
    loadBtn,
    isLoading: createPostMutation.isPending,
  };
}