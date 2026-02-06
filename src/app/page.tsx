"use client";
import { MyButton } from "@/components/ui/MyButton";
import PopularPost from "@/components/features/posts/container/AllPostContainer";
import { useUserContext } from "@/context/user-context";
import { Avatar, Divider, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCreatePost } from "@/hooks/useCreatePost";

export default function Home() {
  const { data: session } = useSession();

  const { dataUser, isLoadingUser } = useUserContext();
  const { content, setContent, createPost } = useCreatePost();
  const [menu, setMenu] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45 h-full min-h-screen">
        <div className="flex flex-row h-[50px] bg-black">
          <div
            onClick={() => setMenu(() => false)}
            className="max-w-[284px] h-full flex items-center justify-center w-full  cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative"
          >
            <div className="w-fit">
              <p className={!menu ? "text-white" : `text-white/55`}>Popular</p>
              {!menu && (
                <div className="w-full h-[4px] rounded-2xl bg-blue-500  bottom-0"></div>
              )}
            </div>
          </div>
          <div
            onClick={() => setMenu(() => true)}
            className="max-w-[284px] w-full h-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-350 ease-in-out relative"
          >
            <div className="w-fit">
              <p className={menu ? "text-white" : `text-white/55`}>Follow</p>
              {menu && (
                <div className="w-full h-[4px] rounded-2xl bg-blue-500  bottom-0"></div>
              )}
            </div>
          </div>
        </div>
        <Divider
          size="small"
          className="border border-white/35 m-0"
          style={{ margin: 0 }}
        />
        {session && (
          <>
            <div className="flex flex-col gap-1">
              <div className=" flex flex-row items-center p-4">
                <div className="max-w-[60px] w-full">
                  {isLoadingUser ? (
                    <Skeleton.Avatar
                      active
                      size={50}
                      shape="circle"
                      className="object-cover bg-white/10 rounded-4xl"
                    />
                  ) : (
                    <Avatar
                      src={dataUser?.avatar}
                      size={50}
                      alt="Аватар"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="w-full">
                  {isLoadingUser ? (
                    <div
                      className="bg-black rounded-md animate-pulse"
                      style={{
                        height: "64px",
                      }}
                    />
                  ) : (
                    <TextArea
                      id="post"
                      name="post"
                      value={content}
                      maxLength={250}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What’s happening?"
                      autoSize={{ minRows: 1, maxRows: 8 }}
                      style={{
                        backgroundColor: "black",
                        border: "none",
                        color: "white",
                        fontSize: "20px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        minHeight: "64px",
                        resize: "none",
                      }}
                      className="placeholder-gray-400"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end p-2">
                <MyButton
                  disabled={content.length > 0 ? false : true}
                  onClick={() => createPost()}
                  className={`text-black bg-white rounded-4xl p-1 pr-3 pl-3 hover:bg-gray-400 text-[17px] font-semibold right-0 ${content.length > 0 ? " cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                >
                  Post
                </MyButton>
              </div>
            </div>
            <Divider
              size="small"
              className="border border-white/35"
              style={{ margin: 0 }}
            />
          </>
        )}

        {!menu ? <PopularPost /> : null}
      </div>
    </div>
  );
}
