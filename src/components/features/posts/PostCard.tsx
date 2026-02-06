"use client";
import { Post } from "@/type/type";
import { formateDate } from "@/lib/formate-date";
import { Avatar, Divider } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MessageCustom from "../../ui/messageCustom";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import LikeContainer from "../like/containers/LikeContainer";
import React from "react";
import DeleteContainer from "../delete/container/DeleteContainer";
type PostCardProps = {
  post?: Post;
};

const UsersPost = React.memo(function PostCard({ post }: PostCardProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black rounded-2xl shadow-2xl w-full max-w-[650px] shadow-indigo-900/20 border-r-white/45 border-l-white/45">
      <div className="flex flex-col justify-between font-sans md:pt-4 md:pr-4 md:pl-4 md:pb-4 p-4 min-h-fit w-full ">
        {post && (
          <div className="flex flex-col gap-2">
            {post.user && (
              <div className="flex flex-row justify-between items-center relative">
                <div className="flex flex-row gap-2 items-center">
                  {post.user.avatar ? (
                    <Avatar
                      src={post.user.avatar}
                      alt="avatar"
                      className="rounded-4xl h-[70px] w-[70px]"
                      size={50}
                    />
                  ) : (
                    <div className="bg-white/13 rounded-[100px] p-2">
                      <AiOutlineUser
                        className="text-white"
                        style={{ fontSize: "30px" }}
                      />
                    </div>
                  )}

                  <Link
                    href={
                      Number(session?.user.id) === Number(post.user.id)
                        ? "/profile"
                        : `/users-profile?user=${post.user.id}`
                    }
                    className="text-l md:text-xl font-bold"
                  >
                    {post.user.login}
                  </Link>
                </div>

                <div className="cursor-pointer hover:bg-white/10 pl-1 pr-1 pt-1 rounded-full text-white ">
                  <EllipsisOutlined
                    style={{ fontSize: "25px" }}
                    onClick={() => setOpen(!open)}
                  />
                </div>

                <div
                  className={`absolute top-0 right-[-110px] bg-gray-800 rounded-md shadow-lg z-10 ${open ? "" : "hidden"}`}
                >
                  <DeleteContainer postId={post.id} />
                </div>
              </div>
            )}
            <p className="text-[#E5E7EB] text-l md:text-xl font-medium pb-5 break-words">
              {post.content}
            </p>
            <div className="flex items-center flex-row justify-between  ">
              {post?.user && (
                <div className="flex flex-row gap-4">
                  <LikeContainer
                    postId={post.id}
                    isLiked={post.isLiked}
                    likesCount={post.likesCount}
                  />
                  <MessageCustom num={0} size="20" />
                </div>
              )}

              <p className=" md:text-[14px] text-[0.8rem] text-right text-[#9CA3AF] ">
                {formateDate(post.createdAt)}
              </p>
            </div>
          </div>
        )}
      </div>
      <Divider
        variant="solid"
        style={{
          margin: "0",
          backgroundColor: "#9CA3AF",
        }}
      />
    </div>
  );
});
export default UsersPost;
