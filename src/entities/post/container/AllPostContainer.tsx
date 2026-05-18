import MyLoader from "@/shared/ui/MyLoader";
import { usePosts } from "../model/usePost";
import PostCardList from "../ui/PostCardList";
import { Post } from "@/type/type";
import { ReactNode } from "react";
import ErrorResponse from "@/shared/ui/ErrorResponse";

type PopularPostProps = {
  renderActions?: (post: Post) => ReactNode;
  renderMenu?: (post: Post) => ReactNode;
};

export default function AllPostContainer({
  renderActions,
  renderMenu,
}: PopularPostProps) {
  const { isLoading, data, isError, error } = usePosts({ type: "all" });

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

  return (
    <PostCardList
      posts={data ?? []}
      suspens="Постов еще нет, будьте первыми)"
      renderActions={renderActions}
      renderMenu={renderMenu}
    />
  );
}
