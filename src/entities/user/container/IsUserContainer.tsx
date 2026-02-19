import IsAvatarUser from "../ui/IsAvatarUser";
import IsNameUser from "../ui/IsNameUser";


export default function IsUserContainer({ id, avatar, name, login }: { id: number | null | undefined, avatar: string | null | undefined, name: string | null | undefined, login: string | null | undefined }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <IsAvatarUser avatar={avatar} />
      <IsNameUser id={id} name={name} login={login} />
    </div>
  );
}
