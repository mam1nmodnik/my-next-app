"use client";
import { Post } from "@/type/type";
import { formateDate } from "@/lib/help";
import { Divider, Popover } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import IsUserContainer from "../../user/container/IsUserContainer";

type PostCardProps = {
  post: Post;
  renderActions?: (post: Post) => React.ReactNode;
  renderMenu?: (post: Post) => React.ReactNode;
};

const UsersPost = React.memo(function PostCard({
  post,
  renderActions,
  renderMenu,
}: PostCardProps) {
  const [open, setOpen] = useState(false);
  const menuContent = renderMenu ? renderMenu(post) : null;
  const hasMenu = menuContent !== null && menuContent !== undefined;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="bg-black rounded-2xl shadow-2xl w-full max-w-[650px] shadow-indigo-900/20 border-r-white/45 border-l-white/45">
      <div className="flex flex-col justify-between font-sans md:pt-4 md:pr-4 md:pl-4 md:pb-4 p-4 min-h-fit w-full ">
        <div className="flex flex-col gap-2">
          {post.user && (
            <div className="flex flex-row justify-between items-center relative">
              <IsUserContainer {...post.user} />
              {hasMenu ? (
                <Popover
                  content={
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-white/10">
                      {menuContent}
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                  styles={{
                    body: {
                      width: "fit-content",
                      backgroundColor: "black",
                      boxShadow:
                        "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
                      padding: "15px 0 15px 0",
                    },
                  }}
                  color="black"
                >
                  <div className="cursor-pointer hover:bg-white/10 pl-1 pr-1 pt-1 rounded-full text-white">
                    <EllipsisOutlined style={{ fontSize: "25px" }} />
                  </div>
                </Popover>
              ) : null}
            </div>
          )}
          <p className="text-[#E5E7EB] text-l md:text-xl font-medium pb-5 break-words">
            {post.content}
          </p>
          <div className="flex items-center flex-row justify-between  ">
            {post.user && renderActions ? renderActions(post) : null}

            <p className=" md:text-[14px] text-[0.8rem] text-right text-[#9CA3AF] ">
              {formateDate(post.createdAt)}
            </p>
          </div>
        </div>
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
