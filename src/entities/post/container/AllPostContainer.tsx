import { usePosts } from "../model/usePost";
import PostCardList from "../ui/PostCardList";
import MyLoader from "@/shared/ui/MyLoader";
import { Post } from "@/type/type";
import { ReactNode } from "react";

type PopularPostProps = {
  renderActions?: (post: Post) => ReactNode;
  renderMenu?: (post: Post) => ReactNode;
};

export default function PopularPost({
  renderActions,
  renderMenu,
}: PopularPostProps) {
  const { isLoading, data } = usePosts({ type: "all" });
  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <MyLoader />
      </div>
    );
  }

  return (
    Array.isArray(data) && (
      <PostCardList
        posts={data}
        suspens="Постов еще нет, будьте первыми)"
        renderActions={renderActions}
        renderMenu={renderMenu}
      />
    )
  );
}
