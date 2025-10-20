"use client";
import { Post } from "@/type/type-post-context";
import { formateDate } from "@/lib/formate-date";

type UsersPostProps = {
  post: Post;
  deletePost?: (id: number) => void;
};

export default function UsersPost({ post, deletePost }: UsersPostProps) {
  return (
    <div className="flex flex-col justify-between gap-4 font-sans p-4 rounded-[24px] min-h-fit md:w-[80%] w-full glass md:m-2 ">
      <h1 className="text-gray-800 text-xl lg:text-3xl font-bold p-2 lg:p-4 text-left ">
        {post.title}
      </h1>
      <p className="text-gray-800 text-l lg:text-xl font-medium p-2 lg:p-6 ml-4 lg:ml-7 break-words">
        {post.content}
      </p>
      <div className="flex items-center flex-row justify-between ml-2 lg:ml-7 lg:mr-7 lg:mb-2">
        {deletePost && (
          <button
            className="glass p-2 cursor-pointer w-40 rounded-[20px] text-xs lg:text-l font-medium text-shadow-amber-50"
            onClick={() => post.id && deletePost(post.id)}
          >
            удалить пост
          </button>
        )}
        {post.user?.name && (
          <p className="text-xs lg:text-l text-[0.8rem] text-left">
            Опубиловал: {post.user.name}
          </p>
        )}

        <p className="text-xs lg:text-l text-[0.8rem] text-right ">
          Дата публикации: {formateDate(post.date)}
        </p>
      </div>
    </div>
  );
}
