"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider } from "antd";
import MyLoader from "@/shared/ui/MyLoader";
import { AiOutlineUser } from "react-icons/ai";
import FollowContainer from "@/components/features/follow/container/FollowContainer";
import UserProfilePost from "@/app/entities/post/container/UserPostContainer";

type User = {
  id: number;
  login: string;
  name: string | null;
  email: string;
  avatar: string | null;
  avatarPublicId: string | null;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  isFollowedByMe: boolean;
};

export default function UsersProfile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("user");
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", id],
    queryFn: async (): Promise<User> => {
      const response = await fetch(`/api/user/user-id/${id}`);
      return await response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="mt-5 mb-5 h-screen flex justify-center items-center">
        <MyLoader size={42} />
      </div>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full flex justify-center h-full min-h-screen">
      <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45 ">
        <div className="w-full aspect-[3/1] max-h-[200px] bg-[#3E3E3E]"></div>
        <div className="p-6  flex flex-col gap-4">
          <div className="flex flex-row justify-between items-end mt-[-17%] ">
            {data?.avatar ? (
              <Avatar
                src={data?.avatar}
                size={130}
                alt="Аватар"
                className="object-cover relative "
              />
            ) : (
              <div className="bg-white/13 rounded-[100px] p-2">
                <AiOutlineUser
                  className="text-white"
                  style={{ fontSize: "90px" }}
                />
              </div>
            )}
              <FollowContainer userId={data?.id || 0} isFollowedByMe={data?.isFollowedByMe || false} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-[20px] text-white font-bold w-fit">
                {data?.name}
              </h1>
              <p className="text-[#6D6D71] w-fit ">@{data?.login}</p>
            </div>
            <p className="w-fit text-white whitespace-pre-wrap ">{data?.bio}</p>
            <div className="flex flex-row gap-4 mt-2">
              <p className="text-[#6D6D71] text-sm">
                <span className="font-bold text-white">
                  {data?.followersCount}
                </span>{" "}
                Followers
              </p>
              <p className="text-[#6D6D71] text-sm">
                <span className="font-bold text-white">
                  {data?.followingCount}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>
        <Divider
          size="small"
          className="border border-white/35 m-0"
          style={{ margin: 0 }}
        />
        <UserProfilePost />
      </div>
    </div>
  );
}
