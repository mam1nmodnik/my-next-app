"use client";
import SceletonePosts from "@/components/posts/SceletonePosts";
import UsersPosts from "@/components/posts/UsersPosts";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts/all-posts");
      const result = await response.json();
      if (!Array.isArray(result)) {
        throw new Error(result.error || "Неверный формат данных");
      }
      console.log(result)
      return result;
    },
  });
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <SceletonePosts count={3} />
      </div>
    );
  }
  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="p-4">
      {data && Array.isArray(data) && (
        <UsersPosts posts={data} suspens="Постов еще нет, будьте первыми)" />
      )}
    </div>
  );
}
