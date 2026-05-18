import { Divider } from "antd";
import { ReactNode } from "react";
import ProfileHeader from "./ProfileHeader";
import { User } from "@/type/type";

type UserBlockProfileProps = {
  postContainer: ReactNode;
  openModal?: () => void;
  data: User | null | undefined;
};

export default function UserBlockProfile({
  postContainer,
  openModal,
  data,
}: UserBlockProfileProps) {
  return (
    <>
      <div className="w-full aspect-[3/1] max-h-[200px] bg-[#3E3E3E]"></div>
      <ProfileHeader data={data} openModal={openModal} />
      <Divider
        size="small"
        className="border border-white/35 m-0"
        style={{ margin: 0 }}
      />
      {postContainer}
    </>
  );
}
