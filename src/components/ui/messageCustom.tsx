"use client";
import { useModalUnregistered } from "@/context/modal-unregistered";
import { CommentOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

export default function MessageCustom({
  click,
  num,
  size,
}: {
  click?: () => void;
  num: number;
  size: string;
}) {
  const { openModal } = useModalUnregistered();
  const { data: session } = useSession();

  const content = (
    <div
      onClick={session ? click : openModal}
      className="flex flex-row gap-1 items-center select-none cursor-pointer group"
    >
      <CommentOutlined
        style={{ color: "#9CA3AF", fontSize: `${size}px` }}
        className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-lg"
      />
      <p className="text-[#9CA3AF] text-xs">{num}</p>
    </div>
  );

  return content;
}
