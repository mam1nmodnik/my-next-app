"use client";

import { requireApiData } from "@/shared/api/client";
import ErrorResponse from "@/shared/ui/ErrorResponse";
import MyLoader from "@/shared/ui/MyLoader";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

export default function PostChatPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { isLoading, error } = useQuery({
    queryKey: ["post-chat", id],
    enabled: Boolean(id),
    queryFn: async (): Promise<unknown> => {
      const response = await fetch(`/api/posts/chat/${id}`);
      return requireApiData(response, "Не удалось загрузить комментарии");
    },
  });

  if (!id) {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px]">
        <p className="text-white/60 text-center">Пост не найден</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px]">
        <MyLoader size={32} />
      </div>
    );
  }

  if (error instanceof Error) {
    return <ErrorResponse title="Post chat" error={error} />;
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <div className="p-4 bg-white/20 rounded-[50%] w-fit ">
          <HiOutlineChatBubbleOvalLeft size={56} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-[24px]">Post chat {id}</h1>
          <p className="text-white/35 max-w-[360px]">
            The route no longer renders a blank state after loading. The detail
            UI for post comments still needs to be implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
