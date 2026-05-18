import { FollowType } from "@/type/type";
import UserCardAction from "../../entities/user/ui/UserCardAction";
import UserRow from "../../entities/user/ui/UserRow";

export default function FollowUserList({data}: {data: FollowType[]}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {data.map((user) => (
        <UserRow
          id={user.id}
          key={user.id}
          avatar={user.avatar}
          name={user.name}
          login={user.login}
          link={true}
          rightSlot={
            <UserCardAction
              id={user.id}
              isFollowedByMe={user.isFollowedByMe}
              login={user.login}
            />
          }
        />
      ))}
    </div>
  );
}
