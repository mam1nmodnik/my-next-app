"use client";
import MyLoader from "@/shared/ui/MyLoader";
import { useUsers } from "@/shared/hooks/useUsers";
import ErrorResponse from "@/shared/ui/ErrorResponse";
import { ReactNode } from "react";
import FollowUserList from "@/widgets/follow/FollowUserList";

export default function WhoToFollow() {
  const { data, isLoading, error, isError } = useUsers();
  if (isLoading) {
    return (
      <div className="mt-25 mb-5 flex justify-center w-[300px]">
        <MyLoader size={32} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <UsersBlock>
        <ErrorResponse error={error} title="Users" />
      </UsersBlock>
    );
  }

  return (
    <UsersBlock>
      <FollowUserList data={data} />
    </UsersBlock>
  );
}

function UsersBlock({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 mt-5 p-4 w-full">
      <div className="border border-white/30 rounded-2xl h-fit w-full p-4">
        <h1 className="text-xl font-bold ">Who to follow</h1>
        {children}
      </div>
    </div>
  );
}
