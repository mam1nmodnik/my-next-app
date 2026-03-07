import MyLoader from "@/shared/ui/MyLoader";
import PostCardList from "../ui/PostCardList";
import { usePosts } from "../model/usePost";
import { Post } from "@/type/type";
import { ReactNode } from "react";

type ProfilePostProps = {
  renderActions?: (post: Post) => ReactNode;
  renderMenu?: (post: Post) => ReactNode;
};

export default function ProfilePost({
  renderActions,
  renderMenu,
}: ProfilePostProps) {
  const { isLoading, data } = usePosts({ type: "my" });

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
