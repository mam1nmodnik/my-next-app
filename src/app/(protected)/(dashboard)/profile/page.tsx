"use client";

import React from "react";
import InputField from "@/components/IU/InputField";
import InfoRow from "@/components/IU/InfoRow";
import { useUserContext } from "@/context/user-context";
import { RiAccountCircleLine } from "react-icons/ri";
import { MyButton } from "@/components/IU/MyButton";
import { Avatar } from "antd";

export default function Profile() {
  const {
    inputValue,
    edit,
    setEdit,
    saveChanges,
    setInputValue,
    loadBtnProfil,
  } = useUserContext();

  if (!inputValue) return null;

  return (
    <div className="bg-gradient-to-br text-white flex justify-center items-center p-6">
      <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Профиль</h2>
          <div className="flex flex-col">
            {!edit && (
              <MyButton
                onClick={() => setEdit(true)}
                className="text-sm px-3 py-1 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg"
              >Изменить</MyButton>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md p-[3px] bg-slate-700">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {inputValue.image ? (
                <Avatar
                  src={inputValue.image}
                  size={100}
                  alt="Аватар"
                  className="object-cover max-w-none"
                />
              ) : (
                <RiAccountCircleLine size={100} className="text-slate-300" />
              )}
            </div>
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
              disabled={true}
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
              <MyButton
                onClick={() => setEdit(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              >Отмена</MyButton>

              <MyButton
                
                className="w-35 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
                loading={loadBtnProfil}
              >Сохранить</MyButton>
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
