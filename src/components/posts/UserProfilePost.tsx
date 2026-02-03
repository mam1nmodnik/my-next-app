"use client";
import UsersPosts from "./UsersPosts";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/type/type";
import MyLoader from "../IU/MyLoader";
import { useSearchParams } from "next/navigation";

export default function UserProfilePost() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get("user") ?? undefined;
  const { isLoading, data } = useQuery({
    queryKey: ["user-posts", idUser],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch(`/api/posts/user-posts/${idUser}`);
      const result = await response.json();
      return result;
    },
  });

  if (isLoading) {
    return (
      <div className="mt-5 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }

  return (
    data && (
      <UsersPosts
        queryKey={{ name: "user-posts", id: idUser }}
        posts={data}
        suspens="Пока тут пусто...."
      />
    )
  );
}
