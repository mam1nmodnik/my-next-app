"use client";
import { Divider } from "antd";
import ChatList from "../../entities/Chat/ChatList";

export default function ChatSwitcher() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col m-4 gap-2">
        <h1 className="text-[24px] font-bold">Chat</h1>
        <Divider
          size="small"
          className="border border-white/35"
          style={{ margin: 0 }}
        />
      </div>
      <ChatList />
    </div>
  );
}
