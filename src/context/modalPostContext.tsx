import { ReactNode, useContext, createContext } from "react";
import { usePostsContext } from "@/context/postsContext";
import { useState } from "react";
import type { FormEvent } from "react";

type FormValueType = {
  title: string;
  content: string;
};

type PostsContextType = {
  openWindow: boolean;
  setFormValue: React.Dispatch<React.SetStateAction<FormValueType>>;
  formValue: FormValueType;
  newPost: (event: FormEvent<HTMLFormElement>) => void;
  deletePost: (key: number) => void;
  showModal: () => void;
  handleCancel: () => void;
};

const ModalPostContext = createContext<PostsContextType | undefined>(undefined);

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
      return alert("Вы не заполнили профиль");
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
    <ModalPostContext.Provider
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
    </ModalPostContext.Provider>
  );
}
export function useModalPostContext() {
  const context = useContext(ModalPostContext);
  if (!context) {
    throw new Error(
      "useModalPostContext must be used inside ModalPostContext.Provider"
    );
  }
  return context;
}
