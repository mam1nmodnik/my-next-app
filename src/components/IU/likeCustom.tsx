"use client";
import {  useModalUnregistered } from "@/context/modal-unregistered";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

export default function LikeCustom({
  toggle,
  click,
  num,
  size,
}: {
  toggle: boolean;
  click: () => void;
  num: number;
  size: string;
}) {
  const { openModal } = useModalUnregistered()
  const { data: session } = useSession()

  const content = (
    <div
      onClick={session ? click : openModal}
      className="flex flex-row gap-1 items-center select-none cursor-pointer group"
    >
      {toggle ? (
        <HeartFilled 
          style={{ color: "hotpink", fontSize: `${size}px` }} 
          className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-lg"
        />
      ) : (
        <HeartOutlined 
          style={{ color: "#9CA3AF", fontSize: `${size}px` }} 
          className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:drop-shadow-lg"
        />
      )}
      <p className="text-[#9CA3AF] text-xs">{num}</p>
    </div>
  );

  return (
    content
  );
}
