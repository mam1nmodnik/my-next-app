import { useUserContext } from "@/app/_providers/infra/user-provider";
import IsAvatarUser from "@/app/entities/user/ui/IsAvatarUser";
import { useCreatePost } from "@/components/features/сreatePost/model/useCreatePost";
import { MyButton } from "@/shared/ui/MyButton";
import TextArea from "antd/es/input/TextArea";
import { useSession } from "next-auth/react";

export default function CreatePostForm() {
  const { dataUser, isLoadingUser } = useUserContext();
  const { content, setContent, createPost } = useCreatePost();
  const { data: session } = useSession();

  return session ? (
    <div className="flex flex-col gap-1">
      <div className=" flex flex-row items-center p-4">
        <div className="max-w-[60px] w-full">
          <IsAvatarUser avatar={dataUser?.avatar} />
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
  ) : null;
}
