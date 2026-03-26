import { MyButton } from "@/shared/ui/MyButton";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

export default function ChatPage() {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className=" flex flex-col justify-center items-center gap-4">
        <div className="p-4 bg-white/20 rounded-[50%] w-fit ">
          <HiOutlineChatBubbleOvalLeft size={60} width={100} height={100} />
        </div>

        <div className="text-center flex flex-col gap-2">
          <h1 className="font-bold text-[24px]">Start Conversation</h1>
          <p className="text-white/35">
            Choose from your existing conversations, or start a new one.
          </p>
        </div>
        <MyButton className="w-fit p-2 pr-2.5 pl-2.5 bg-white hover:bg-white/85 text-black text-[18px] font-medium rounded-3xl cursor-pointer">
          New chat
        </MyButton>
      </div>
    </div>
  );
}
