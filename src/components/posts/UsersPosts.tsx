"use client";
import { Post } from "@/type/type";
import UsersPost from "./UsersPost";
import React from "react";

type UsersPostsProps = {
  posts: Post[];
  suspens: string;
  deletePost?: (id: number) => void;
  queryKey?: {
    name: string;
    id?: string;
  };
};

const UserPosts = React.memo(function UsersPosts({
  posts,
  suspens,
  deletePost,
  queryKey,
}: UsersPostsProps) {
  if (!Array.isArray(posts)) {
    return (
      <div className="flex flex-col w-full gap-4 md:mt-0 mt-5 border-r-white/45 border-l-white/45">
        <div className="flex flex-col items-center gap-4 w-full h-fit">
          <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black">
            {suspens}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 ">
      <div className="flex flex-col items-center w-full h-fit  ">
        {posts.length === 0 ? (
          <>
            <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
              {suspens}
            </h1>
          </>
        ) : (
          posts.map((post) => (
            <UsersPost
              key={post.id}
              post={post}
              deletePost={deletePost}
              queryKey={queryKey}
            />
          ))
        )}
      </div>
    </div>
  );
});
export default UserPosts;
