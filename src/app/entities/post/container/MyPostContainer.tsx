import PostCardList from "../ui/PostCardList";
import MyLoader from "../../../../shared/ui/MyLoader";
import { usePosts } from "@/app/entities/post/model/usePost";

export default function ProfilePost() {
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
      />
    )
  );
}
