import { AiOutlineUser } from "react-icons/ai";
import { Avatar } from "antd";
export default function IsAvatarUser({ avatar }: { avatar: string | null | undefined }) {
  return avatar ? (
    <Avatar
      src={avatar}
      alt="avatar"
      className="rounded-4xl h-[70px] w-[70px]"
      size={50}
    />
  ) : (
    <div className="bg-white/13 rounded-[100px] p-2">
      <AiOutlineUser className="text-white" style={{ fontSize: "35px" }} />
    </div>
  );
}
