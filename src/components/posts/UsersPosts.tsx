"use client";
import { Post } from "@/type/type-post-context";
import UsersPost from "./UsersPost";
import React from "react";

type PostUser = {
  id: number;
  title?: string;
  content?: string;
  date: Date;
  createdAt: Date;
  userId: number;
};
type UsersPostsProps = {
  posts?: Post[];
  postUser?: PostUser[];
  suspens: string;
  deletePost?: (id: number) => void;
};
const UserPosts = React.memo(function UsersPosts({
  posts,
  suspens,
  deletePost,
  postUser,
}: UsersPostsProps) {
  return (
    <div className="flex flex-col w-full  gap-4 md:mt-0 mt-5">
      <div className="flex flex-col items-center gap-4 w-full h-fit relative ">
        {posts?.length == 0 || postUser?.length == 0 ? (
          <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
            {suspens}
          </h1>
        ) : posts ? (
          posts.map((post, index) => (
            <UsersPost key={index} post={post} deletePost={deletePost} />
          ))
        ) : (
          postUser &&
          postUser.map((post, index) => (
            <UsersPost key={index} postUser={post} deletePost={deletePost} />
          ))
        )}
      </div>
    </div>
  );
});
export default UserPosts;
