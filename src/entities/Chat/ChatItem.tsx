import IsAvatarUser from "@/entities/user/ui/IsAvatarUser";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";
import { ItemType } from "./type";
import { Divider } from "antd";

export default memo(function ChatItem({
  id,
  name,
  date,
  avatar,
  text,
}: ItemType) {
  const pathname = useParams();
  const active = pathname?.id === id;
  return (
    <Link href={`/chat/${id}`} className="relative">
      <div
        className={`flex flex-row gap-4 items-center p-4 hover:bg-white/10 ${active && "bg-white/10"} `}
      >
        <IsAvatarUser avatar={avatar} />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between ">
            <h1>{name}</h1>
            <h1>{date}</h1>
          </div>
          <p className="text-gray-500 truncate w-[60%]">You: {text}</p>
        </div>
      </div>
      <Divider
        size="small"
        className="border border-white/10 absolute bottom-0 right-4 "
        style={{ margin: 0 , width: '70%', minWidth: 0}}
      />
    </Link>
  );
});
