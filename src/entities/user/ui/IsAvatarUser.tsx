import { AiOutlineUser } from "react-icons/ai";
import { Avatar } from "antd";
export default function IsAvatarUser({ avatar, size = 50 }: { avatar: string | null | undefined, size?: number }) {
  return avatar ? (
    <Avatar
      src={avatar}
      alt="avatar"
      className="rounded-4xl h-[70px] w-[70px]"
      size={size}
    />
  ) : (
    <div className="bg-white/13 rounded-[100px] p-2">
      <AiOutlineUser className="text-white" style={{ fontSize: "35px" }} />
    </div>
  );
}
