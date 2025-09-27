"use client";
import { usePostsContext } from "@/context/postsContext";
import { MyFooter } from "@/components/MyFooter";
import { useState } from "react";
import { Modal } from "antd";
import type { FormEvent } from "react";

type FormValueType = {
  title: string;
  content: string;
};

export default function MyPosts() {
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { posts, setPosts } = usePostsContext();
  const [formValue, setFormValue] = useState<FormValueType>({
    title: "",
    content: "",
  });

  function newPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      key: Date.now(),
      title: formValue.title,
      content: formValue.content,
      date: updateDate(new Date()),
    };
    setPosts((prev) => [...prev, data]);
    setFormValue({ title: "", content: "" });
    setOpenWindow(false);
  }

  function updateDate(date: Date) {
    const newDate =
      date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    return newDate;
  }

  function deletePost(key: number) {
    setPosts(posts.filter((task) => task.key !== key));
  }

  const showModal = () => setOpenWindow(true);
  const handleCancel = () => setOpenWindow(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Контент, который растягивается */}
      <div className="flex-1 flex flex-col items-center w-full max-h-[80vh] overflow-y-auto gap-4 p-4">
        {posts.map((post) => (
          <div
            key={post.key}
            className="flex flex-col justify-between font-sans gap-2 p-4 rounded-[24px] h-[200px] w-[80%] glass"
          >
          
              <h1 className="text-gray-800 text-3xl font-bold">{post.title}</h1>
              <p className="text-gray-800 text-2xl font-bold">{post.content}</p>
            
            <div className="flex items-center justify-between">
              <button
                className="glass p-2 cursor-pointer w-40 rounded-[20px] text-l font-bold text-gray-700"
                onClick={() => deletePost(post.key)}
              >
                удалить пост
              </button>
              <p className="text-l font-bold text-black">Дата публикации: {post.date}</p>
            </div>
          </div>
        ))}
      </div>

      <MyFooter showModal={showModal} />

      <Modal
        open={openWindow}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null} 
        mask={true}
      >
        <form className="flex flex-col gap-5" onSubmit={newPost}>
          <h1 className="text-3xl font-bold text-white">Новый пост</h1>
          <label className="flex flex-col gap-2 text-xl font-bold text-white">
            Название поста
            <input
              type="text"
              className="border font-sans p-2 glass pounded-[20px] cursor-pointer"
              value={formValue.title}
              onChange={(e) =>
                setFormValue({ ...formValue, title: e.target.value })
              }
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-xl font-bold text-white ">
            Текст поста
            <textarea
              rows={5}
              className="border p-2 h-32 glass cursor-pointer"
              value={formValue.content}
              onChange={(e) =>
                setFormValue({ ...formValue, content: e.target.value })
              }
              required
            />
          </label>
          <button className="glass p-2 cursor-pointer">Опубликовать</button>
        </form>
      </Modal>
    </div>
  );
}
