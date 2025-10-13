"use client";
import { ReactNode, useContext, createContext } from "react";
import { usePostsContext } from "@/context/posts-context";
import { useState } from "react";
import { PostsContextType, FormValueType } from "@/type/type-new-post-context";
import type { FormEvent } from "react";
import { useUserContext } from "./user-context";

const PostNewContext = createContext<PostsContextType | undefined>(undefined);

export function ModalPostContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { posts, setPosts } = usePostsContext();
  const { userName } = useUserContext();
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<FormValueType>({
    title: "",
    content: "",
  });

  function updateDate(date: Date) {
    return (
      date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    );
  }

  async function newPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      idUser: userName?.id,
      title: formValue.title,
      content: formValue.content,
      nameUser: userName?.login,
      date: updateDate(new Date()),
    };
    try {
      const res = await fetch("/api/posts/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
      setPosts((prev) => [...prev, data]);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
    setFormValue({ title: "", content: "" });
    setOpenWindow(false);
  }

  const deletePost = (id?: string) => {
    return setPosts(posts.filter((task) => task.id !== id));
  };

  const showModal = () => setOpenWindow(true);
  const handleCancel = () => setOpenWindow(false);

  return (
    <PostNewContext.Provider
      value={{
        openWindow,
        setFormValue,
        formValue,
        newPost,
        deletePost,
        showModal,
        handleCancel,
      }}
    >
      {children}
    </PostNewContext.Provider>
  );
}
export function usePostNewContext() {
  const context = useContext(PostNewContext);
  if (!context) {
    throw new Error(
      "usePostNewContext must be used inside PostNewContext.Provider"
    );
  }
  return context;
}
