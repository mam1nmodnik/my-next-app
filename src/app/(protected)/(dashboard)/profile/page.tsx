"use client";

import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/user-context";
import { MyButton } from "@/components/IU/MyButton";
import { Avatar, Divider, Modal } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessageContext } from "@/context/message-context";
import MyInput from "@/components/IU/MyInput";
import ProfilePost from "@/components/posts/ProfilePost";
import { Input } from "antd";
import MyLoader from "@/components/IU/MyLoader";

type User = {
  name: string;
  email: string;
  login: string;
  bio: string;
};
type Data = {
  name?: string;
  email?: string;
  login?: string;
  avatar?: string;
  bio: string;
};

export default function Profile() {
  const { TextArea } = Input;
  const { isLoadingUser, dataUser, errorUser } = useUserContext();
  const [open, setOpen] = useState(false);
  const { openMessage } = useMessageContext();

  const [inputValue, setInputValue] = useState<User>({
    name: "",
    email: "",
    login: "",
    bio: "",
  });
  const [inpErrors, setInpErrors] = useState({
    name: {
      error: false,
      text: "",
    },
    email: {
      error: false,
      text: "",
    },
    login: {
      error: false,
      text: "",
    },
    bio: {
      error: false,
      text: "",
    },
  });
  const [loadBtnProfil, setLoadBtnProfil] = useState(false);
  const queryClient = useQueryClient();

  const updateInfoUserMutation = useMutation({
    mutationFn: async (data: Data) => {
      setLoadBtnProfil((el) => !el);
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      openMessage(res);
      setLoadBtnProfil((el) => !el);
      showModal();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["this-user"] });
    },
  });

  const showModal = () => {
    setOpen((el) => !el);
    if (dataUser) {
      setInputValue({
        name: dataUser.name || "",
        email: dataUser.email || "",
        login: dataUser.login || "",
        bio: dataUser.bio || "",
      });

      setInpErrors((prev) => ({
        ...prev,
        name: {
          error: false,
          text: "",
        },
        email: {
          error: false,
          text: "",
        },
      }));
    }
  };

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const editProdile = () => {
    const nameError = inputValue.name.trim().length === 0;
    const emailError = !isValidEmail(inputValue.email);

    setInpErrors((prev) => ({
      ...prev,
      name: {
        error: nameError,
        text: nameError ? "Имя должно быть заполнено" : "",
      },
      email: {
        error: emailError,
        text: emailError ? "Некорректный email" : "",
      },
    }));

    if (nameError || emailError) {
      return;
    }

    const newdata = {
      name: inputValue.name,
      email: inputValue.email,
      login: inputValue.login,
      bio: inputValue.bio,
      avatar:
        "https://avatars.mds.yandex.net/i?id=acc94b414890a1e7b50389a12dbe9612_l-5506301-images-thumbs&n=13",
    };
    try {
      updateInfoUserMutation.mutate(newdata);
    } catch (e) {
      console.error(e);
    }
  };
  if (dataUser?.name === "") {
    showModal();
    // openMessage({ notice: "error", message: "Заполните имя пользоватея!!" });
  }
  if (isLoadingUser)
    return (
      <div className="mt-5 mb-5 h-screen flex justify-center items-center">
        <MyLoader size={42} />
      </div>
    );

  if (errorUser) return <p>Ошибка</p>;

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45 ">
          <div className="w-full aspect-[3/1] max-h-[200px] bg-[#3E3E3E]"></div>
          <div className="p-6  flex flex-col gap-4">
            <div className="flex flex-row justify-between items-end mt-[-17%] ">
              {dataUser && (
                <Avatar
                  src={dataUser?.avatar}
                  size={130}
                  alt="Аватар"
                  className="object-cover relative "
                />
              )}
              <button
                onClick={showModal}
                className="text-white border-[0.5px] border-whtie rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-800 text-l"
              >
                Edit profile
              </button>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-[20px] text-white font-bold w-fit">
                  {dataUser?.name}
                </h1>
                <p className="text-[#6D6D71] w-fit ">@{dataUser?.login}</p>
              </div>
              <p className="w-fit text-white whitespace-pre-wrap ">
                {dataUser?.bio}
              </p>
            </div>
          </div>
          <Divider
            size="small"
            className="border border-white/35 m-0"
            style={{ margin: 0 }}
          />
          <ProfilePost />
        </div>
      </div>

      <Modal
        open={open}
        title={
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={showModal}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-600/25  transition cursor-pointer"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold">Edit profile</h2>
            </div>

            <MyButton
              onClick={editProdile}
              className="text-black bg-white rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-400 text-l right-0"
              loading={loadBtnProfil}
            >
              Save
            </MyButton>
          </div>
        }
        onOk={showModal}
        onCancel={showModal}
        footer={false}
        closable={false}
      >
        <form className="flex flex-col gap-4">
          <MyInput
            name="name"
            label="Имя"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
            error={inpErrors.name.error}
            helperText={inpErrors.name.error ? inpErrors.name.text : ""}
          />
          <MyInput
            name="email"
            label="Email"
            type="email"
            value={inputValue.email}
            onChange={(e) =>
              setInputValue({ ...inputValue, email: e.target.value })
            }
            error={inpErrors.email.error}
            helperText={inpErrors.email.error ? inpErrors.email.text : ""}
          />
          <MyInput
            name="login"
            label="Логин"
            value={inputValue.login}
            onChange={(e) =>
              setInputValue({ ...inputValue, login: e.target.value })
            }
          />
          <TextArea
            variant="borderless"
            spellCheck={false}
            id="bio"
            name="bio"
            value={inputValue.bio}
            placeholder="Расскажи о себе?"
            maxLength={250}
            onChange={(e) =>
              setInputValue({ ...inputValue, bio: e.target.value })
            }
            autoSize={{ minRows: 3, maxRows: 8 }}
            style={{
              color: "#fff",
              backgroundColor: "#000",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
            className="focus:border-blue-400 focus:outline-none"
          />
        </form>
      </Modal>
    </>
  );
}
