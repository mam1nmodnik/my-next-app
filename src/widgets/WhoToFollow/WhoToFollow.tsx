import MyLoader from "@/shared/ui/MyLoader";
import { useUsers } from "@/shared/hooks/useUsers";
import FollowUserContainer from "./container/FollowUserContaier";

export default function WhoToFollow() {
  const { data, isLoading } = useUsers();
  if (isLoading) {
    return (
      <div className="mt-25 mb-5 flex justify-center w-[300px]">
        <MyLoader size={32} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-5 p-4 w-full">
      <div className="border border-white/30 rounded-2xl h-fit w-full p-4">
        <h1 className="text-xl font-bold ">Who to follow</h1>
        <div className="flex flex-col gap-2 w-full">
          {data &&
            data.map((user) => <FollowUserContainer key={user.id} user={user} />)}
        </div>
      </div>
    </div>
  );
}
