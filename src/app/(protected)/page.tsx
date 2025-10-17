"use client"
import { usePostsContext } from "@/context/posts-context";
import { formateDate } from "@/lib/formate-date";
export default function Home() {
  const { allPosts } = usePostsContext();
  
  return (
    <div className="flex flex-col w-full  gap-4 md:mt-0 mt-5">
      <div className="flex flex-col items-center gap-4 w-full h-fit pb-28 relative ">
        {allPosts?.length == 0 ? (
          <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
            У вас есть что-то интерестное?
          </h1>
        ) : (
          allPosts.map((post, index) => (
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
                <p className="text-xs lg:text-l text-[0.8rem] text-left ">
                  Опубликовал {post.user.name}
                </p>
                <p className="text-xs lg:text-l text-[0.8rem] text-right ">
                  Дата публикации: {formateDate(post.date)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
