"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/type/type-post-context";
import InputField from "@/components/IU/InputField";
import InfoRow from "@/components/IU/InfoRow";
import { useUserContext } from "@/context/user-context";
import { signOut } from "next-auth/react";

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const { userName, setNameUser } = useUserContext();
  const [inputValue, setInputValue] = useState<User | null>(userName);

  useEffect(() => {
    setInputValue(userName);
  }, [userName]);

  function saveChanges() {
    if (inputValue) {
      setNameUser(inputValue);
      localStorage.setItem("user", JSON.stringify(inputValue));
      setEdit(false);
    }
  }

  if (!inputValue) return null;

  return (
    <div className="bg-gradient-to-br text-white flex justify-center items-center p-6">
      <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Профиль</h2>
          <div className="flex flex-col">
            {!edit && (
              <button
                onClick={() => setEdit(true)}
                className="text-sm px-3 py-1 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg"
              >
                Изменить
              </button>
            )}
            <button
              className=" lg:hidden block  rounded-[20px] h-[40px] pr-2 pl-2 text-xl text-white hover:text-blue-400 cursor-pointer"
              onClick={() =>
                signOut({
                  callbackUrl: "/login", // куда отправить после выхода
                })
              }
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full bg-slate-700 border-4 border-indigo-500 shadow-md flex items-center justify-center text-slate-400 text-sm">
            Фото
          </div>
          <p className="text-slate-400 text-sm">
            {inputValue.name || "Имя не указано"}
          </p>
        </div>

        {edit ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
            }}
            className="flex flex-col gap-4"
          >
            <InputField
              label="ID"
              value={inputValue.id}
              onChange={(e) =>
                setInputValue({ ...inputValue, id: e.target.value })
              }
            />
            <InputField
              label="Имя"
              value={inputValue.name || ""}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
            />
            <InputField
              label="Email"
              type="email"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
            />
            <InputField
              label="Логин"
              value={inputValue.login}
              onChange={(e) =>
                setInputValue({ ...inputValue, login: e.target.value })
              }
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
              >
                Сохранить
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <InfoRow label="ID" value={inputValue.id} />
            <InfoRow label="Имя" value={inputValue.name || ""} />
            <InfoRow label="Email" value={inputValue.email} />
            <InfoRow label="Логин" value={inputValue.login} />
          </div>
        )}
      </div>
    </div>
  );
}
