"use client";
import React, { useState } from "react";
type InputValueType = {
  idUser: string;
  nameUser: string;
  emailUser: string;
  telUser: string;
};

export default function Profile() {
  const [edit, setEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValueType>({
    idUser: "",
    nameUser: "",
    emailUser: "",
    telUser: "",
  });
  
  function setValue() {
    setEdit(!edit);
    console.log(inputValue);
  }
  
  return (
    <div className="flex flex-col ">
        <div className="rounded-[24px] flex flex-col gap-4 p-4 glass  h-fit w-fit">
          <div className="w-auto relative">
            <p>Profile</p>
            {edit ? null : (
              <button
                className="absolute right-[20] top-0 cursor-pointer"
                onClick={() => setEdit(!edit)}
              >
                изменить
              </button>
            )}
          </div>
          <div className="flex flex-row justify-between gap-25">
            <div>
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
              <div className="w-[250px] flex flex-col items-start gap-3 ">
                <p>
                  Никнейм:{" "}
                  {inputValue.idUser || "" ? inputValue.idUser : "не задано"}
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
            )}
          </div>
        </div>
      </div>
  );
}
