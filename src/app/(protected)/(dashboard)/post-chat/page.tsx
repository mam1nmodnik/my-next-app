"use client";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function PostChat() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { isLoading, error, data } = useQuery({
    queryKey: ["post-chat", id],
    queryFn: async (): Promise<Post> => {
      const response = await fetch(`/api/post-chat/${id}`);
      return await response.json();
    },
  });

  if (isLoading) {
    return <p>загрузка</p>;
  }

  if (error) return "An error has occurred: " + error.message;

  return <div>

    
  </div>;
}
