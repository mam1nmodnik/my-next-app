"use client";

import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/user-context";
import { MyButton } from "@/components/ui/MyButton";
import { Avatar, Divider, Modal, Input, Upload } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessageContext } from "@/context/message-context";
import MyInput from "@/components/ui/MyInput";
import ProfilePost from "@/components/features/posts/container/MyPostContainer";
import type { UploadFile, UploadProps } from "antd";
import MyLoader from "@/components/ui/MyLoader";
import { AiOutlineUser } from "react-icons/ai";
type InpUser = {
  name: string;
  email: string;
  login: string;
  avatar?: string | null;
  avatarPublicId?: string | null;
  bio: string;
};
export default function Profile() {
  const { TextArea } = Input;
  const { isLoadingUser, dataUser, errorUser } = useUserContext();
  const { openMessage } = useMessageContext();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<InpUser>({
    name: "",
    email: "",
    login: "",
    bio: "",
    avatar: null,
    avatarPublicId: null,
  });
  const [inpErrors, setInpErrors] = useState({
    name: { error: false, text: "" },
    email: { error: false, text: "" },
    login: { error: false, text: "" },
  });
  const [loadBtnProfile, setLoadBtnProfile] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (dataUser) {
      setInputValue({
        name: dataUser.name || "",
        email: dataUser.email || "",
        login: dataUser.login || "",
        bio: dataUser.bio || "",
        avatar: dataUser.avatar || null,
        avatarPublicId: dataUser.avatarPublicId || null,
      });
    }
  }, [dataUser]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const updateInfoUserMutation = useMutation({
    mutationFn: async (data: InpUser) => {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      openMessage(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["this-user"] });
      queryClient.invalidateQueries({ queryKey: ["users"]} );
      setLoadBtnProfile(false);
      closeModal();
    },
  });

  type UploadResponse = { url: string; publicId: string };

  const uploadToCloudinary = async (
    file: File,
    oldPublicId?: string,
  ): Promise<UploadResponse> => {
    return new Promise((resolve, reject) => {
      setLoadBtnProfile(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        try {
          const res = await fetch("/api/user/upload-avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              file: reader.result,
              oldPublicId,
            }),
          });

          if (!res.ok) {
            setLoadBtnProfile(false);
            throw new Error("Upload failed");
          }

          const data = await res.json();
          resolve({ url: data.url, publicId: data.publicId });
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = (err) => reject(err);
    });
  };

  const editProfile = async () => {
    const nameError = inputValue.name.trim().length === 0;
    const emailError = !isValidEmail(inputValue.email);

    setInpErrors({
      name: {
        error: nameError,
        text: nameError ? "Имя должно быть заполнено" : "",
      },
      email: {
        error: emailError,
        text: emailError ? "Некорректный email" : "",
      },
      login: { error: false, text: "" },
    });

    if (nameError || emailError) return;

    let avatarUrl = {
      url: inputValue.avatar || "",
      publicId: inputValue.avatarPublicId || "",
    };

    if (fileList[0]?.originFileObj && dataUser?.avatarPublicId) {
      avatarUrl = await uploadToCloudinary(
        fileList[0].originFileObj as File,
        dataUser?.avatarPublicId,
      );
    }
    const newData = {
      avatar: avatarUrl.url || null,
      avatarPublicId: avatarUrl.publicId || null,
      bio: inputValue.bio,
      email: inputValue.email,
      login: inputValue.login,
      name: inputValue.name,
    };
    updateInfoUserMutation.mutate(newData);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  if (isLoadingUser)
    return (
      <div className="mt-5 mb-5 h-screen flex justify-center items-center">
        <MyLoader size={42} />
      </div>
    );

  if (errorUser) return <p>Ошибка</p>;

  return (
    <>
      <div className="w-full flex justify-center h-full min-h-screen">
        <div className="max-w-[568px] w-full border border-r-white/45 border-l-white/45">
          <div className="w-full aspect-[3/1] max-h-[200px] bg-[#3E3E3E]" />
          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-end mt-[-17%]">
              {dataUser?.avatar != null ? (
                <Avatar
                  src={dataUser.avatar}
                  size={130}
                  alt="Аватар"
                  className="object-cover relative"
                />
              ) : (
                <div className="bg-white/13 rounded-[100px] p-2">
                  <AiOutlineUser
                    className="text-white"
                    style={{ fontSize: "90px" }}
                  />
                </div>
              )}

              <button
                onClick={openModal}
                className="text-white border-[0.5px] border-white rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-800 text-l"
              >
                Edit profile
              </button>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-[20px] text-white font-bold w-fit">
                  {dataUser?.name}
                </h1>
                <p className="text-[#6D6D71] w-fit">@{dataUser?.login}</p>
              </div>
              <p className="w-fit text-white whitespace-pre-wrap">
                {dataUser?.bio}
              </p>
              <div className="flex flex-row gap-4 mt-2">
                <p className="text-[#6D6D71] text-sm">
                  <span className="font-bold text-white">
                    {dataUser?._count.followers}
                  </span>{" "}
                  Followers
                </p>
                <p className="text-[#6D6D71] text-sm">
                  <span className="font-bold text-white">
                    {dataUser?._count.following}
                  </span>{" "}
                  Following
                </p>
              </div>
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
        onCancel={closeModal}
        footer={false}
        closable={false}
        title={
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-row gap-2 items-center">
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-600/25 transition cursor-pointer"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold">Edit profile</h2>
            </div>
            <MyButton
              onClick={editProfile}
              className="text-black bg-white rounded-4xl p-1 pr-3 pl-3 cursor-pointer hover:bg-gray-400 text-l"
              loading={loadBtnProfile}
            >
              Save
            </MyButton>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="h-fit flex flex-row gap-2 items-center">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => {
                return false;
              }}
              maxCount={1}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>

            <h2 className="text-xl font-bold text-white">add photo</h2>
          </div>

          <MyInput
            name="name"
            label="Имя"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
            error={inpErrors.name.error}
            helperText={inpErrors.name.text}
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
            helperText={inpErrors.email.text}
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
        </div>
      </Modal>
    </>
  );
}
