"use client";
import { useModalPostContext } from "@/context/modalPostContext";
import { usePostsContext } from "@/context/postsContext";
import { Modal } from "antd";

export default function MyPosts() {
  const { posts } = usePostsContext();
  const {
    openWindow,
    setFormValue,
    formValue,
    newPost,
    deletePost,
    showModal,
    handleCancel,
  } = useModalPostContext();
  return (
    <>
      <div className="flex flex-col  w-full gap-4 h-[100vh]">
        <div className="flex flex-col items-center gap-4 w-full overflow-y-auto pb-28 relative ">
          {posts?.length == 0 ? (
            <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
              У вас есть что-то интерестное?
            </h1>
          ) : (
            posts.map((post) => (
              <div
                key={post.key}
                className="flex flex-col justify-between gap-4 font-sans p-4 rounded-[24px] min-h-fit w-[80%] glass m-2"
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
                    onClick={() => deletePost(post.key)}
                  >
                    удалить пост
                  </button>
                  <p className="text-xs lg:text-l text-[0.8rem] text-right ">
                    Дата публикации: {post.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button
        className=" lg:fixed lg:block  hidden  bottom-20 left-1/2 -translate-x-1/2 glass rounded-[10px] lg:rounded-[20px] w-[80%] lg:w-[40%] p-4 text-lg lg:text-xl font-bold magic-black bg-beige-gray shadow-lg"
        onClick={showModal}
      >
        Добавить новый пост +
      </button>
      <Modal
        open={openWindow}
        onCancel={handleCancel}
        footer={null}
        mask={true}
      >
        <form className="flex flex-col gap-5" onSubmit={newPost}>
          <h1 className="text-3xl font-bold magic-black">Новый пост</h1>
          <label className="flex flex-col gap-2 text-xl font-bold magic-black">
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
    </>
  );
}
