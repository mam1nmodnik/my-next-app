"use client";

import DeleteContainer from "@/features/post/delete/container/DeleteContainer";
import LikeContainer from "@/features/post/like/container/LikeContainer";
import { Post } from "@/type/type";

export function PostCardActions({ post }: { post: Post }) {
  return (
    <div className="flex flex-row gap-4">
      <LikeContainer
        postId={post.id}
        isLiked={post.isLiked}
        likesCount={post.likesCount}
      />
      {/* <MessageCustom num={0} size="20" /> */}
    </div>
  );
}

export function PostCardDeleteMenu({ postId }: { postId: number }) {
  return (
    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-white/10">
      <DeleteContainer postId={postId} />
    </div>
  );
}
