"use client";
import { ReactNode, useContext, createContext } from "react";
import { usePostsContext } from "@/context/posts-context";
import { useState } from "react";
import {
  NewPostContextType,
  FormValueType,
} from "@/type/type-new-post-context";
import type { FormEvent } from "react";
import { useUserContext } from "./user-context";
import { useMessageContext } from "./message-context";

const PostNewContext = createContext<NewPostContextType | undefined>(undefined);

export function ModalPostContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { getPosts } = usePostsContext();
  const { userName } = useUserContext();
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<FormValueType>({
    title: "",
    content: "",
  });

  const { openMessage } = useMessageContext();
  async function newPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      id: userName?.id,
      title: formValue.title,
      content: formValue.content,
      date: new Date(),
    };
    try {
      const response = await fetch("/api/posts/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      openMessage(res)
      getPosts();
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
    setFormValue({ title: "", content: "" });
    setOpenWindow(false);
  }

  async function deletePost(id: number) {
    const response = await fetch(`/api/posts/delete-post/${id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    
    openMessage(res)
    getPosts();
  }

  const handleCancel = () => setOpenWindow( el => !el);

  return (
    <PostNewContext.Provider
      value={{
        openWindow,
        setFormValue,
        formValue,
        newPost,
        deletePost,
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
