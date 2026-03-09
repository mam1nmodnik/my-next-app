"use client";
import { useFollowing } from "@/shared/hooks/follow/useFollowing";
import MyLoader from "@/shared/ui/MyLoader";
import FollowUserContainer from "@/widgets/WhoToFollow/container/FollowUserContaier";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useFollowing(id);
  
  if (isLoading) {
    return (
      <div className="mt-25 mb-5 flex justify-center ">
        <MyLoader size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data &&
        data.map((user) => (
          <FollowUserContainer key={user.login} user={user} />
        ))}
    </div>
  );
}
