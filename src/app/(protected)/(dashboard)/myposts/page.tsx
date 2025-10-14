"use client";
import { usePostNewContext } from "@/context/post-new-context";
import { usePostsContext } from "@/context/posts-context";
import { Modal } from "antd";
import { formateDate } from "@/lib/formate-date";

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
    <>
      <div className="flex flex-col w-full  gap-4 md:mt-0 mt-5">
        <div className="flex flex-col items-center gap-4 w-full h-fit pb-28 relative ">
          {posts?.length == 0 ? (
            <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
              У вас есть что-то интерестное?
            </h1>
          ) : (
            posts.map((post, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-4 font-sans p-4 rounded-[24px] min-h-fit md:w-[80%] w-full glass md:m-2 "
              >
                <h1 className="text-gray-800 text-xl lg:text-3xl font-bold p-2 lg:p-4 text-left ">
                  {post.title}
                </h1>
                <p className="text-gray-800 text-l lg:text-xl font-medium p-2 lg:p-6 ml-4 lg:ml-7 break-words">
                  {post.content}
                </p>
                <div className="flex items-center flex-row justify-between ml-2 lg:ml-7 lg:mr-7 lg:mb-2">
                  <button
                    className="glass p-2 cursor-pointer w-40 rounded-[20px] text-xs lg:text-l font-medium text-shadow-amber-50"
                    onClick={() => post.id && deletePost(post.id)}
                  >
                    удалить пост
                  </button>
                  <p className="text-xs lg:text-l text-[0.8rem] text-right ">
                    Дата публикации: {formateDate(post.date)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        open={openWindow}
        onCancel={handleCancel}
        footer={null}
        mask={true}
        getContainer={false}
      >
        <form className="flex flex-col gap-5" onSubmit={newPost}>
          <h1 className="text-3xl font-bold text-white">Новый пост</h1>
          <label className="flex flex-col gap-2 text-xl font-bold text-white">
            Название поста
            <input
              type="text"
              className="border font-sans p-2 glass rounded cursor-pointer"
              value={formValue.title}
              onChange={(e) =>
                setFormValue({ ...formValue, title: e.target.value })
              }
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-xl font-bold text-white">
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
          <button type="submit" className="glass-light p-2 cursor-pointer rounded-2xl w-[10rem] text-[1rem]">
            Опубликовать
          </button>
        </form>
      </Modal>
    </>
  );
}
