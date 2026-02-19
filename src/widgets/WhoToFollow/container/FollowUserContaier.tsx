'use client';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserWithFollowInfo } from "@/shared/hooks/useUsers";
import IsUserContainer from "@/entities/user/container/IsUserContainer";
import FollowContainer from "@/components/features/follow/container/FollowContainer";


export default function FollowUserContainer({ user }: { user: UserWithFollowInfo }) {
  const { data: session } = useSession();

  return (
    <div
      key={user.id}
      className="flex flex-row gap-2 items-center justify-between pt-2.5 pb-2.5 pl-4 pr-4 rounded-[35px] hover:bg-white/10  cursor-pointer"
    >
      <IsUserContainer {...user} />
      {Number(session?.user.id) === Number(user.id) ? (
        <Link href="/profile" className="text-[15px] font-bold">
          <p className="bg-white text-black hover:bg-white/70 font-bold text-[15px] rounded-4xl p-1 pr-3 pl-3 cursor-pointer text-l">
            profile
          </p>
        </Link>
      ) : (
        <FollowContainer
          userId={user.id}
          isFollowedByMe={user.isFollowedByMe}
        />
      )}
    </div>
  );
}
