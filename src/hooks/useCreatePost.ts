import { useMessageContext } from "@/context/message-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function useCreatePost( 
) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
  const { data: session } = useSession();

  const data = {
    id: session?.user.id,
    content: content,
  };

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/posts/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      openMessage(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    createPost: createPostMutation.mutate,
    content,
    setContent,
    isLoading: createPostMutation.isPending,
  };
}