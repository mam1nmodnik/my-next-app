import PostCardList from "../ui/PostCardList";
import MyLoader from "@/shared/ui/MyLoader";
import { usePosts } from "@/app/entities/post/model/usePost";

export default function PopularPost() {
  
  const { isLoading,  data } = usePosts({ type: "all" });
  if (isLoading) {
  return (
    <div className="flex justify-center mt-5">
      <MyLoader />
    </div>
  );
  }

  return (
    Array.isArray(data) && (
      <PostCardList posts={data} suspens="Постов еще нет, будьте первыми)" />
    )
  );
}
