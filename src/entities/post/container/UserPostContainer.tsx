"use client";
import { usePosts } from "../model/usePost";
import PostCardList from "../ui/PostCardList";
import { useParams } from "next/navigation";
import { Post } from "@/type/type";
import { ReactNode } from "react";
import NotFound from "../../../app/not-found";
import MyLoader from "@/shared/ui/MyLoader";
import ErrorResponse from "@/shared/ui/ErrorResponse";

type UserProfilePostProps = {
  renderActions?: (post: Post) => ReactNode;
  renderMenu?: (post: Post) => ReactNode;
};

export default function UserPostContainer({
  renderActions,
  renderMenu,
}: UserProfilePostProps) {
  const { id } = useParams<{ id: string }>();
  const parsedUserId = Number(id);
  const hasValidUserId = Number.isInteger(parsedUserId) && parsedUserId > 0;
  const { isLoading, data, isError, error } = usePosts({
    type: "user",
    userId: hasValidUserId ? parsedUserId : undefined,
    enabled: hasValidUserId,
  });

  if (isLoading) {
    return (
      <div className="mt-25 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }
  if (isError || !data) {
    return <ErrorResponse error={error} title="Posts" />;
  }
  if (!hasValidUserId) {
    return <NotFound />;
  }
  return (
    <PostCardList
      posts={data ?? []}
      suspens="Пока тут пусто...."
      renderActions={renderActions}
      renderMenu={renderMenu}
    />
  );
}
