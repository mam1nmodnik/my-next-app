import { useMessageContext } from "@/_providers/ui/message-provider";
import { getApiErrorResponse, requireApiResponse } from "@/shared/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCreatePost() {
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

      return requireApiResponse(response, "Не удалось создать пост");
    },
    onSuccess: (response) => {
      openMessage(response);
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      openMessage(getApiErrorResponse(error, "Не удалось создать пост"));
    },
  });

  const createPost = () => {
    createPostMutation.mutate();
  };

  return {
    createPost,
    content,
    setContent,
    loadBtn: createPostMutation.isPending,
    isLoading: createPostMutation.isPending,
  };
}
