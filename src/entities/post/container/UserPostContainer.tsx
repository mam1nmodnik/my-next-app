"use client";
import MyLoader from "@/shared/ui/MyLoader";
import { usePosts } from "../model/usePost";
import PostCardList from "../ui/PostCardList";
import { useSearchParams } from "next/navigation";

export default function UserProfilePost() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get("user") ?? undefined;

  const { isLoading, data } = usePosts({
    type: "user",
    userId: Number(idUser),
  });

  if (isLoading) {
    return (
      <div className="mt-5 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }

  return data && <PostCardList posts={data} suspens="Пока тут пусто...." />;
}
