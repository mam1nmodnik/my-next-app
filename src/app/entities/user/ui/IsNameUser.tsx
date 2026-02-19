"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function IsNameUser({
  id,
  name,
  login,
}: {
  id: number | null| undefined;
  name: string | null | undefined;
  login: string | null | undefined;
}) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-[0.5px]">
      <Link
        href={
          Number(session?.user.id) === Number(id)
            ? "/profile"
            : `/users-profile?user=${id}`
        }
        className="text-[15px] font-bold "
      >
        <span className="truncate">{name}</span>
      </Link>
      <span className="text-[#6D6D71] text-[15px] truncate">@{login}</span>
    </div>
  );
}
