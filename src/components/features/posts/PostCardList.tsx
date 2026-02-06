"use client";
import { Post } from "@/type/type";
import UsersPost from "./PostCard";
import React from "react";

type PostCardListProps = {
  posts: Post[];
  suspens: string;  
};

const UserPosts = React.memo(function PostCardList({
  posts,
  suspens,
}: PostCardListProps) {

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
            />
          ))
        )}
      </div>
    </div>
  );
});
export default UserPosts;
