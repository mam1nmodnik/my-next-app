"use client";
import { MyButton } from "@/shared/ui/MyButton";
import { User } from "@/type/type";
import FollowContainer from "@/features/follow/container/FollowContainer";
import AvatarUser from "../ui/AvatarUser";
import InfoProfile from "./InfoProfile";

export default function ProfileHeader({
  data,
  openModal,
}: {
  data?: User | null;
  openModal?: () => void;
}) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-end mt-[-17%]">
        <AvatarUser avatar={data?.avatar} size={110} sizeNoAvatar={90} />
        {openModal ? (
          <MyButton
            onClick={openModal}
            className="text-white border-[0.5px] border-white rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-800 text-l"
          >
            Edit profile
          </MyButton>
        ) : (
          <FollowContainer
            userId={data?.id}
            isFollowedByMe={data?.isFollowedByMe ?? false}
          />
        )}
      </div>
      <InfoProfile
        login={data?.login}
        id={data?.id}
        name={data?.name}
        bio={data?.bio}
        _count={data?._count}
      />
    </div>
  );
}
