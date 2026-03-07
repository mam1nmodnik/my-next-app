import { useMessageContext } from "@/app/_providers/ui/message-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type PostApiResponse = {
  notice?: "success" | "error" | "info" | "warning";
  message?: string;
};

export function useCreatePost() {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
  const createPostMutation = useMutation({
    mutationFn: async (): Promise<PostApiResponse> => {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const result = (await response.json()) as PostApiResponse;
      if (!response.ok) {
        throw result;
      }
      return result;
    },
    onSuccess: (response) => {
      openMessage({
        notice: response.notice,
        message: response.message ?? "Пост успешно создан",
      });
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      const response = error as PostApiResponse;
      openMessage({
        notice: response.notice ?? "error",
        message: response.message ?? "Не удалось создать пост",
      });
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
