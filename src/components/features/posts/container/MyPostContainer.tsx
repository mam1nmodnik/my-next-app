import PostCardList from "../PostCardList";
import MyLoader from "../../../ui/MyLoader";
import { usePosts } from "@/hooks/usePost";

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
