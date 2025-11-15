"use client"
import UsersPosts from "@/components/UsersPosts";
import { usePostsContext } from "@/context/posts-context";
export default function Home() {
  const { allPosts } = usePostsContext();
  if(!allPosts){
    return <div>Загрузка....</div>
  }
  return (
    <UsersPosts posts={allPosts}  suspens='Постов еще нет, будьте первыми)'/>
  );
}
