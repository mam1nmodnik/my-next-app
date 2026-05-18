"use client";
import ErrorResponse from "@/shared/ui/ErrorResponse";
import UserPostContainer from "@/entities/post/container/UserPostContainer";
import UserBlockProfile from "@/entities/user/profile/UserBlockProfile";
import { PostCardActions } from "@/features/post/PostCardActions";
import { useUser } from "@/shared/hooks/useUser";
import MyLoader from "@/shared/ui/MyLoader";

export default function UserPage() {
  const { data, isLoading, error, isError } = useUser();

  if (isLoading) {
    return (
      <div className="mt-5 mb-5 h-screen flex justify-center items-center">
        <MyLoader size={42} />
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorResponse title="User" error={error} />;
  }

  return (
    <UserBlockProfile
      data={data}
      postContainer={
        <UserPostContainer
          renderActions={(post) => <PostCardActions post={post} />}
        />
      }
    />
  );
}
