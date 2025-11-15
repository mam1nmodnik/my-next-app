"use client";
import InfoRow from "@/components/IU/InfoRow";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import Image from "next/image";
import UsersPosts from "@/components/UsersPosts";

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
    console.log(data);
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
    <div className="p-6 flex gap-5 ">
      <div className="bg-gradient-to-br text-white flex w-3xl h-fit">
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

      <UsersPosts posts={user.posts} suspens="У вас есть что-то интерестное?" />
    </div>
  );
}
