"use client";
import UsersPosts from "@/components/posts/UsersPosts";
import { usePostsContext } from "@/context/posts-context";
export default function Home() {
  const { allPosts } = usePostsContext();
  return (
    <div className="p-4">
      <UsersPosts posts={allPosts} suspens="Постов еще нет, будьте первыми)" />
    </div>
  );
}
