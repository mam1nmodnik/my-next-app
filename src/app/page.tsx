"use client";
import { usePostsContext } from "@/context/postsContext";
import React from "react";

export default function Home() {
  const { posts, userName } = usePostsContext();
  return (
    <div className="flex flex-col w-full gap-4 h-[100vh] ">
      <div className="flex flex-col items-center gap-4 w-full overflow-y-auto pb-28 relative mt-2 ">
        {posts.map((post) => (
          <div
            key={post.key}
            className="flex flex-col justify-between font-sans gap-2 p-4 rounded-[24px] min-h-[200px] w-[80%] glass"
          >
            <h1 className="text-gray-800 text-xl lg:text-3xl font-bold p-2 lg:p-4 text-left ">
              {post.title}
            </h1>
            <p className="text-gray-800 text-l lg:text-xl font-medium p-2 lg:p-6 ml-4 lg:ml-7 break-words">
              {post.content}
            </p>
            <div className="flex flex-col lg:flex-row  justify-between ml-4 lg:ml-7 lg:mr-7 lg:mb-2 ">
              <p>Опубликовал: {userName?.nameUser}</p>
              <p className="text-l  text-[0.8rem] ">
                Дата публикации: {post.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
