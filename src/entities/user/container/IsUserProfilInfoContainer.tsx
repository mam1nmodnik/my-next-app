import { useUserContext } from "@/app/_providers/infra/user-provider";
import IsAvatarUser from "../ui/IsAvatarUser";
import { MyButton } from "@/shared/ui/MyButton";
import InfoProfileUser from "../ui/isInfoUserProfile";
import { useUpdateProfile } from "@/features/updateProfile/model/ UpdateProfileContext";

export default function IsUserProfilInfoContainer() {
  const { dataUser } = useUserContext();
  const { openModal } = useUpdateProfile();
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-end mt-[-17%]">
        <IsAvatarUser avatar={dataUser?.avatar} size={150} />
        <MyButton
          onClick={openModal}
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
