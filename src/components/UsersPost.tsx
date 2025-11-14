"use client";
import { Post } from "@/type/type-post-context";
import { formateDate } from "@/lib/formate-date";
import { Button, Popconfirm } from "antd";
import Link from "next/link";

type UsersPostProps = {
  post: Post;
  deletePost?: (id: number) => void;
};

export default function UsersPost({ post, deletePost }: UsersPostProps) {
  const confirm = (id: number) => {
    if(deletePost) deletePost(id);
  };

  return (
    <div className="flex flex-col justify-between gap-4 font-sans md:pt-8 md:pr-8 md:pl-8 md:pb-4 p-4  min-h-fit md:max-w-[968px] w-full  bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl  shadow-indigo-900/20">
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[#E5E7EB] text-xl md:text-3xl font-bold  text-left ">
            {post.title}
          </h1>
          <p className="text-[#E5E7EB] text-l md:text-xl font-medium p-2  ml-4 lg:ml-7 break-words">
            {post.content}
          </p>
        </div>
      </div>
      <div className="flex items-center flex-row justify-between">
        {deletePost && (
          <Popconfirm
            title="Вы уверены?"
            onConfirm={() => confirm(post.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              className="bg-red-700 hover:bg-red-900 md:p-3 p-2 cursor-pointer md:w-40 md:rounded-[15px] rounded-[10px] text-s md:text-l font-medium  text-white hover:text-gray"
              type="primary"
            >
              Удалить
            </Button>
          </Popconfirm>
        )}
        {post.user?.login && (
          <p className="text-xs md:text-l text-[0.8rem] text-left text-[#9CA3AF]">
            Опубиловал: <Link href={`/users-profile?user=${post.user.id}`}>{post.user.login}</Link> 
          </p>
        )}

        <p className="text-xs md::text-l text-[0.8rem] text-right text-[#9CA3AF] ">
          Дата публикации: {formateDate(post.date)}
        </p>
      </div>
    </div>
  );
}
