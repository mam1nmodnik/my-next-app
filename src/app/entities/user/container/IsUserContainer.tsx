import IsNameUser from "@/app/entities/user/ui/IsNameUser";
import IsAvatarUser from "@/app/entities/user/ui/IsAvatarUser";


export default function IsUserContainer({ id, avatar, name, login }: { id: number | null | undefined, avatar: string | null | undefined, name: string | null | undefined, login: string | null | undefined }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <IsAvatarUser avatar={avatar} />
      <IsNameUser id={id} name={name} login={login} />
    </div>
  );
}
