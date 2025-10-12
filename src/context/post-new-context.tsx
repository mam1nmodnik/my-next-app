"use client"
import { ReactNode, useContext, createContext } from "react";
import { usePostsContext } from "@/context/posts-context";
import { useState } from "react";
import {PostsContextType , FormValueType} from '@/type/type-new-post-context'
import type { FormEvent } from "react";

const PostNewContext = createContext<PostsContextType | undefined>(undefined);

export function ModalPostContextProvider({ children }: { children: ReactNode }) {
  const { posts, setPosts, userName } = usePostsContext();
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

  function newPost(event: FormEvent<HTMLFormElement>) {
    if (!userName?.nameUser) {
      setOpenWindow(false);
      alert("Вы не заполнили профиль");
    }
    event.preventDefault();
    const data = {
      key: Date.now(),
      title: formValue.title,
      content: formValue.content,
      date: updateDate(new Date()),
      nameUser: userName?.nameUser,
    };
    setPosts((prev) => [...prev, data]);
    localStorage.setItem("posts", JSON.stringify([...posts, data]));
    setFormValue({ title: "", content: "" });
    setOpenWindow(false);
  }

  const  deletePost = (key: number) => {
   return setPosts(posts.filter((task) => task.key !== key));
  }

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
