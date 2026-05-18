import { useUserContext } from "@/_providers/infra/user-provider";
import { useMessageContext } from "@/_providers/ui/message-provider";
import AddPhotoContainer from "@/features/uploadPhoto/container/AddPhotoContainer";
import { isValidEmail, uploadToCloudinary } from "@/lib/help";
import { getApiErrorResponse, requireApiResponse } from "@/shared/api/client";
import { MyButton } from "@/shared/ui/MyButton";
import MyInput from "@/shared/ui/MyInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadFile, Input } from "antd";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "../model/UpdateProfileContext";

type InpUser = {
  name: string;
  email: string;
  login: string;
  avatar?: string | null;
  avatarPublicId?: string | null;
  bio: string;
};

export default function UpdateProfileForm() {
  const { TextArea } = Input;
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { openMessage } = useMessageContext();
  const { dataUser } = useUserContext();
  const { closeModal } = useUpdateProfile();

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

  const updateInfoUserMutation = useMutation({
    mutationFn: async (data: InpUser) => {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return requireApiResponse(res, "Не удалось обновить профиль");
    },

    onSuccess: (response) => {
      openMessage(response);
      queryClient.invalidateQueries({ queryKey: ["this-user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setLoadBtnProfile(false);
      closeModal();
    },
    onError: (error) => {
      openMessage(getApiErrorResponse(error, "Не удалось обновить профиль"));
      setLoadBtnProfile(false);
    },
  });

  const editProfile = async () => {
    setLoadBtnProfile(true);
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

    if (nameError || emailError) return setLoadBtnProfile(false);
    let avatarUrl = {
      url: inputValue.avatar || "",
      publicId: inputValue.avatarPublicId || "",
    };

    if (fileList[0]?.originFileObj) {
      try {
        avatarUrl = await uploadToCloudinary(
          fileList[0].originFileObj as File,
          inputValue.avatarPublicId || undefined,
        );
      } catch (error) {
        openMessage(getApiErrorResponse(error, "Не удалось загрузить аватар"));
        setLoadBtnProfile(false);
        return;
      }
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

  return (
    <div className="flex flex-col gap-4">
      <AddPhotoContainer fileList={fileList} setFileList={setFileList} />
      <MyInput
        name="name"
        label="Имя"
        value={inputValue.name}
        onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
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
        onChange={(e) => setInputValue({ ...inputValue, bio: e.target.value })}
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
      <MyButton
        onClick={editProfile}
        className="text-black bg-white rounded-4xl md:p-1.5 p-3 pr-3 pl-3 cursor-pointer hover:bg-gray-400 md:text-xl text-xl"
        loading={loadBtnProfile}
      >
        Save
      </MyButton>
    </div>
  );
}
