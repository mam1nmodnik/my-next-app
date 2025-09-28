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

  const { posts, setPosts, userName } = usePostsContext();
  const [formValue, setFormValue] = useState<FormValueType>({
    title: "",
    content: "",
  });

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
  function newPost(event: FormEvent<HTMLFormElement>) {
    if (userName?.nameUser == undefined) {
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

  function deletePost(key: number) {
    setPosts(posts.filter((task) => task.key !== key));
  }

  const showModal = () => setOpenWindow(true);
  const handleCancel = () => setOpenWindow(false);

  return (
    <div>
      <div className="flex flex-col items-center w-full max-h-[95vh] overflow-y-auto gap-4 relative ">
        <div className="mb-25 flex flex-col items-center w-full ">
          {posts.map((post) => (
            <div
              key={post.key}
              className="flex flex-col justify-between font-sans p-4 rounded-[24px] min-h-fit w-[80%] glass m-2"
            >
              <h1 className="text-shadow-amber-50 text-3xl font-bold p-4">
                {post.title}
              </h1>
              <p className="text-shadow-amber-50 text-xl font-medium p-6 break-words">
                {post.content}
              </p>

              <div className="flex items-center justify-between">
                <button
                  className="glass p-2 cursor-pointer w-40 rounded-[20px] text-l font-medium text-shadow-amber-50"
                  onClick={() => deletePost(post.key)}
                >
                  удалить пост
                </button>
                <p className="text-l  text-[0.8rem]">
                  Дата публикации: {post.date}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MyFooter showModal={showModal} />
      </div>

      <Modal
        open={openWindow}
        onCancel={handleCancel}
        footer={null}
        mask={true}
      >
        <form className="flex flex-col gap-5" onSubmit={newPost}>
          <h1 className="text-3xl font-bold magic-black ">Новый пост</h1>
          <label className="flex flex-col gap-2 text-xl font-bold magic-black ">
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
          <label className="flex flex-col gap-2 text-xl font-bold magic-black">
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
          <button className="glass p-2 cursor-pointer w-[10rem] text-[1rem]">
            Опубликовать
          </button>
        </form>
      </Modal>
    </div>
  );
}
