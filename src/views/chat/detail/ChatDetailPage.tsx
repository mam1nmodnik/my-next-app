"use client";

import { useParams } from "next/navigation";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <div className="p-4 bg-white/20 rounded-[50%] w-fit ">
          <HiOutlineChatBubbleOvalLeft size={56} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-[24px]">Conversation {id}</h1>
          <p className="text-white/35 max-w-[360px]">
            The detail view for this chat is not wired up yet, but the route
            now renders an explicit conversation state instead of a raw id.
          </p>
        </div>
      </div>
    </div>
  );
}
