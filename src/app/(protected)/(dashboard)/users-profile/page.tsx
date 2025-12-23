"use client";
import InfoRow from "@/components/IU/InfoRow";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import Image from "next/image";
import { formateDate } from "@/lib/formate-date";

type Post = {
  id: number;
  title?: string;
  content?: string;
  date: Date;
  createdAt: Date;
  userId: number;
};
type User = {
  id: string;
  login: string;
  name: string;
  avatar: string;
  email: string;
  posts: Post[];
};
export default function UsersProfile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("user");
  const [user, setUser] = useState<User>();
  const User = useCallback(async () => {
    const response = await fetch(`/api/user-id/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Ошибка сервера");
    }
    const data = await response.json();
    setUser(data);
  }, [id]);

  useEffect(() => {
    User();
  }, [User]);
  if (!user) {
    return (
      <h1 className="text-white text-3xl flex justify-center items-center">
        Загрузка....
      </h1>
    );
  }
  return (
    <div className="p-6 flex lg:flex-row flex-col lg:  gap-5">
      <div className="bg-gradient-to-br text-white flex justify-center items-center w-full max-w-3xl h-fit">
        <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Профиль</h2>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md p-[3px] bg-slate-700">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Аватар"
                    fill
                    className="object-cover max-w-none"
                  />
                ) : (
                  <RiAccountCircleLine size={100} className="text-slate-300" />
                )}
              </div>
            </div>

            <p className="text-slate-400 text-sm">
              {user.login || "Имя не указано"}
            </p>
          </div>

          <div className="space-y-3">
            <InfoRow label="ID" value={user.id} />
            <InfoRow label="Имя" value={user.name} />
            <InfoRow label="Email" value={user.email} />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 md:mt-0 mt-5">
        <div className="flex flex-col items-center gap-4 w-full h-fit  ">
          {user.posts.length == 0 ? (
            <h1 className="mt-10 lg:text-2xl flex items-center text-xl text-center magic-black ">
              Постов нет(
            </h1>
          ) : (
            user.posts.map((post, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-4 font-sans md:pt-8 md:pr-8 md:pl-8 md:pb-4 p-4  min-h-fit md:max-w-[968px] w-full  bg-slate-900/60  border border-slate-700 rounded-2xl shadow-2xl  shadow-indigo-900/20"
              >
                <div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[#E5E7EB] text-xl md:text-3xl font-bold  text-left ">
                      {post.title}
                    </h1>
                    <p className="text-[#E5E7EB] text-l md:text-xl font-medium p-2  ml-4 lg:ml-7 break-words">
                      {post.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center flex-row justify-between ">
                  <p className="text-xs md::text-l text-[0.8rem] text-right text-[#9CA3AF] ">
                    Дата публикации: {formateDate(post.date)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
