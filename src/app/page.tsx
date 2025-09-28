"use client";
import { usePostsContext } from "@/context/postsContext";
import React from "react";

export default function Home() {
  const { posts, userName } = usePostsContext();
  return (
    <div className="flex-1 flex flex-col items-center w-full max-h-[95vh] overflow-y-auto gap-4">
      <div className="mb-10 flex flex-col items-center gap-4 w-full mt-2">
        {posts.map((post) => (
          <div
            key={post.key}
            className="flex flex-col justify-between font-sans gap-2 p-4 rounded-[24px] min-h-[200px] w-[80%] glass"
          >
            <h1 className="text-gray-800 text-3xl font-bold p-4">
              {post.title}
            </h1>
            <p className="text-gray-800 text-xl font-medium p-6 break-words">
              {post.content}
            </p>
            <div className="flex flex-row justify-between ">
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
