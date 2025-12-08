"use client";
import { usePostNewContext } from "@/context/post-new-context";
import { usePostsContext } from "@/context/posts-context";
import { Modal } from "antd";
import UsersPosts from "@/components/posts/UsersPosts";
import { AiOutlineEdit } from "react-icons/ai";

export default function MyPosts() {
  const { posts } = usePostsContext();
  const {
    openWindow,
    setFormValue,
    formValue,
    newPost,
    deletePost,
    handleCancel,
  } = usePostNewContext();


  return (
    <div className="p-4">
      <div className="h-fit bg-slate-800 m-2 p-1 rounded-xl lg:hidden block ">
        {/* <input type="text" name="search" className="glass rounded-xl"/> */}
        <AiOutlineEdit size={40} onClick={handleCancel} className="cursor-pointer text-white hover:text-gray-400 " />
      </div>
      <UsersPosts posts={posts} deletePost={deletePost}  suspens='У вас есть что-то интерестное?'/>
      <Modal
        open={openWindow}
        onCancel={handleCancel}
        footer={null}
        mask={true}
        getContainer={false}
        className="ghosthub-card"
      >
        <form className="flex flex-col gap-5" onSubmit={newPost}>
          <h1 className="text-3xl font-bold text-[#E5E7EB]">Новый пост</h1>
          <label className="flex flex-col gap-2 text-xl font-bold text-[#E5E7EB]">
            Название поста
            <input
              type="text"
              className="border font-sans p-2 glass cursor-pointer rounded-xl"
              value={formValue.title}
              onChange={(e) =>
                setFormValue({ ...formValue, title: e.target.value })
              }
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-xl font-bold text-[#E5E7EB]">
            Текст поста
            <textarea
              rows={5}
              className="border p-2 h-32 glass cursor-pointer rounded-xl"
              value={formValue.content}
              onChange={(e) =>
                setFormValue({ ...formValue, content: e.target.value })
              }
              required
            />
          </label>
          <button type="submit" className="glass p-2 cursor-pointer text-[#E5E7EB] rounded-xl w-[10rem] text-[1rem]">
            Опубликовать
          </button>
        </form>
      </Modal>
    </div>
  );
}
