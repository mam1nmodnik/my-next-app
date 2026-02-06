import PostCardList from "../PostCardList";
import MyLoader from "@/components/ui/MyLoader";
import { usePosts } from "@/hooks/usePost";

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
