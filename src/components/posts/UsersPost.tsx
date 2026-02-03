"use client";
import { Post } from "@/type/type";
import { formateDate } from "@/lib/formate-date";
import { Avatar, Divider, Popconfirm } from "antd";
import Link from "next/link";
import LikeCustom from "../IU/likeCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import MessageCustom from "../IU/messageCustom";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
type UsersPostProps = {
  post?: Post;
  deletePost?: (id: number) => void;
  queryKey?: {
    name: string;
    id?: string;
  };
};

export default function UsersPost({
  post,
  deletePost,
  queryKey,
}: UsersPostProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const resolvedQueryKey = queryKey?.id
    ? [queryKey.name, queryKey.id]
    : [queryKey?.name || "all-posts"];
  const likeMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId: session?.user.id,
        }),
      });
      return res.json() as Promise<{ post: Post; liked: boolean }>;
    },

    onSuccess: ({ post, liked }) => {
      queryClient.setQueryData<Post[]>(resolvedQueryKey, (old) => {
        if (!old) return old;
        return old.map((p) =>
          p.id === post.id
            ? {
                ...p,
                likesCount: post.likesCount,
                isLiked: liked,
              }
            : p,
        );
      });
    },
  });

  return (
    <div className="bg-black rounded-2xl shadow-2xl w-full max-w-[650px] shadow-indigo-900/20 border-r-white/45 border-l-white/45">
      <div className="flex flex-col justify-between font-sans md:pt-4 md:pr-4 md:pl-4 md:pb-4 p-4 min-h-fit w-full ">
        {post && (
          <div className="flex flex-col gap-2">
            {post.user && (
              <div className="flex flex-row justify-between items-center relative">
                <div className="flex flex-row gap-2 items-center">
                  <Avatar
                    src={post.user.avatar}
                    alt="avatar"
                    className="rounded-4xl h-[70px] w-[70px]"
                    size={50}
                  />
                  <Link
                    href={
                      Number(session?.user.id) === Number(post.user.id)
                        ? "/profile"
                        : `/users-profile?user=${post.user.id}`
                    }
                    className="text-l md:text-xl font-bold"
                  >
                    {post.user.login}
                  </Link>
                </div>
                <div className="cursor-pointer hover:bg-white/10 pl-1 pr-1 pt-1 rounded-full text-white ">
                  <EllipsisOutlined
                    style={{ fontSize: "25px" }}
                    onClick={() => setOpen(!open)}
                  />
                </div>
                <div
                  className={`absolute top-0 right-[-110px] bg-gray-800 rounded-md shadow-lg z-10 ${open ? "" : "hidden"}`}
                >
                  
                  {deletePost && (
                    <Popconfirm
                      title="Вы уверены?"
                      onConfirm={() => deletePost(post.id)}
                      okText="Да"
                      cancelText="Нет"
                      className="static"
                    >
                      <button className="bg-red-500 hover:bg-red-900  p-2 cursor-pointer md:w-20 w-fit rounded-[6px] text-[12px]  font-medium  text-white hover:text-gray">
                        Удалить
                      </button>
                    </Popconfirm>
                  )}
                </div>
              </div>
            )}
            <p className="text-[#E5E7EB] text-l md:text-xl font-medium pb-5 break-words">
              {post.content}
            </p>
            <div className="flex items-center flex-row justify-between  ">
              {post?.user && (
                <div className="flex flex-row gap-4">
                  <LikeCustom
                    toggle={post.isLiked}
                    click={() => likeMutation.mutate(post.id)}
                    num={post.likesCount}
                    size="20"
                  />
                  <MessageCustom num={0} size="20" />
                </div>
              )}
              <p className=" md:text-[14px] text-[0.8rem] text-right text-[#9CA3AF] ">
                {formateDate(post.date)}
              </p>
            </div>
          </div>
        )}
      </div>
      <Divider
        variant="solid"
        style={{
          margin: "0",
          backgroundColor: "#9CA3AF",
        }}
      />
    </div>
  );
}
