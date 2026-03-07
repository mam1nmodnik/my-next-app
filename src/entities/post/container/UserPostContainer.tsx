"use client";
import MyLoader from "@/shared/ui/MyLoader";
import { usePosts } from "../model/usePost";
import PostCardList from "../ui/PostCardList";
import { useSearchParams } from "next/navigation";
import { Post } from "@/type/type";
import { ReactNode } from "react";

type UserProfilePostProps = {
  renderActions?: (post: Post) => ReactNode;
  renderMenu?: (post: Post) => ReactNode;
};

export default function UserProfilePost({
  renderActions,
  renderMenu,
}: UserProfilePostProps) {
  const searchParams = useSearchParams();
  const idUser = searchParams.get("user") ?? undefined;
  const parsedUserId = Number(idUser);
  const hasValidUserId = Number.isInteger(parsedUserId) && parsedUserId > 0;

  const { isLoading, data } = usePosts({
    type: "user",
    userId: hasValidUserId ? parsedUserId : undefined,
    enabled: hasValidUserId,
  });

  if (!hasValidUserId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-5 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }

  return (
    data && (
      <PostCardList
        posts={data}
        suspens="Пока тут пусто...."
        renderActions={renderActions}
        renderMenu={renderMenu}
      />
    )
  );
}
