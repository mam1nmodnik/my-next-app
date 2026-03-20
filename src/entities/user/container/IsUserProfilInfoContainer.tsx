"use client";
import IsAvatarUser from "../ui/IsAvatarUser";
import { MyButton } from "@/shared/ui/MyButton";
import InfoProfileUser from "../ui/isInfoUserProfile";
import { User } from "@/type/type";

export default function IsUserProfilInfoContainer({
  onEditProfile,
  dataUser,
}: {
  onEditProfile?: () => void;
  dataUser: User | null;
}) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-end mt-[-17%]">
        <IsAvatarUser avatar={dataUser?.avatar} size={110} sizeNoAvatar={90} />
        <MyButton
          onClick={onEditProfile}
          className="text-white border-[0.5px] border-white rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-800 text-l"
        >
          Edit profile
        </MyButton>
      </div>
      <InfoProfileUser
        login={dataUser?.login}
        name={dataUser?.name}
        bio={dataUser?.bio}
        _count={dataUser?._count}
      />
    </div>
  );
}
