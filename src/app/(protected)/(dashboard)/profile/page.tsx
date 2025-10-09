"use client";
import { usePostsContext } from "@/context/posts-context";
import React, { useEffect, useState } from "react";
type InputValueType = {
  idUser: string;
  nameUser: string;
  emailUser: string;
  telUser: string;
};

export default function Profile() {
  const { userName } = usePostsContext();
  const [edit, setEdit] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<InputValueType>(userName);

  function setValue() {
    localStorage.setItem("user", JSON.stringify(inputValue));
    setEdit(!edit);
  }
  useEffect(() => {
    setInputValue(userName);
  }, [userName]);
  return (
    <div className="flex flex-col items-center  w-full ">
      <div className="rounded-[24px] flex flex-col gap-4 p-4 glass h-fit ">
        <div className="w-auto flex flex-row gap-3">
          {edit ? null : (
            <button
              className="right-[20] cursor-pointer"
              onClick={() => setEdit(!edit)}
            >
              изменить
            </button>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-25">
          <div className="w-20">
            <p>фото</p>
          </div>
          {edit ? (
            <div className="w-[250px] flex flex-col items-end gap-3 ">
              <input
                type="text"
                name="idUser"
                placeholder="Введите ник"
                className="glass p-2 w-full"
                value={inputValue.idUser}
                onChange={(val) =>
                  setInputValue({ ...inputValue, idUser: val.target.value })
                }
                required
                //   disabled
              />
              <input
                type="text"
                name="nameUser"
                placeholder="введите имя"
                className="glass p-2 w-full cursor-pointer"
                value={inputValue.nameUser}
                onChange={(val) =>
                  setInputValue({ ...inputValue, nameUser: val.target.value })
                }
                required
              />
              <input
                type="email"
                name="emailUser"
                placeholder="введите email"
                className="glass p-2 w-full cursor-pointer"
                value={inputValue.emailUser}
                onChange={(val) =>
                  setInputValue({
                    ...inputValue,
                    emailUser: val.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                name="telUser"
                placeholder="введите номер"
                className="glass p-2 w-full cursor-pointer"
                value={inputValue.telUser}
                onChange={(val) =>
                  setInputValue({ ...inputValue, telUser: val.target.value })
                }
                required
              />
              <button className="w-full p-1 glass " onClick={setValue}>
                Сохранить
              </button>
            </div>
          ) : (
            // <Suspense fallback={}>
              <div className="w-fit flex flex-col items-start gap-3 ">
                <p>
                  Никнейм:{" "}
                  {inputValue.emailUser || ""
                    ? inputValue.emailUser
                    : "не задано"}
                </p>
                <p>
                  Имя:{" "}
                  {inputValue.nameUser || ""
                    ? inputValue.nameUser
                    : "не задано"}
                </p>
                <p>
                  Email:{" "}
                  {inputValue.emailUser || ""
                    ? inputValue.emailUser
                    : "не задано"}
                </p>
                <p>
                  Номер:{" "}
                  {inputValue.telUser || "" ? inputValue.telUser : "не задано"}
                </p>
              </div>
            // </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
