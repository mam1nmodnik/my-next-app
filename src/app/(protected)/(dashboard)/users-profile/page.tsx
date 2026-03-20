"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider } from "antd";
import MyLoader from "@/shared/ui/MyLoader";
import { AiOutlineUser } from "react-icons/ai";
import UserProfilePost from "@/entities/post/container/UserPostContainer";
import FollowContainer from "@/features/follow/container/FollowContainer";
import { PostCardActions } from "@/widgets/post/PostCardActions";
import InfoProfileUser from "@/entities/user/ui/isInfoUserProfile";
import IsAvatarUser from "@/entities/user/ui/IsAvatarUser";

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
            <IsAvatarUser avatar={data?.avatar} size={110} sizeNoAvatar={90} />
            
            <FollowContainer
              userId={data?.id || 0}
              isFollowedByMe={data?.isFollowedByMe || false}
            />
          </div>
          <InfoProfileUser
            login={data?.login}
            name={data?.name}
            bio={data?.bio}
            _count={{
              followers: data?.followersCount,
              following: data?.followingCount,
            }}
          />
        </div>
        <Divider
          size="small"
          className="border border-white/35 m-0"
          style={{ margin: 0 }}
        />
        <UserProfilePost
          renderActions={(post) => <PostCardActions post={post} />}
        />
      </div>
    </div>
  );
}
