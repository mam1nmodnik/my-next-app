"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider } from "antd";
import MyLoader from "@/components/IU/MyLoader";
import UserProfilePost from "@/components/posts/UserProfilePost";

type User = {
  name?: string | null;
  email: string;
  login: string;
  avatar: string | null;
  bio: string;
  id: number;
};

export default function UsersProfile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("user");
  const { isLoading, error, data } = useQuery({
    queryKey: ["users", id],

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
            {data && (
              <Avatar
                src={data?.avatar}
                size={130}
                alt="Аватар"
                className="object-cover relative "
              />
            )}
            <button className="text-white border-[0.5px] border-whtie rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-800 text-l">
              Follow
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-[20px] text-white font-bold w-fit">
                {data?.name}
              </h1>
              <p className="text-[#6D6D71] w-fit ">@{data?.login}</p>
            </div>
            <p className="w-fit text-white whitespace-pre-wrap ">{data?.bio}</p>
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

    // <div className="p-6 flex lg:flex-row flex-col lg:  gap-5">
    //   <div className="bg-gradient-to-br text-white flex justify-center items-center w-full max-w-3xl h-fit">
    //     <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8">
    //       <div className="flex justify-between items-center">
    //         <h2 className="text-2xl font-semibold">Профиль</h2>
    //       </div>
    //       <div className="flex flex-col items-center gap-3">
    //         <div className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md p-[3px] bg-slate-700">
    //           <div className="relative w-full h-full rounded-full overflow-hidden">
    //             {data?.avatar ? (
    //               <Avatar
    //                 src={data.avatar}
    //                 alt="Аватар"
    //                 size={100}
    //                 className="object-cover max-w-none"
    //               />
    //             ) : (
    //               <RiAccountCircleLine size={100} className="text-slate-300" />
    //             )}
    //           </div>
    //         </div>

    //         <p className="text-slate-400 text-sm">
    //           {data?.login || "Имя не указано"}
    //         </p>
    //       </div>

    //       <div className="space-y-3">
    //         {data && (
    //           <>
    //             <InfoRow label="ID" value={data?.id} />
    //             <InfoRow label="Имя" value={data?.name} />
    //             <InfoRow label="Email" value={data?.email} />
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex flex-col w-full gap-4 md:mt-0 mt-5">
    //     <div className="flex flex-col items-center gap-4 w-full h-fit  ">
    //       {data?.posts.length == 0 ? (
    //         <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
    //           Постов нет(
    //         </h1>
    //       ) : (
    //         data?.posts.map((post, index) => (
    //           <div
    //             key={index}
    //             className="flex flex-col justify-between gap-4 font-sans md:pt-8 md:pr-8 md:pl-8 md:pb-4 p-4  min-h-fit md:max-w-[968px] w-full  bg-slate-900/60  border border-slate-700 rounded-2xl shadow-2xl  shadow-indigo-900/20"
    //           >
    //             <div>
    //               <div className="flex flex-col gap-2">
    //                 <h1 className="text-[#E5E7EB] text-xl md:text-3xl font-bold  text-left ">
    //                   {post.title}
    //                 </h1>
    //                 <p className="text-[#E5E7EB] text-l md:text-xl font-medium p-2  ml-4 lg:ml-7 break-words">
    //                   {post.content}
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="flex items-center flex-row justify-between ">
    //               <p className="text-xs md::text-l text-[0.8rem] text-right text-[#9CA3AF] ">
    //                 Дата публикации: {formateDate(post.date)}
    //               </p>
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
