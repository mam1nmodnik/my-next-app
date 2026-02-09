import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";
import MyLoader from "@/components/ui/MyLoader";
import FollowContainer from "./container/FollowContainer";

type UserWithFollowInfo = {
  id: number;
  login: string;
  name: string | null;
  avatar: string | null;
  avatarPublicId: string | null;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  isFollowedByMe: boolean;
};

export default function WhoToFollow() {
  const { data: session } = useSession();

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<Array<UserWithFollowInfo>> => {
      const response = await fetch("/api/user/users");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return (
      <div className="mt-25 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-5 p-4">
      <div className="border border-white/30 rounded-2xl h-fit w-full p-4">
        <h1 className="text-xl font-bold ">Who to follow</h1>
        <div className="flex flex-col gap-2">
          {isLoading && (
            <div className="mt-5 mb-5 flex justify-center">
              <MyLoader size={32} />
            </div>
          )}
          {data &&
            data.map((user) => (
              <div
                key={user.id}
                className="flex flex-row gap-2 items-center justify-between pt-2.5 pb-2.5 pl-4 pr-4 rounded-[35px] hover:bg-white/10  cursor-pointer"
              >
                <div className="flex flex-row gap-2 items-center">
                  {user.avatar ? (
                    <Avatar
                      src={user.avatar}
                      alt="avatar"
                      className="rounded-4xl h-[70px] w-[70px]"
                      size={50}
                    />
                  ) : (
                    <div className="bg-white/13 rounded-[100px] p-2">
                      <AiOutlineUser
                        className="text-white"
                        style={{ fontSize: "35px" }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-[0.5px]">
                    <Link
                      href={
                        Number(session?.user.id) === Number(user.id)
                          ? "/profile"
                          : `/users-profile?user=${user.id}`
                      }
                      className="text-[15px] font-bold"
                    >
                      {user.name}
                    </Link>
                    <p className="text-[#6D6D71] text-[15px]">@{user.login}</p>
                  </div>
                </div>
                {Number(session?.user.id) === Number(user.id) ? (
                  <Link href="/profile" className="text-[15px] font-bold">
                    <p className="bg-white text-black hover:bg-white/70 font-bold text-[15px] rounded-4xl p-1 pr-3 pl-3 cursor-pointer text-l">
                      profile
                    </p>
                  </Link>
                ) : (
                  <FollowContainer
                    userId={user.id}
                    isFollowedByMe={user.isFollowedByMe}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
