"use client";
import InfoRow from "@/components/IU/InfoRow";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
type User = {
  id: string;
  login: string;
  name: string;
  avatar: string;
  email: string;
  posts: {
    id: number;
    title?: string;
    content?: string;
    date: Date;
  };
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
    return <h1 className="text-white">Загрузка....</h1>;
  }
  return (
    <div>
      <div className="bg-gradient-to-br text-white flex  p-6">
        <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Профиль</h2>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full bg-slate-700 border-4 border-indigo-500 shadow-md flex items-center justify-center text-slate-400 text-sm"></div>
            <p className="text-slate-400 text-sm">
              {user.login }
            </p>
          </div>

          <div className="space-y-3">
            <InfoRow label="ID" value={user.id} />
            <InfoRow label="Имя" value={user.name} />
            <InfoRow label="Email" value={user.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
