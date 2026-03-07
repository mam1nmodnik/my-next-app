"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function PostChat() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { isLoading, error } = useQuery({
    queryKey: ["post-chat", id],
    enabled: Boolean(id),
    queryFn: async (): Promise<unknown> => {
      const response = await fetch(`/api/posts/chat/${id}`);
      if (!response.ok) {
        throw new Error("Не удалось загрузить комментарии");
      }
      return await response.json();
    },
  });

  if (!id) {
    return <p>Пост не найден</p>;
  }

  if (isLoading) {
    return <p>загрузка</p>;
  }

  if (error) return "An error has occurred: " + error.message;

  return <div></div>;
}
