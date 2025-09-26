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
  const [modalText, setModalText] = useState("Content of the modal");

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
    if (posts.length == 0) return setPosts([data]);
    setPosts([...posts, data]);
    console.log(data);
  }

  function updateDate(date: Date) {
    const newDate =
      date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    return newDate;
  }

  function deletePost(key: number) {
    const newToDo = posts.filter((task) => task.key != key);
    setPosts([...newToDo]);
  }

  const showModal = () => {
    setOpenWindow(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenWindow(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenWindow(false);
  };
  return (
    <>
      <div className="flex gap-20">
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.key}
              className="flex flex-col font-sans gap-2 p-4 rounded-[24px] h-fit w-[400px] glass"
            >
              <div className="flex flex-col gap-2">
                <p className="">{post.title}</p>
                <p>{post.content}</p>
                <div>
                  {/* <p>Опубликовал: {post.nameUser}</p> */}
                  <p>Дата публикации: {post.date}</p>
                </div>
              </div>
              <button
                className="glass p-2 cursor-pointer"
                onClick={() => deletePost(post.key)}
              >
                удалить пост
              </button>
            </div>
          ))}
        </div>
      </div>
      <MyFooter showModal={showModal} />
      <Modal 
        title={
          <form className="flex flex-col gap-5 " onSubmit={newPost}>
            <label htmlFor="" className="flex flex-col gap-2">
              Название поста
              <input
                type="text"
                name="title"
                id=""
                className="border font-sans p-2 glass cursor-pointer"
                value={formValue.title}
                onChange={(val) => {
                  setFormValue({ ...formValue, title: val.target.value });
                }}
                required
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-2 ">
              Текст поста
              <textarea
                name=""
                id=""
                rows={5}
                cols={33}
                maxLength={10000}
                className="border p-2 max-h-30 min-h-30 glass cursor-pointer"
                value={formValue.content}
                onChange={(val) => {
                  setFormValue({ ...formValue, content: val.target.value });
                }}
                required
              />
            </label>
            <button className="glass p-2 cursor-pointer">Опубликовать</button>
          </form>
        }
        open={openWindow}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
