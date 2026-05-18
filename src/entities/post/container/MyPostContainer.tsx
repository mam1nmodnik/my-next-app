import PostCardList from "../ui/PostCardList";
import { usePosts } from "../model/usePost";
import { Post } from "@/type/type";
import { ReactNode } from "react";
import MyLoader from "@/shared/ui/MyLoader";
import ErrorResponse from "@/shared/ui/ErrorResponse";

type ProfilePostProps = {
  renderActions?: (post: Post) => ReactNode;
  renderMenu?: (post: Post) => ReactNode;
};

export default function MyPostContainer({
  renderActions,
  renderMenu,
}: ProfilePostProps) {
  const { isLoading, data, isError, error } = usePosts({ type: "my" });

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
      suspens="Пока тут пусто...."
      renderActions={renderActions}
      renderMenu={renderMenu}
    />
  );
}
