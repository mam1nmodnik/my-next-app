"use client";
import UsersPosts from "@/components/posts/UsersPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Post } from "@/type/type";
import { useMessageContext } from "@/context/message-context";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useUserContext } from "@/context/user-context";
import SceletonePosts from "@/components/posts/SceletonePosts";
import { MyButton } from "@/components/IU/MyButton";

type FormValueType = {
  title: string;
  content: string;
};

export default function MyPosts() {
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();
  const { userName } = useUserContext();
  const [formValue, setFormValue] = useState<FormValueType>({
    title: "",
    content: "",
  });
  const [loadBtnProfil, setLoadBtnProfil] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch("/api/posts/post-user");
      const result = await response.json()
      return result;
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/posts/delete-post/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      openMessage(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
  const createPostMutation = useMutation({
    mutationFn: async (data: {
      id: string | undefined;
      title: string;
      content: string;
      date: Date;
    }) => {
      setLoadBtnProfil(el => !el)
      const response = await fetch("/api/posts/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      openMessage(res);
      setLoadBtnProfil(el => !el)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });
  async function deletePost(id: number) {
    deletePostMutation.mutate(id);
  }
  async function newPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      id: userName?.id,
      title: formValue.title,
      content: formValue.content,
      date: new Date(),
    };

    createPostMutation.mutate(data);
    setFormValue({ title: "", content: "" });
  }
  
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-4 flex lg:flex-row flex-col lg:items-start  items-center gap-8">
      <form
        className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8 flex flex-col gap-5"
        onSubmit={newPost}
      >
        <h1 className="text-xl font-bold text-[#E5E7EB] mb-0">Новый пост</h1>
        <div className="flex flex-col gap-5 m-0 ">
          <input
            placeholder="Название поста"
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-white w-[250px]"
            value={formValue.title}
            onChange={(e) =>
              setFormValue({ ...formValue, title: e.target.value })
            }
          />
          <textarea
            placeholder="Текст поста"
            className="p-2 rounded-lg bg-slate-800 text-white max-h-[100px]"
            value={formValue.content}
            onChange={(e) =>
              setFormValue({ ...formValue, content: e.target.value })
            }
          />
        </div>
        <MyButton
          className="w-35 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition text-white"
          loading={loadBtnProfil}
        >
          Опубликовать
        </MyButton>
      </form>


      {isLoading ? (

        <div className="flex flex-col gap-4 w-full">
          <SceletonePosts count={2} />
        </div>

      ) : (
        data && (
          <UsersPosts
            posts={data}
            deletePost={deletePost}
            suspens="У вас есть что-то интерестное?"
          />
        )
      )}
    </div>
  );
}
