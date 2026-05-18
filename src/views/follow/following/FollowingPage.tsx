"use client";
import { useFollowing } from "@/shared/hooks/follow/useFollowing";
import ErrorResponse from "@/shared/ui/ErrorResponse";
import MyLoader from "@/shared/ui/MyLoader";
import FollowUserList from "@/widgets/follow/FollowUserList";
import { useParams } from "next/navigation";

export default function FollowingPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useFollowing(id);

  if (isLoading) {
    return (
      <div className="mt-25 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }
  if (isError || !data) {
    return <ErrorResponse error={error} title="Following" />;
  }

  return <FollowUserList data={data} />;
}
