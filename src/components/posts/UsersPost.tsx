"use client";
import { Post } from "@/type/type";
import { formateDate } from "@/lib/formate-date";
import { Divider, Popconfirm } from "antd";
import Link from "next/link";
import LikeCustom from "../IU/likeCustom";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/user-context";
type UsersPostProps = {
  post?: Post;
  deletePost?: (id: number) => void;
};

export default function UsersPost({
  post,
  deletePost,
}: UsersPostProps) {
  const { userName } = useUserContext()
const queryClient = useQueryClient()

const likeMutation = useMutation({
  mutationFn: async (postId: number) => {
    const res = await fetch("/api/posts/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        userId: userName?.id,
      }),
    })
    return res.json() as Promise<{ post: Post; liked: boolean }>
  },

  onSuccess: ({ post, liked }) => {
    queryClient.setQueryData<Post[]>(
      ["all-posts"],
      (old) => {
        if (!old) return old

        return old.map((p) =>
          p.id === post.id
            ? {
                ...p,
                likesCount: post.likesCount,
                isLiked: liked,
              }
            : p
        )
      }
    )
  },
})

  return (  
    <div className="flex flex-col justify-between gap-4 font-sans md:pt-8 md:pr-8 md:pl-8 md:pb-4 p-4  min-h-fit md:max-w-[968px] w-full  bg-slate-900/60  border border-slate-700 rounded-2xl shadow-2xl  shadow-indigo-900/20">
      {post && (
        <div className="flex flex-col gap-2">
          {post.user && (
            <>
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="https://i.pinimg.com/736x/d4/38/c3/d438c31d0caf10b0dc17a5fcb503a38e.jpg"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-4xl h-[50px] w-[50px] "
                />
                <Link
                  href={`/users-profile?user=${post.user.id}`}
                  className="text-l md:text-xl font-bold"
                >
                  {post.user.login}
                </Link>
              </div>
              <Divider
                variant="solid"
                style={{
                  margin: "0",
                  marginBottom: "10px",
                  marginTop: "10px",
                  backgroundColor: "#9CA3AF",
                }}
              />
            </>
          )}
          <h1 className="text-[#E5E7EB] text-l md:text-xl font-bold  text-left ">
            {post.title}
          </h1>
          <p className="text-[#E5E7EB] text-l md:text-xl font-medium p-2 ml-1 lg:ml-2 pb-5 break-words">
            {post.content}
          </p>
          <div className="flex items-center flex-row justify-between ">
            {deletePost && (
              <Popconfirm
                title="Вы уверены?"
                onConfirm={() => deletePost(post.id)}
                okText="Да"
                cancelText="Нет"
                className="static"
              >
                <button className="bg-red-500 hover:bg-red-900 p-2 cursor-pointer md:w-40 w-35 rounded-[6px] text-[14px]  font-medium  text-white hover:text-gray">
                  Удалить
                </button>
              </Popconfirm>
            )}
            {post?.user && (
              <div className="ml-3">
                <LikeCustom
                  toggle={post.isLiked}
                  click={() => likeMutation.mutate(post.id)}
                  num={post.likesCount}
                  size="20"
                />
              </div>
            )}
            <p className="text-xs md::text-l text-[0.8rem] text-right text-[#9CA3AF] ">
              Дата публикации: {formateDate(post.date)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
