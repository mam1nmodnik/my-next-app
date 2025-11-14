"use client"
import { Post } from "@/type/type-post-context";
import UsersPost from "./UsersPost";
import React from "react";

type UsersPostsProps = {
  posts: Post[];
  suspens: string;
  deletePost?: (id: number) => void;
};
const UserPosts = React.memo(function UsersPosts({ posts, suspens, deletePost }: UsersPostsProps ) {
  return (
    <div className="flex flex-col w-full  gap-4 md:mt-0 mt-5">
      <div className="flex flex-col items-center gap-4 w-full h-fit pb-28 relative ">
        {posts?.length == 0 ? (
          <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
            {suspens}
          </h1>
        ) : (
          posts.map((post, index) => (
            <UsersPost  key={index} post={post} deletePost={deletePost}/>
          ))
        )}
      </div>
    </div>
  );
})
export default  UserPosts;
