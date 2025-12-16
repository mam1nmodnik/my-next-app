"use client";
import UsersPosts from "@/components/posts/UsersPosts";
import { usePostsContext } from "@/context/posts-context";
import { Skeleton } from "antd";
export default function Home() {
  const { allPosts } = usePostsContext();
  if (allPosts.length === 0) {
    return (
      <div className="p-4 flex justify-center items-center   w-full gap-4 md:mt-0 mt-5">
        <div className="w-[80%]">
          <Skeleton active />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <UsersPosts posts={allPosts} suspens="Постов еще нет, будьте первыми)" />
    </div>
  );
}
