"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FollowContainer from "@/features/follow/container/FollowContainer";

export default function UserCardAction({
  id,
  isFollowedByMe,
  login,
}: {
  isFollowedByMe: boolean;
  id: number;
  login: string;
}) {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user.login === login ? (
        <Link href="/profile" className="text-[15px] font-bold">
          <p className="bg-white text-black hover:bg-white/70 font-bold text-[15px] rounded-4xl p-1 pr-3 pl-3 cursor-pointer text-l">
            profile
          </p>
        </Link>
      ) : (
        <FollowContainer userId={id} isFollowedByMe={isFollowedByMe} />
      )}
    </div>
  );
}
