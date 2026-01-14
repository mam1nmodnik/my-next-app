"use client";
import SceletonePosts from "@/components/posts/SceletonePosts";
import UsersPosts from "@/components/posts/UsersPosts";
import { Post } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
export default function Home() {

  const { isLoading, error, data } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch("/api/posts/all-posts");
      return await response.json();
    },
  });
  if (isLoading) {
    return (
      <SceletonePosts/>
    );
  }
  if(error){
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="p-4">
      {data && (
        <UsersPosts posts={data} suspens="Постов еще нет, будьте первыми)" />
      )}
    </div>
  );
}
