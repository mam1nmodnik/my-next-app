"use client";
import PostCardList from "../PostCardList";
import MyLoader from "../../../ui/MyLoader";
import { useSearchParams } from "next/navigation";
import { usePosts } from "@/hooks/usePost";

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
