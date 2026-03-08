import { Divider } from "antd";
import ProfilePost from "../post/container/MyPostContainer";
import IsUserProfilInfoContainer from "./container/IsUserProfilInfoContainer";
import { Post } from "@/type/type";
import { ReactNode } from "react";
import { useUserContext } from "@/app/_providers/infra/user-provider";

type UserBlockProfileProps = {
  onEditProfile: () => void;
  renderPostActions?: (post: Post) => ReactNode;
  renderPostMenu?: (post: Post) => ReactNode;
};

export default function UserBlockProfile({
  onEditProfile,
  renderPostActions,
  renderPostMenu,
}: UserBlockProfileProps) {
  const { dataUser } = useUserContext();
  return (
    <div className="w-full flex justify-center h-full min-h-screen">
      <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45">
        <div className="w-full aspect-[3/1] max-h-[200px] bg-[#3E3E3E]" />

        <IsUserProfilInfoContainer onEditProfile={onEditProfile} dataUser={dataUser} />
        <Divider
          size="small"
          className="border border-white/35 m-0"
          style={{ margin: 0 }}
        />
        <ProfilePost
          renderActions={renderPostActions}
          renderMenu={renderPostMenu}
        />
      </div>
    </div>
  );
}
